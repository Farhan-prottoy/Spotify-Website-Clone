import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import {
  HomeIcon,
  LibraryIcon,
  PlusIcon,
  SearchIcon,
  SpotifyLogo,
} from "./icons";

export default function Sidebar() {
  const { playlists, createPlaylist, likedSongIds } = usePlayer();
  const [playlistName, setPlaylistName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    createPlaylist(playlistName);
    setPlaylistName("");
    setShowForm(false);
  };

  return (
    <aside className="sidebar">
      <nav className="nav-card">
        <a className="brand" href="#">
          <SpotifyLogo size={36} />
          <span>Spotify</span>
        </a>
        <button className="nav-item active">
          <HomeIcon size={22} />
          <span>Home</span>
        </button>
        <button className="nav-item">
          <SearchIcon size={22} />
          <span>Search</span>
        </button>
      </nav>

      <section className="library-card">
        <div className="library-head">
          <button className="library-title">
            <LibraryIcon size={22} />
            <span>Your Library</span>
          </button>
          <button
            className="icon-btn"
            title="Create playlist"
            onClick={() => setShowForm((value) => !value)}
          >
            <PlusIcon size={18} />
          </button>
        </div>

        {showForm ? (
          <form className="playlist-form" onSubmit={onSubmit}>
            <input
              autoFocus
              value={playlistName}
              onChange={(event) => setPlaylistName(event.target.value)}
              placeholder="Playlist name"
              aria-label="Create playlist"
            />
            <button type="submit">Add</button>
          </form>
        ) : null}

        <ul className="library-list">
          <li className="library-row liked">
            <span className="liked-cover">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="#fff"
                aria-hidden="true"
              >
                <path d="M12 21.35c5.4-3.6 9-7.2 9-11.55a4.8 4.8 0 0 0-9-2.4 4.8 4.8 0 0 0-9 2.4c0 4.35 3.6 7.95 9 11.55z" />
              </svg>
            </span>
            <div className="library-meta">
              <strong>Liked Songs</strong>
              <span>Playlist · {likedSongIds.length} songs</span>
            </div>
          </li>

          {playlists.map((playlist) => (
            <li className="library-row" key={playlist.id}>
              <span className="library-cover">
                {playlist.name.charAt(0).toUpperCase()}
              </span>
              <div className="library-meta">
                <strong>{playlist.name}</strong>
                <span>Playlist · {playlist.songIds.length} songs</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
