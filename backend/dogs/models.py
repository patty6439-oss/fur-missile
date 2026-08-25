from django.conf import settings
from django.db import models


class WorkingDog(models.Model):

    GENDER_CHOICES = [
        ("male", "Male"),
        ("female", "Female"),
    ]

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="working_dogs",
    )

    name = models.CharField(max_length=100)
    breed = models.CharField(max_length=100)
    role = models.CharField(max_length=100)

    gender = models.CharField(
        max_length=10,
        choices=GENDER_CHOICES,
    )

    age = models.PositiveIntegerField()
    call_sign = models.CharField(max_length=100, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name