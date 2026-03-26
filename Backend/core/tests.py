import logging

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Note
from .serializers import NOTE_CONTENT_MAX_LENGTH

# Tests deliberately hit 404/400; django.request logs those as WARNING — hide that noise here.
logging.getLogger('django.request').setLevel(logging.ERROR)


class NoteAPITestCase(APITestCase):
    @property
    def list_url(self):
        return reverse('note-list')

    def detail_url(self, pk):
        return reverse('note-detail', kwargs={'pk': pk})


class NoteListCreateTests(NoteAPITestCase):
    def test_list_empty_returns_200(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, [])

    def test_list_returns_notes_200(self):
        Note.objects.create(content='alpha')
        Note.objects.create(content='beta')
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_create_valid_returns_201(self):
        response = self.client.post(
            self.list_url,
            {'content': 'hello'},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Note.objects.count(), 1)
        self.assertEqual(response.data['content'], 'hello')
        self.assertIn('created_at', response.data)

    def test_create_missing_content_returns_400(self):
        response = self.client.post(self.list_url, {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('content', response.data)

    def test_create_blank_content_returns_400(self):
        response = self.client.post(
            self.list_url,
            {'content': ''},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_whitespace_only_returns_400(self):
        response = self.client.post(
            self.list_url,
            {'content': '   \t  '},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_too_long_returns_400(self):
        too_long = 'x' * (NOTE_CONTENT_MAX_LENGTH + 1)
        response = self.client.post(
            self.list_url,
            {'content': too_long},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class NoteDetailTests(NoteAPITestCase):
    def setUp(self):
        super().setUp()
        self.note = Note.objects.create(content='retrieve me')

    def test_retrieve_returns_200(self):
        response = self.client.get(self.detail_url(self.note.pk))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['content'], 'retrieve me')

    def test_retrieve_missing_returns_404(self):
        response = self.client.get(self.detail_url(9_999_999))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_full_update_returns_200(self):
        response = self.client.put(
            self.detail_url(self.note.pk),
            {'content': 'updated'},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.note.refresh_from_db()
        self.assertEqual(self.note.content, 'updated')

    def test_partial_update_returns_200(self):
        response = self.client.patch(
            self.detail_url(self.note.pk),
            {'content': 'patched'},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.note.refresh_from_db()
        self.assertEqual(self.note.content, 'patched')

    def test_update_invalid_content_returns_400(self):
        response = self.client.patch(
            self.detail_url(self.note.pk),
            {'content': ''},
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_returns_204(self):
        response = self.client.delete(self.detail_url(self.note.pk))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Note.objects.filter(pk=self.note.pk).exists())

    def test_delete_missing_returns_404(self):
        response = self.client.delete(self.detail_url(9_999_999))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
