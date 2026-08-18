from django.urls import reverse 
from rest_framework.test import APITestCase 
from rest_framework.authtoken.models import Token 
 
from .models import User 
 
 
class AccountTests(APITestCase): 
    def test_register(self): 
        response = self.client.post( 
            reverse("register"), 
            { 
                "email": "handler@example.com", 
                "username": "handler", 
                "password": "password123", 
            }, 
            format="json", 
        ) 
 
        self.assertEqual(response.status_code, 201) 
        self.assertIn("token", response.data) 
 
    def test_info_requires_token(self): 
        user = User.objects.create_user( 
            email="handler@example.com", 
            username="handler", 
            password="password123", 
        ) 
        token = Token.objects.create(user=user) 
 
        self.client.credentials( 
            HTTP_AUTHORIZATION=f"Token {token.key}" 
        ) 
 
        response = self.client.get(reverse("info")) 
        self.assertEqual(response.status_code, 200) 
        self.assertEqual( 
            response.data["user"]["email"], 
            "handler@example.com", 
        ) 
