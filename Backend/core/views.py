from django.shortcuts import render
from .models import Note
from .serializers import NoteSerializer
from rest_framework import modelviewset
