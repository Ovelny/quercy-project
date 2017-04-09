from rest_framework import serializers
from API.models import *


class Picture_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = ('id', 'prop', 'display_order', 'picture')
        
class Property_Type_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Property_Type
        fields = ('id', 'label')

class Heating_Type_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Heating_Type
        fields = ('id', 'label')

class Kitchen_Type_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Kitchen_Type
        fields = ('id', 'label')

class Room_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'room_type')

class Property_Room_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Property_Room
        fields = ('prop', 'room', 'nb')

class ImageUrlField(serializers.RelatedField):
    def to_representation(self, value):
        return {"display_order":value.display_order, "url":str(value.picture.name)}

class Property_Serializer(serializers.ModelSerializer):
    # SlugRelatedField : permet d'afficher le label de l'objet nested dans l'objet Property récupéré
    # (au lieu de la foreign key ou de l'objet complet)
    # paramètre queryset : "used for model instance lookups when validating the field input"
    property_type = serializers.SlugRelatedField(slug_field='label', queryset=Property_Type.objects.all()) 
    heating_type = serializers.SlugRelatedField(slug_field='label', queryset=Heating_Type.objects.all())
    kitchen_type = serializers.SlugRelatedField(slug_field='label', queryset=Kitchen_Type.objects.all())
    pictures = ImageUrlField(many=True, read_only=True)
    class Meta:
        model = Property
        fields = ('id', 'advert_type', 'state', 'title_fr', 'title_en', 'description_fr', 'description_en', 
        'nb_rooms', 'price', 'address','postal_code', 'department', 'city','living_surface','total_surface','construction_year',
        'nb_floors','energy_consumption','gas_emission','is_favorite', 'property_type','heating_type','kitchen_type', 
        'pictures')
    
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
    