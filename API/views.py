
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated

from API.models import *
from API.serializers import *
   
# Les viewsets gèrent le GET et le POST sur la liste des objets
# ainsi que le GET, PUT, DELETE sur les objets individuels

# class Property_Viewset(viewsets.ModelViewSet):
#     queryset = Property.objects.all().order_by('id')
#     serializer_class = Property_Serializer

class Property_List(generics.ListAPIView):
    serializer_class = Property_Serializer
    def get_queryset(self): 
        """
        Optionally restricts the returned properties,
        by filtering against query parameters in the URL.
        """
        queryset = Property.objects.all().order_by('id')
        # property_type
        urlfilter = self.request.query_params.get('property_type', None)
        if urlfilter is not None:
            queryset = queryset.filter(property_type=urlfilter) #id du property_type, pas libellé.
        # nb_rooms
        urlfilter = self.request.query_params.get('nb_rooms', None)
        if urlfilter is not None:
            queryset = queryset.filter(nb_rooms=urlfilter)
        # price
        urlfilter = self.request.query_params.get('price_min', None)
        if urlfilter is not None:
            queryset = queryset.filter(price__gte=urlfilter)
        urlfilter = self.request.query_params.get('price_max', None)
        if urlfilter is not None:
            queryset = queryset.filter(price__lte=urlfilter)
        # surface
        urlfilter = self.request.query_params.get('surface_min', None)
        if urlfilter is not None:
            queryset = queryset.filter(total_surface__gte=urlfilter)
        urlfilter = self.request.query_params.get('surface_max', None)
        if urlfilter is not None:
            queryset = queryset.filter(total_surface__lte=urlfilter)
        # cp, département, ville
        return queryset

class Property_Detail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = Property_Serializer

class Property_Type_Viewset(viewsets.ModelViewSet):
    queryset = Property_Type.objects.all().order_by('label')
    serializer_class = Property_Type_Serializer

class Heating_Type_Viewset(viewsets.ModelViewSet):
    queryset = Heating_Type.objects.all().order_by('label')
    serializer_class = Heating_Type_Serializer

class Kitchen_Type_Viewset(viewsets.ModelViewSet):
    queryset = Kitchen_Type.objects.all().order_by('label')
    serializer_class = Kitchen_Type_Serializer

class Room_Viewset(viewsets.ModelViewSet):
    queryset = Room.objects.all().order_by('label')
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
