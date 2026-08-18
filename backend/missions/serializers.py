from rest_framework import serializers 
 
from .models import TrainingMission 
 
 
class TrainingMissionSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = TrainingMission 
        fields = [ 
            "id", 
            "dog", 
            "title", 
            "mission_type", 
            "location", 
            "mission_date", 
            "status", 
            "objective", 
            "notes", 
            "badge_name", 
            "badge_motto", 
            "badge_colors", 
            "badge_symbols", 
            "created_at", 
        ] 
        read_only_fields = [ 
            "id", 
            "badge_name", 
            "badge_motto", 
            "badge_colors", 
            "badge_symbols", 
            "created_at", 
        ] 