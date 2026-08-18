from rest_framework import serializers 

  

from .models import WorkingDog 

  

  

class WorkingDogSerializer(serializers.ModelSerializer): 

    class Meta: 

        model = WorkingDog 

        fields = [ 

            "id", 

            "name", 

            "breed", 

            "role", 

            "age", 

            "call_sign", 

            "notes", 

            "created_at", 

        ] 

        read_only_fields = ["id", "created_at"] 