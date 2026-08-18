from django.urls import path 
 
from .views import DogDetail, Dogs 
 
 
urlpatterns = [ 
    path("", Dogs.as_view(), name="dogs"), 
    path("<int:dog_id>/", DogDetail.as_view(), name="dog_detail"), 
] 