import { useState } from 'react';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { createNote, deleteNote } from './services/notes';

/**
 * Hardcoded seed notes — shown on first load so the UI is never empty.
 * Replace with a real fetchNotes() call inside a useEffect when the
 * Django backend is ready (see services/notes.js → fetchNotes).
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

  /**
   * Add a new note.
   * Calls the stubbed createNote() — swap for real API call in services/notes.js.
   */
  async function handleAdd(content) {
    const newNote = await createNote(content);
    // Prepend so the newest note appears first
    setNotes((prev) => [newNote, ...prev]);
  }

  /**
   * Delete a note by ID.
   * Calls the stubbed deleteNote() — swap for real API call in services/notes.js.
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
