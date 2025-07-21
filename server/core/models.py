from django.db import models
from django.contrib.auth.models import User

class ResearchProject(models.Model):
    PROJECT_TYPES = [
        ('thesis', 'Thesis'),
        ('capstone', 'Capstone'),
        ('essay', 'Essay'),
        ('market-research', 'Market Research'),
        ('self-research', 'Self-Research'),
        ('other', 'Other'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    project_type = models.CharField(max_length=30, choices=PROJECT_TYPES, default='other')
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="projects")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
