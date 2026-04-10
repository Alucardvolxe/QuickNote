from django.urls import path
from .views import NoteViewSet
from rest_framework.routers import DefaultRouter

urlpatterns = []
router = DefaultRouter()
router.register(r'notes', NoteViewSet)





urlpatterns += router.urls

