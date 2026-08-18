from django.contrib import admin 

from django.urls import include, path 

  

urlpatterns = [ 

    path("admin/", admin.site.urls), 

    path("api/v1/users/", include("accounts.urls")), 

    path("api/v1/dogs/", include("dogs.urls")), 

    path("api/v1/missions/", include("missions.urls")), 

] 
