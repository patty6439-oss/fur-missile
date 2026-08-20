from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from dogs.models import WorkingDog

from .badge_service import generate_badge
from .models import TrainingMission
from .serializers import TrainingMissionSerializer


def validate_owned_dog(request, dog_id):
    if dog_id in (None, ""):
        return None

    return get_object_or_404(
        WorkingDog,
        id=dog_id,
        owner=request.user,
    )


class Missions(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        missions = TrainingMission.objects.filter(
            owner=request.user
        ).order_by("-mission_date", "-id")

        return Response(
            TrainingMissionSerializer(
                missions,
                many=True,
            ).data
        )

    def post(self, request):
        dog_id = request.data.get("dog")
        validate_owned_dog(request, dog_id)

        serializer = TrainingMissionSerializer(
            data=request.data
        )

        if serializer.is_valid():
            mission = serializer.save(
                owner=request.user
            )

            return Response(
                TrainingMissionSerializer(
                    mission
                ).data,
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class MissionDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, request, mission_id):
        return get_object_or_404(
            TrainingMission,
            id=mission_id,
            owner=request.user,
        )

    def get(self, request, mission_id):
        mission = self.get_object(
            request,
            mission_id,
        )

        return Response(
            TrainingMissionSerializer(
                mission
            ).data
        )

    def put(self, request, mission_id):
        mission = self.get_object(
            request,
            mission_id,
        )

        validate_owned_dog(
            request,
            request.data.get("dog"),
        )

        serializer = TrainingMissionSerializer(
            mission,
            data=request.data,
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    def patch(self, request, mission_id):
        mission = self.get_object(
            request,
            mission_id,
        )

        if "dog" in request.data:
            validate_owned_dog(
                request,
                request.data.get("dog"),
            )

        serializer = TrainingMissionSerializer(
            mission,
            data=request.data,
            partial=True,
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    def delete(self, request, mission_id):
        mission = self.get_object(
            request,
            mission_id,
        )

        mission.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )


class MissionBadge(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, mission_id):
        mission = get_object_or_404(
            TrainingMission,
            id=mission_id,
            owner=request.user,
        )

        try:
            badge = generate_badge(mission)

        except Exception as error:
            print("BADGE GENERATOR ERROR:", error)

            return Response(
                {
                    "error": (
                        "Badge generator is temporarily unavailable."
                    )
                },
                status=status.HTTP_502_BAD_GATEWAY,
            )

        mission.badge_name = badge["badge_name"]
        mission.badge_motto = badge["badge_motto"]
        mission.badge_colors = badge["badge_colors"]
        mission.badge_symbols = badge["badge_symbols"]

        mission.save(
            update_fields=[
                "badge_name",
                "badge_motto",
                "badge_colors",
                "badge_symbols",
            ]
        )

        return Response(
            {
                "mission": TrainingMissionSerializer(
                    mission
                ).data
            }
        )