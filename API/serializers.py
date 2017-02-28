from rest_framework import serializers
from API.models import *

class Property_Type_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Property_Type
        fields = ('id', 'label_fr', 'label_en')

class Heating_Type_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Heating_Type
        fields = ('id', 'label_fr', 'label_en')

class Kitchen_Type_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Kitchen_Type
        fields = ('id', 'label_fr', 'label_en')

class Room_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'room_type_fr', 'room_type_fr')

class Property_Room_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Property_Room
        fields = ('prop', 'room', 'nb')

class Property_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ('id', 'advert_type', 'state', 'description_fr', 'description_en', 'nb_rooms', 'price',
        'address','postal_code','city','living_surface','total_surface','construction_year',
        'nb_floors','energy_consumption','gas_emission','is_favorite',
        'property_type','heating_type','kitchen_type')
    

#------------------------------

class Customer_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'first_name', 'last_name', 'address', 'postal_code', 'city', 'phone_number', 
        'mobile_phone', 'email_address')

class Visit_Report_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Visit_Report
        fields = ('id', 'prop', 'customer', 'date', 'comments')

class Estimate_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Estimate
        fields = ('id', 'prop', 'customer', 'request_date', 'creation_date', 'estimated_amount')


#------------------------------

class Company_Info_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Company_Info
        fields = ('company_presentation_fr', 'company_presentation_en')
    