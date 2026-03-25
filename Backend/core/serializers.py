from rest_framework import serializers

from .models import Note

# Sensible API bound; model TextField has no DB max length.
NOTE_CONTENT_MAX_LENGTH = 50_000


class NoteSerializer(serializers.ModelSerializer):
    content = serializers.CharField(
        trim_whitespace=True,
        min_length=1,
        max_length=NOTE_CONTENT_MAX_LENGTH,
    )

    class Meta:
        model = Note
        fields = '__all__'
        read_only_fields = ('created_at',)

