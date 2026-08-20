from django.urls import path 
 
from .views import MissionDetail, MissionBadge, Missions 
 
 
urlpatterns = [ 
    path("", Missions.as_view(), name="missions"), 
    path("<int:mission_id>/", MissionDetail.as_view(), name="mission_detail"), 
    path("<int:mission_id>/badge/", MissionBadge.as_view(), name="mission_badge"), 
] 