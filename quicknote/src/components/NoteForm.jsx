import { useState } from 'react';

const MAX_CHARS = 300;

/**
 * NoteForm — Card-style input area for composing a new note.
 *
 * Props:
 *   onAdd(content: string) — called when the user submits a valid note
 *   disableSubmit — blocks submit (e.g. while notes are still loading)
 */
export default function NoteForm({ onAdd, disableSubmit = false }) {
  const [text, setText] = useState('');

  const remaining = MAX_CHARS - text.length;
  const isOverLimit = remaining < 0;
  const isEmpty = text.trim().length === 0;
  const isDisabled = isEmpty || isOverLimit || disableSubmit;

  function handleSubmit(e) {
    e.preventDefault();
    if (isDisabled) return;
    onAdd(text.trim());
    setText('');
  }

  function handleClear() {
    setText('');
  }

  return (
    <section className="form-section">
      <form className="note-form card" onSubmit={handleSubmit} noValidate>
        <label htmlFor="note-input" className="sr-only">
          Write your note
        </label>

        <textarea
          id="note-input"
          className="note-textarea"
          placeholder="Write your note here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          aria-label="Note content"
        />

        <div className="form-footer">
          {/* Character counter */}
          <span
            className={`char-counter ${isOverLimit ? 'char-counter--over' : remaining <= 30 ? 'char-counter--warn' : ''}`}
            aria-live="polite"
          >
            {text.length} / {MAX_CHARS}
          </span>

          <div className="form-actions">
            {/* Clear button — only visible when there's text */}
            {text.length > 0 && (
              <button
                type="button"
                className="btn btn--ghost"
                onClick={handleClear}
                aria-label="Clear note"
              >
                Clear
              </button>
            )}

            <button
              type="submit"
              className="btn btn--primary"
              disabled={isDisabled}
              aria-disabled={isDisabled}
            >
              Add Note
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
