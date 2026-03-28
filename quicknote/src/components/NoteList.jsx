import NoteCard from './NoteCard';
import EmptyState from './EmptyState';

/**
 * NoteList — Section header + responsive grid of NoteCards (or EmptyState).
 *
 * Props:
 *   notes      — array of note objects { id, content, created_at }
 *   onDelete(id) — bubbled up from NoteCard
 *   isLoading  — initial fetch in progress
 */
export default function NoteList({ notes, onDelete, isLoading = false }) {
  const count = notes.length;

  return (
    <section className="list-section" aria-busy={isLoading}>
      <div className="list-header">
        <h2 className="list-title">Notes</h2>
        <span className="note-count" aria-live="polite">
          {isLoading
            ? 'Loading…'
            : `${count} ${count === 1 ? 'Note' : 'Notes'}`}
        </span>
      </div>

      {isLoading ? (
        <p className="list-loading" role="status">
          Loading notes…
        </p>
      ) : count === 0 ? (
        <EmptyState />
      ) : (
        <div className="notes-grid">
          {notes.map((note, i) => (
            <NoteCard
              key={note.id}
              note={note}
              index={count - i}   /* newest note is highest number */
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
