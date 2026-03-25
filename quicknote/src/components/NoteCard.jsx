import { useState } from 'react';

/**
 * Format an ISO timestamp into a human-readable string.
 * Shows "Just now" for notes created within the last 60 seconds.
 */
function formatDate(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffSeconds = Math.floor((now - date) / 1000);

  if (diffSeconds < 60) return 'Just now';

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/**
 * NoteCard — Displays a single note with delete functionality.
 *
 * Props:
 *   note    — { id, content, created_at }
 *   index   — 1-based display index for the badge (#1, #2…)
 *   onDelete(id) — called after the exit animation completes
 */
export default function NoteCard({ note, index, onDelete }) {
  // 'visible' | 'exiting'
  const [phase, setPhase] = useState('visible');

  function handleDelete() {
    // Kick off the CSS exit animation, then remove from state
    setPhase('exiting');
  }

  function handleAnimationEnd() {
    if (phase === 'exiting') {
      onDelete(note.id);
    }
  }

  return (
    <article
      className={`note-card card ${phase === 'exiting' ? 'note-card--exiting' : ''}`}
      onAnimationEnd={handleAnimationEnd}
      aria-label={`Note ${index}`}
    >
      {/* Badge + Delete row */}
      <div className="note-card__header">
        <span className="note-badge" aria-label={`Note number ${index}`}>
          #{index}
        </span>

        <button
          className="btn btn--delete"
          onClick={handleDelete}
          aria-label="Delete this note"
          title="Delete note"
        >
          {/* Trash icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
          <span>Delete</span>
        </button>
      </div>

      {/* Note body */}
      <p className="note-card__content">{note.content}</p>

      {/* Timestamp */}
      <time
        className="note-card__timestamp"
        dateTime={note.created_at}
      >
        {formatDate(note.created_at)}
      </time>
    </article>
  );
}
