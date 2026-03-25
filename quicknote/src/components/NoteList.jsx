import NoteCard from './NoteCard';
import EmptyState from './EmptyState';

/**
 * NoteList — Section header + responsive grid of NoteCards (or EmptyState).
 *
 * Props:
 *   notes      — array of note objects { id, content, created_at }
 *   onDelete(id) — bubbled up from NoteCard
 */
export default function NoteList({ notes, onDelete }) {
  const count = notes.length;

  return (
    <section className="list-section">
      <div className="list-header">
        <h2 className="list-title">Notes</h2>
        <span className="note-count" aria-live="polite">
          {count} {count === 1 ? 'Note' : 'Notes'}
        </span>
      </div>

      {count === 0 ? (
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
