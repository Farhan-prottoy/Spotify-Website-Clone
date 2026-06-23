import { usePlayer } from "../context/PlayerContext";
import { SearchIcon } from "./icons";

export default function Header() {
  const { searchQuery, setSearchQuery } = usePlayer();

  return (
    <header className="topbar">
      <div className="topbar-nav">
        <button className="round-btn" title="Go back" aria-label="Go back">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="#fff"
            aria-hidden="true"
          >
            <path d="M15.54 21.15 6.38 12l9.16-9.15 1.06 1.06L8.5 12l8.1 8.09z" />
          </svg>
        </button>
        <button
          className="round-btn"
          title="Go forward"
          aria-label="Go forward"
        >
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="#fff"
            aria-hidden="true"
          >
            <path d="M8.46 2.85 17.62 12l-9.16 9.15-1.06-1.06L15.5 12 7.4 3.91z" />
          </svg>
        </button>
      </div>

      <div className="search-pill">
        <SearchIcon size={20} />
        <input
          className="search-input"
          placeholder="What do you want to play?"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>

      <div className="topbar-actions">
        <button className="user-chip" title="Profile">
          R
        </button>
      </div>
    </header>
  );
}
