from django.urls import path 
 
from .views import MissionDetail, Missions 
 
 
urlpatterns = [ 
    path("", Missions.as_view(), name="missions"), 
    path("<int:mission_id>/", MissionDetail.as_view(), name="mission_detail"), 
] 