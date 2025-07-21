# core/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import ResearchProject
from .serializers import ResearchProjectSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_project(request):
    serializer = ResearchProjectSerializer(data=request.data)
    if serializer.is_valid():
        project = serializer.save(owner=request.user)
        return Response({'id': project.id})
    return Response(serializer.errors, status=400)
