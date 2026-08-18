from django.urls import reverse 
from rest_framework.test import APITestCase 
from rest_framework.authtoken.models import Token 
 
from accounts.models import User 
from .models import WorkingDog 
 
 
class DogTests(APITestCase): 
    def setUp(self): 
        self.user = User.objects.create_user( 
            email="handler@example.com", 
            username="handler", 
            password="password123", 
        ) 
        token = Token.objects.create(user=self.user) 
        self.client.credentials( 
            HTTP_AUTHORIZATION=f"Token {token.key}" 
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
 
        self.assertEqual(response.status_code, 201) 
        self.assertEqual(WorkingDog.objects.count(), 1) 
        self.assertEqual(WorkingDog.objects.first().owner, self.user) 