from django.urls import path 
 
from .views import Info, Login, Logout, Register 
 
 
urlpatterns = [ 
    path("register/", Register.as_view(), name="register"), 
    path("login/", Login.as_view(), name="login"), 
    path("logout/", Logout.as_view(), name="logout"), 
    path("info/", Info.as_view(), name="info"), 
] 
