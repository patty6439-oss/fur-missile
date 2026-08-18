from django.shortcuts import get_object_or_404 

from rest_framework import status 

from rest_framework.permissions import IsAuthenticated 

from rest_framework.response import Response 

from rest_framework.views import APIView 

  

from .models import WorkingDog 

from .serializers import WorkingDogSerializer 

  

  

class Dogs(APIView): 

    permission_classes = [IsAuthenticated] 

  

    def get(self, request): 

        dogs = WorkingDog.objects.filter(owner=request.user).order_by("id") 

        return Response(WorkingDogSerializer(dogs, many=True).data) 

  

    def post(self, request): 

        serializer = WorkingDogSerializer(data=request.data) 

        if serializer.is_valid(): 

            dog = serializer.save(owner=request.user) 

            return Response( 

                WorkingDogSerializer(dog).data, 

                status=status.HTTP_201_CREATED, 

            ) 

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

  

  

class DogDetail(APIView): 

    permission_classes = [IsAuthenticated] 

  

    def get_object(self, request, dog_id): 

        return get_object_or_404( 

            WorkingDog, 

            id=dog_id, 

            owner=request.user, 

        ) 

  

    def get(self, request, dog_id): 

        dog = self.get_object(request, dog_id) 

        return Response(WorkingDogSerializer(dog).data) 

  

    def put(self, request, dog_id): 

        dog = self.get_object(request, dog_id) 

        serializer = WorkingDogSerializer(dog, data=request.data) 

        if serializer.is_valid(): 

            serializer.save() 

            return Response(serializer.data) 

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

  

    def patch(self, request, dog_id): 

        dog = self.get_object(request, dog_id) 

        serializer = WorkingDogSerializer( 

            dog, 

            data=request.data, 

            partial=True, 

        ) 

        if serializer.is_valid(): 

            serializer.save() 

            return Response(serializer.data) 

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

  

    def delete(self, request, dog_id): 

        dog = self.get_object(request, dog_id) 

        dog.delete() 

        return Response(status=status.HTTP_204_NO_CONTENT) 