from django.conf import settings 
from django.db import models 
 
 
class WorkingDog(models.Model): 
    IMAGE_CHOICES = [ 
        ("malinois", "Belgian Malinois"), 
        ("white_lab", "English White Labrador"), 
    ] 
 
    owner = models.ForeignKey( 
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name="working_dogs", 
    ) 
    name = models.CharField(max_length=100) 
    breed = models.CharField(max_length=100) 
    role = models.CharField(max_length=100) 
    age = models.PositiveIntegerField() 
    call_sign = models.CharField(max_length=100, blank=True) 
    notes = models.TextField(blank=True) 
    image_key = models.CharField( 
        max_length=40, 
        choices=IMAGE_CHOICES, 
        default="malinois", 
    ) 
    created_at = models.DateTimeField(auto_now_add=True) 
 
    def __str__(self): 
        return self.name 