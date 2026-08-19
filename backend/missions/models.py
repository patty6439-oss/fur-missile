from django.conf import settings 

from django.db import models 

  

from dogs.models import WorkingDog 

  

  

class TrainingMission(models.Model): 

    STATUS_CHOICES = [ 

        ("planned", "Planned"), 

        ("active", "Active"), 

        ("complete", "Complete"), 

    ] 

  

    owner = models.ForeignKey( 

        settings.AUTH_USER_MODEL, 

        on_delete=models.CASCADE, 

        related_name="training_missions", 

    ) 

    dog = models.ForeignKey( 

        WorkingDog, 

        on_delete=models.SET_NULL, 

        related_name="missions", 

        null=True, 

        blank=True, 

    ) 

    title = models.CharField(max_length=150) 

    mission_type = models.CharField(max_length=100) 

    location = models.CharField(max_length=150) 

    mission_date = models.DateField() 
    
    mission_time = models.TimeField(null=True, blank=True)

    status = models.CharField( 

        max_length=20, 

        choices=STATUS_CHOICES, 

        default="planned", 

    ) 

    objective = models.TextField() 

    notes = models.TextField(blank=True) 

  

    badge_name = models.CharField(max_length=150, blank=True) 

    badge_motto = models.CharField(max_length=200, blank=True) 

    badge_colors = models.CharField(max_length=300, blank=True) 

    badge_symbols = models.CharField(max_length=300, blank=True) 

  

    created_at = models.DateTimeField(auto_now_add=True) 

  

    def __str__(self): 

        return self.title 