from django.urls import reverse 

from rest_framework import status 

from rest_framework.test import APITestCase 

from rest_framework_simplejwt.tokens import RefreshToken 

  

from .models import User 

  

  

class AccountTests(APITestCase): 

    def test_register_returns_access_and_sets_refresh_cookie(self): 

        response = self.client.post( 

            reverse("register"), 

            { 

                "email": "handler@example.com", 

                "username": "handler", 

                "password": "password123", 

            }, 

            format="json", 

        ) 

  

        self.assertEqual(response.status_code, status.HTTP_201_CREATED) 

        self.assertIn("access", response.data) 

        self.assertIn("refresh_token", response.cookies) 

  

    def test_info_requires_access_token(self): 

        user = User.objects.create_user( 

            email="handler@example.com", 

            username="handler", 

            password="password123", 

        ) 

        refresh = RefreshToken.for_user(user) 

        access = str(refresh.access_token) 

  

        self.client.credentials( 

            HTTP_AUTHORIZATION=f"Bearer {access}" 

        ) 

        response = self.client.get(reverse("info")) 

  

        self.assertEqual(response.status_code, status.HTTP_200_OK) 

        self.assertEqual( 

            response.data["user"]["email"], 

            "handler@example.com", 

        ) 

  

    def test_refresh_uses_cookie(self): 

        user = User.objects.create_user( 

            email="handler@example.com", 

            username="handler", 

            password="password123", 

        ) 

        refresh = RefreshToken.for_user(user) 

        self.client.cookies["refresh_token"] = str(refresh) 

  

        response = self.client.post(reverse("refresh")) 

  

        self.assertEqual(response.status_code, status.HTTP_200_OK) 

        self.assertIn("access", response.data) 