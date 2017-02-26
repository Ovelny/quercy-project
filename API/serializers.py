from rest_framework import serializers
from API.models import *

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

class Property_Serializer(serializers.ModelSerializer):
    # property_type = Property_Type_Serializer()
    # SlugRelatedField : permet d'afficher le label de l'objet nested dans l'objet Property récupéré
    # (au lieu de la foreign key ou de l'objet complet)
    property_type = serializers.SlugRelatedField(read_only=True, slug_field='label') 
    # pour l'instant mis en readonly pour éviter les erreurs.
    # considérer que seuls les GET doivent être testés pour le moment, d'une manière générale.
    # param queryset de slugfield : à voir
    heating_type = serializers.SlugRelatedField(read_only=True, slug_field='label')
    kitchen_type = serializers.SlugRelatedField(read_only=True, slug_field='label')
    # rooms : cas particulier, many-to-many avec un champ en plus sur l'association (nb)
    # rooms = serializers.SlugRelatedField(many=True, read_only=True, slug_field='room_type')
    class Meta:
        model = Property
        fields = ('id', 'advert_type', 'state', 'description', 'nb_rooms', 'price',
        'address','postal_code','city','living_surface','total_surface','construction_year',
        'nb_floors','energy_consumption','gas_emission','is_favorite',
        'property_type','heating_type','kitchen_type')#, 'rooms')
    

