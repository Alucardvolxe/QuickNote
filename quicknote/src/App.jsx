import { useEffect, useState } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { createNote, deleteNote, fetchNotes } from './services/notes';

/**
 * Seed notes — shown immediately while the backend fetches notes.
 * Once the Django API responds, these are replaced with real data.
 */
const SEED_NOTES = [
  {
    id: 1,
    content:
      'Set up the project structure for the new client dashboard. Remember to check the design system tokens before picking colours.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 h ago
  },
  {
    id: 2,
    content:
      "Weekly standup moved to Thursday at 10 AM. Ping the team on Slack to confirm availability — don't forget to update the calendar invite.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: 3,
    content:
      'Book flights for the conference. Earliest non-stop departs at 7:45 AM — worth the early wake-up to avoid a layover.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
];

export default function App() {
  const [notes, setNotes] = useState(SEED_NOTES);

  // Load notes from Django on first render.
  useEffect(() => {
    let cancelled = false;
    fetchNotes()
      .then((data) => {
        if (!cancelled) setNotes(data);
      })
      .catch((err) => {
        // Keep seed notes if the backend is temporarily unavailable.
        console.error('Failed to fetch notes:', err);
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
        <NoteForm onAdd={handleAdd} />
        <NoteList notes={notes} onDelete={handleDelete} />
      </main>
    </div>
  );
}
