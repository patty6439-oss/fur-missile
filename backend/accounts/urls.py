from django.urls import path 

  

from .views import Info, Login, Logout, Refresh, Register 

  

urlpatterns = [ 

    path("register/", Register.as_view(), name="register"), 

    path("login/", Login.as_view(), name="login"), 

    path("refresh/", Refresh.as_view(), name="refresh"), 

    path("logout/", Logout.as_view(), name="logout"), 

    path("info/", Info.as_view(), name="info"), 

] 
