from django.shortcuts import get_object_or_404 
from rest_framework.authentication import TokenAuthentication 
from rest_framework.permissions import IsAuthenticated 
from rest_framework.response import Response 
from rest_framework.views import APIView 
from rest_framework import status 
 
from dogs.models import WorkingDog 
from .models import TrainingMission 
from .serializers import TrainingMissionSerializer 
 
 
class Missions(APIView): 
    authentication_classes = [TokenAuthentication] 
    permission_classes = [IsAuthenticated] 
 
    def get(self, request): 
        missions = TrainingMission.objects.filter( 
            owner=request.user 
        ).order_by("-mission_date") 
        return Response(TrainingMissionSerializer(missions, many=True).data) 
 
    def post(self, request): 
        data = request.data.copy() 
        dog_id = data.get("dog") 
 
        if dog_id: 
            get_object_or_404( 
                WorkingDog, 
                id=dog_id, 
                owner=request.user, 
            ) 
 
        serializer = TrainingMissionSerializer(data=data) 
 
        if serializer.is_valid(): 
            mission = serializer.save(owner=request.user) 
            return Response( 
                TrainingMissionSerializer(mission).data, 
                status=status.HTTP_201_CREATED, 
            ) 
 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
 
class MissionDetail(APIView): 
    authentication_classes = [TokenAuthentication] 
    permission_classes = [IsAuthenticated] 
 
    def get_mission(self, request, mission_id): 
        return get_object_or_404( 
            TrainingMission, 
            id=mission_id, 
            owner=request.user, 
        ) 
 
    def get(self, request, mission_id): 
        mission = self.get_mission(request, mission_id) 
        return Response(TrainingMissionSerializer(mission).data) 
 
    def put(self, request, mission_id): 
        mission = self.get_mission(request, mission_id) 
        data = request.data.copy() 
        dog_id = data.get("dog") 
 
        if dog_id: 
            get_object_or_404( 
                WorkingDog, 
                id=dog_id, 
                owner=request.user, 
            ) 
 
        serializer = TrainingMissionSerializer( 
            mission, 
            data=data, 
            partial=True, 
        ) 
 
        if serializer.is_valid(): 
            serializer.save() 
            return Response(serializer.data) 
 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    def delete(self, request, mission_id): 
        mission = self.get_mission(request, mission_id) 
        mission.delete() 
        return Response(status=status.HTTP_204_NO_CONTENT) 