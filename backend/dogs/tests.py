from django.urls import reverse 

from rest_framework import status 

from rest_framework.test import APITestCase 

from rest_framework_simplejwt.tokens import RefreshToken 

  

from accounts.models import User 

from .models import WorkingDog 

  

  

class DogTests(APITestCase): 

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

  

    def test_create_dog(self): 

        response = self.client.post( 

            reverse("dogs"), 

            { 

                "name": "Kit", 

                "breed": "Belgian Malinois", 

                "role": "Patrol", 

                "age": 4, 

                "call_sign": "Fur Missile", 

                "notes": "", 

            }, 

            format="json", 

        ) 

  

        self.assertEqual(response.status_code, status.HTTP_201_CREATED) 

        self.assertEqual(WorkingDog.objects.count(), 1) 

        self.assertEqual( 

            WorkingDog.objects.first().owner, 

            self.user, 

        ) 

  

    def test_user_cannot_see_another_users_dog(self): 

        other = User.objects.create_user( 

            email="other@example.com", 

            username="other", 

            password="password123", 

        ) 

        WorkingDog.objects.create( 

            owner=other, 

            name="Secret Dog", 

            breed="Lab", 

            role="SAR", 

            age=3, 

        ) 

  

        response = self.client.get(reverse("dogs")) 

  

        self.assertEqual(response.status_code, status.HTTP_200_OK) 

        self.assertEqual(len(response.data), 0) 