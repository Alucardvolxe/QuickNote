/**
 * notes.js — Axios API service layer for QuickNotes
 *
 * The Vite dev server proxies `/api` -> `http://127.0.0.1:8000`, so we can call
 * relative URLs and avoid CORS issues.
 */
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch all notes.
 * GET /api/notes/
 */
export async function fetchNotes() {
  const res = await api.get('/notes/');
  return res.data;
}

/**
 * Create a new note.
 * POST /api/notes/
 *
 * @param {string} content - The note text
 * @returns {Promise<Object>} The created note object
 */
export async function createNote(content) {
  const res = await api.post('/notes/', { content });
  return res.data;
}

/**
 * Delete a note by ID.
 * DELETE /api/notes/:id/
 *
 * @param {number|string} id - The note ID to delete
 * @returns {Promise<void>}
 */
export async function deleteNote(id) {
  await api.delete(`/notes/${id}/`);
}
