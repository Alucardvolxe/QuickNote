import { useEffect, useState } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { createNote, deleteNote, fetchNotes } from './services/notes';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(true);

  // Load notes from Django on first render.
  useEffect(() => {
    let cancelled = false;
    fetchNotes()
      .then((data) => {
        if (!cancelled) setNotes(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('Failed to fetch notes:', err);
        if (!cancelled) setNotes([]);
      })
      .finally(() => {
        if (!cancelled) setNotesLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  /**
   * Add a new note.
   * Creates the note in the Django backend.
   */
  async function handleAdd(content) {
    const newNote = await createNote(content);
    // Prepend so the newest note appears first
    setNotes((prev) => [newNote, ...prev]);
  }

  /**
   * Delete a note by ID.
   * Deletes the note in the Django backend.
   */
  async function handleDelete(id) {
    await deleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <NoteForm onAdd={handleAdd} disableSubmit={notesLoading} />
        <NoteList notes={notes} onDelete={handleDelete} isLoading={notesLoading} />
      </main>
    </div>
  );
}
