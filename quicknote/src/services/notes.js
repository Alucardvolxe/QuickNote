/**
 * notes.js — Stubbed API service layer for QuickNotes
 *
 * All functions currently operate on local state passed in as arguments.
 * Replace each stub with a real fetch/axios call when the Django backend is ready.
 * Base URL example: const BASE_URL = 'http://localhost:8000/api/notes';
 */

/**
 * Fetch all notes.
 * TODO: GET /api/notes/ — fetch all notes from Django backend
 * Replace stub body with:
 *   const res = await fetch(`${BASE_URL}/`);
 *   return res.json();
 */
export async function fetchNotes() {
  // Stub: returns the hardcoded initial notes defined in App.jsx
  return Promise.resolve([]);
}

/**
 * Create a new note.
 * TODO: POST /api/notes/ — send { content } to Django backend
 * Replace stub body with:
 *   const res = await fetch(`${BASE_URL}/`, {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ content }),
 *   });
 *   return res.json(); // expects { id, content, created_at }
 *
 * @param {string} content - The note text
 * @returns {Promise<Object>} The created note object
 */
export async function createNote(content) {
  // Stub: build a mock note object identical to what the backend would return
  const newNote = {
    id: Date.now(),          // backend will supply a real integer PK
    content,
    created_at: new Date().toISOString(),
  };
  return Promise.resolve(newNote);
}

/**
 * Delete a note by ID.
 * TODO: DELETE /api/notes/:id/ — delete note by ID from Django backend
 * Replace stub body with:
 *   await fetch(`${BASE_URL}/${id}/`, { method: 'DELETE' });
 *
 * @param {number|string} id - The note ID to delete
 * @returns {Promise<void>}
 */
export async function deleteNote(id) {
  // Stub: nothing to do locally; App.jsx handles state removal
  return Promise.resolve();
}
