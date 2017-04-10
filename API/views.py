
import datetime
from django.utils import timezone
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.http import HttpResponse
import json

from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated, AllowAny

from django_filters.rest_framework import FilterSet, DjangoFilterBackend
import django_filters

from django.db.models import Q

from django.core.mail import send_mail, BadHeaderError
from rest_framework.views import APIView
from rest_framework.throttling import AnonRateThrottle

from API.models import *
from API.serializers import *

from . import config
   
# Les viewsets gèrent le GET et le POST sur la liste des objets
# ainsi que le GET, PUT, DELETE sur les objets individuels

class NumberInFilter(django_filters.BaseInFilter, django_filters.NumberFilter):
    pass

class CharInFilter(django_filters.BaseInFilter, django_filters.CharFilter):
    pass

class Property_Filter(FilterSet):
    min_price = django_filters.NumberFilter(name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(name="price", lookup_expr='lte')
    min_surface = django_filters.NumberFilter(name="total_surface", lookup_expr='gte')
    max_surface = django_filters.NumberFilter(name="total_surface", lookup_expr='lte')
    postal_code = django_filters.CharFilter(name="postal_code", lookup_expr='startswith')
    city = django_filters.CharFilter(name="city", lookup_expr='icontains')
    # postal_codein = CharInFilter(name="postal_code", lookup_expr='in')
    # cityin = CharInFilter(name="city", lookup_expr='in')
    # departmentin = NumberInFilter(name="department", lookup_expr='in')
    nb_rooms = NumberInFilter(name="nb_rooms", lookup_expr='in') #query looks like this: nb_rooms=2,3
    property_type = NumberInFilter(name="property_type", lookup_expr='in')
    location = django_filters.CharFilter(label='location', method='filter_location')
    def filter_location(self, qs, name, value):
        values = value.split(u",")
        f = Q()
        for v in values:
            f = f | Q(**{"city": v}) | Q(**{"postal_code": v}) | Q(**{"department": v})
        return qs.filter(f)
    class Meta: 
        model = Property
        fields = ['id', 'state', 'property_type', 'advert_type', 'is_favorite', 'nb_rooms', 'min_price', 'location',
        'max_price','min_surface', 'max_surface', 'postal_code', 'city']

class Property_Viewset(viewsets.ModelViewSet):
    queryset = Property.objects.all().order_by('id')
    serializer_class = Property_Serializer
    filter_backends = (DjangoFilterBackend,filters.OrderingFilter,)
    filter_class = Property_Filter
    ordering_fields = ('id', 'property_type', 'advert_type', 'state', 'nb_rooms', 'total_surface', 'price', 'postal_code', 'city')

class Picture_Viewset(viewsets.ModelViewSet):
    queryset = Picture.objects.all().order_by('display_order')
    serializer_class = Picture_Serializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('prop',)

class Property_Type_Viewset(viewsets.ModelViewSet):
    queryset = Property_Type.objects.all()
    serializer_class = Property_Type_Serializer

class Heating_Type_Viewset(viewsets.ModelViewSet):
    queryset = Heating_Type.objects.all()
    serializer_class = Heating_Type_Serializer

class Kitchen_Type_Viewset(viewsets.ModelViewSet):
    queryset = Kitchen_Type.objects.all()
    serializer_class = Kitchen_Type_Serializer

class Room_Viewset(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = Room_Serializer
    
class Property_Room_Viewset(viewsets.ModelViewSet):
    queryset = Property_Room.objects.all()
    serializer_class = Property_Room_Serializer

#------------------------------

# Pour les trois objets suivants (gérés par le CRM), accès restreint.
# avec IsAuthenticated, même la lecture n'est plus possible pour les utilisateurs non authentifiés.
class Customer_Viewset(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Customer.objects.all()
    serializer_class = Customer_Serializer
    filter_backends = (filters.OrderingFilter,filters.SearchFilter,)
    ordering_fields = ('id', 'last_name','first_name', 'postal_code', 'city')
    search_fields = ('last_name', 'first_name')

class Visit_Report_Viewset(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Visit_Report.objects.all().order_by('date')
    serializer_class = Visit_Report_Serializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('prop', 'customer')

class Estimate_Viewset(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Estimate.objects.all().order_by('creation_date')
    serializer_class = Estimate_Serializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('prop', 'customer')


#------------------------------

class Company_Info_Viewset(viewsets.ModelViewSet):
    queryset = Company_Info.objects.all()
    serializer_class = Company_Info_Serializer


#------------------------------

# Overriding the default token class to get a token that expires after a while.
class ObtainExpiringAuthToken(ObtainAuthToken):
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)

            utc_now = timezone.now()
            if not created and token.created < utc_now - datetime.timedelta(hours=config.token_expiration_delay):
                token.delete()
                token = Token.objects.create(user=user)
                token.created = timezone.now()
                token.save()

            response_data = {'token': token.key}
            return HttpResponse(json.dumps(response_data), content_type="application/json")

        return HttpResponse(serializer.errors, status=400)


#------------------------------

# Sending an email from the API
class Email(APIView):
    throttle_classes = (AnonRateThrottle,) #limit the number of requests per user per unit of time. see settings.py
    permission_classes = (AllowAny,)
    def post(self, request):
        subject = request.data['subject']
        message = request.data['message']
        from_email = ""
        try:
            send_mail(subject, message, from_email, [config.receiving_email_address])
            return HttpResponse('Mail sent.')
        except BadHeaderError:
            return HttpResponse('Invalid header found.')
                