from django.shortcuts import render
from .models import Note
from .serializers import NoteSerializer
from rest_framework.viewsets import ModelViewSet


class NoteViewSet(ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    
