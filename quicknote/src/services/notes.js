/**
 * notes.js — Axios API service layer for QuickNotes
 *
 * Local dev: Vite proxies `/api` -> the Django server (see vite.config.js).
 * Production (Vercel): set VITE_API_BASE_URL to the Render API root, e.g.
 * https://your-service.onrender.com/api
 */
import axios from 'axios';

function resolveBaseURL() {
  const fromEnv = import.meta.env.VITE_API_BASE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  if (import.meta.env.DEV) return '/api';
  return '/api';
}

const api = axios.create({
  baseURL: resolveBaseURL(),
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
