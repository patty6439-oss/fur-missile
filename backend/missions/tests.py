from django.urls import reverse 

from rest_framework import status 

from rest_framework.test import APITestCase 

from rest_framework_simplejwt.tokens import RefreshToken 

  

from accounts.models import User 

from dogs.models import WorkingDog 

from .models import TrainingMission 

  

  

class MissionTests(APITestCase): 

    def setUp(self): 

        self.user = User.objects.create_user( 

            email="handler@example.com", 

            username="handler", 

            password="password123", 

        ) 

        access = str(RefreshToken.for_user(self.user).access_token) 

        self.client.credentials( 

            HTTP_AUTHORIZATION=f"Bearer {access}" 

        ) 

  

        self.dog = WorkingDog.objects.create( 

            owner=self.user, 

            name="Kit", 

            breed="Belgian Malinois", 

            role="Patrol", 

            age=4, 

        ) 

  

    def test_create_mission(self): 

        response = self.client.post( 

            reverse("missions"), 

            { 

                "dog": self.dog.id, 

                "title": "Fence Line Search", 

                "mission_type": "Search", 

                "location": "Plymouth, MA", 

                "mission_date": "2026-08-20", 

                "status": "planned", 

                "objective": "Locate the target.", 

                "notes": "", 

            }, 

            format="json", 

        ) 

  

        self.assertEqual(response.status_code, status.HTTP_201_CREATED) 

        self.assertEqual(TrainingMission.objects.count(), 1) 

        self.assertEqual( 

            TrainingMission.objects.first().owner, 

            self.user, 

        ) 