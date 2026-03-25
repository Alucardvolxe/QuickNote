/**
 * Header — App branding bar shown at the top of every page.
 */
export default function Header() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="header-logo">
          {/* Pencil icon */}
          <svg
            className="header-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          <span className="header-title">QuickNotes</span>
        </div>
        <p className="header-tagline">Your thoughts, captured instantly.</p>
      </div>
    </header>
  );
}
