# from django.http import HttpResponse
# import datetime 
# import json

from rest_framework import viewsets

from API.models import *
from API.serializers import *
   
# Les viewsets gèrent le GET et le POST sur la liste des objets
# ainsi que le GET, PUT, DELETE sur les objets individuels

class Property_Viewset(viewsets.ModelViewSet):
    queryset = Property.objects.all().order_by('id')
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

