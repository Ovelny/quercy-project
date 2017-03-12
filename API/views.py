
import datetime
from django.utils import timezone
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.http import HttpResponse
import json

from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated

from django_filters.rest_framework import FilterSet, DjangoFilterBackend
import django_filters

from API.models import *
from API.serializers import *
   
# Les viewsets gèrent le GET et le POST sur la liste des objets
# ainsi que le GET, PUT, DELETE sur les objets individuels

class Property_Filter(FilterSet):
    min_price = django_filters.NumberFilter(name="price", lookup_expr='gte')
    max_price = django_filters.NumberFilter(name="price", lookup_expr='lte')
    min_surface = django_filters.NumberFilter(name="surface", lookup_expr='gte')
    max_surface = django_filters.NumberFilter(name="surface", lookup_expr='lte')
    postal_code = django_filters.CharFilter(name="postal_code", lookup_expr='startswith')
    city = django_filters.CharFilter(name="city", lookup_expr='icontains')
    class Meta:
        model = Property
        fields = ['id', 'property_type', 'advert_type', 'is_favorite', 'nb_rooms', 'min_price', 'max_price',
                'min_surface', 'max_surface', 'postal_code', 'city']

class Property_Viewset(viewsets.ModelViewSet):
    queryset = Property.objects.all().order_by('id')
    serializer_class = Property_Serializer
    filter_backends = (DjangoFilterBackend,filters.OrderingFilter,)
    filter_class = Property_Filter
    ordering_fields = ('id', 'property_type', 'advert_type', 'nb_rooms', 'total_surface', 'price', 'postal_code', 'city')

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
    filter_backends = (filters.OrderingFilter,)
    ordering_fields = ('id', 'last_name','first_name', 'postal_code', 'city')
    # filter_fields = ('id','last_name','first_name',)

class Visit_Report_Viewset(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Visit_Report.objects.all()
    serializer_class = Visit_Report_Serializer

class Estimate_Viewset(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Estimate.objects.all()
    serializer_class = Estimate_Serializer

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
            if not created and token.created < utc_now - datetime.timedelta(hours=2):
                token.delete()
                token = Token.objects.create(user=user)
                token.created = timezone.now()
                token.save()

            response_data = {'token': token.key}
            return HttpResponse(json.dumps(response_data), content_type="application/json")

        return HttpResponse(serializer.errors, status=400)