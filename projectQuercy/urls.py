"""projectQuercy URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.authtoken import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('API.urls')),
    url(r'^api-token-auth/', views.obtain_auth_token) # vue gérée par le rest_framework.
    # url(r'^$', xxx), #site root
]

# views.obtain_auth_token : reçoit en POST une requête avec "username" et "password" renseignés, 
# renvoie un token si les infos correspondent à un user de la base.
# Cette méthode d'authentification rend nécessaire l'utilisation de https en prod.

# Une fois le token récupéré, le passer dans les futures requêtes dans le header "Authorization", 
# précédé de "Token "