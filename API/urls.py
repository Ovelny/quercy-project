from django.conf.urls import url, include
# from django.contrib import admin

from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from . import views

# router.register crée automatiquement l'adresse items/{id}/ en plus de items/

router = routers.DefaultRouter()
router.register(r'properties', views.Property_Viewset) 
router.register(r'pictures', views.Picture_Viewset)
router.register(r'property_types', views.Property_Type_Viewset)
router.register(r'heating_types', views.Heating_Type_Viewset)
router.register(r'kitchen_types', views.Kitchen_Type_Viewset)
router.register(r'rooms', views.Room_Viewset)
router.register(r'property_room', views.Property_Room_Viewset)

router.register(r'customers', views.Customer_Viewset)
router.register(r'visit_reports', views.Visit_Report_Viewset)
router.register(r'estimates', views.Estimate_Viewset)

router.register(r'company_info', views.Company_Info_Viewset)

urlpatterns = [
    url(r'^', include(router.urls)),
    # url(r'^properties/$', views.Property_List.as_view()),
    # url(r'^properties/(?P<pk>[0-9]+)/$', views.Property_Detail.as_view()),
    url(r'^authenticate', obtain_auth_token) # vue gérée par le rest_framework.
]

# obtain_auth_token : reçoit en POST une requête avec "username" et "password" renseignés, 
# renvoie un token si les infos correspondent à un user de la base.
# Cette méthode d'authentification rend nécessaire l'utilisation de https en prod.

# Une fois le token récupéré, le passer dans les futures requêtes dans le header "Authorization", 
# précédé de "Token "