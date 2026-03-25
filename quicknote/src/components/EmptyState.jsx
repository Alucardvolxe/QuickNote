/**
 * EmptyState — Shown in the notes list when there are no notes.
 */
export default function EmptyState() {
  return (
    <div className="empty-state" role="status" aria-live="polite">
      {/* Notebook icon */}
      <svg
        className="empty-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="9" y1="7" x2="15" y2="7" />
        <line x1="9" y1="11" x2="15" y2="11" />
        <line x1="9" y1="15" x2="12" y2="15" />
      </svg>
      <p className="empty-title">No notes yet.</p>
      <p className="empty-subtitle">Start writing to capture your thoughts!</p>
    </div>
  );
}
