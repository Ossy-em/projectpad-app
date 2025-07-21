
from rest_framework import serializers
from .models import ResearchProject

class ResearchProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchProject
        fields = ['id', 'title', 'description', 'project_type', 'created_at']
