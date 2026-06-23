import { usePlayer } from "../context/PlayerContext";
import {
  EqualizerIcon,
  HeartIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
} from "./icons";

function formatDuration(seconds = 0) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function SongList() {
  const {
    filteredSongs,
    currentSong,
    isPlaying,
    isLoading,
    error,
    playByIndex,
    togglePlayPause,
    songs,
    searchQuery,
    likedSongIds,
    toggleLike,
    playlists,
    addSongToPlaylist,
  } = usePlayer();

  const onRowActivate = (globalIndex, isActive) => {
    if (isActive) togglePlayPause();
    else playByIndex(globalIndex);
  };

  return (
    <section className="main-content">
      <div className="content-heading">
        <h1>
          {searchQuery.trim() ? `Results for “${searchQuery}”` : greeting()}
        </h1>
      </div>

      {isLoading ? <div className="state-msg">Loading songs…</div> : null}
      {error ? <div className="state-msg error">{error}</div> : null}

      {!isLoading && !error ? (
        <div className="tracklist">
          <div className="tracklist-header">
            <span className="col-index">#</span>
            <span className="col-title">Title</span>
            <span className="col-album">Album</span>
            <span className="col-like" />
            <span className="col-duration">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22zm0 20a9 9 0 1 1 0-18 9 9 0 0 1 0 18zm.75-14a.75.75 0 0 0-1.5 0v5.25c0 .2.08.39.22.53l3 3a.75.75 0 1 0 1.06-1.06l-2.78-2.78V7z" />
              </svg>
            </span>
          </div>

          {filteredSongs.length === 0 ? (
            <div className="state-msg">No songs match your search.</div>
          ) : null}

          {filteredSongs.map((song, displayIndex) => {
            const globalIndex = songs.findIndex((item) => item.id === song.id);
            const isActive = currentSong?.id === song.id;
            const isCurrentlyPlaying = isActive && isPlaying;
            const liked = likedSongIds.includes(song.id);

            return (
              <div
                key={song.id}
                className={`track-row ${isActive ? "active" : ""}`}
                onClick={() => onRowActivate(globalIndex, isActive)}
              >
                <div className="col-index">
                  {isCurrentlyPlaying ? (
                    <EqualizerIcon />
                  ) : (
                    <span className="track-number">{displayIndex + 1}</span>
                  )}
                  <button
                    className="track-play"
                    onClick={(event) => {
                      event.stopPropagation();
                      onRowActivate(globalIndex, isActive);
                    }}
                    title={isCurrentlyPlaying ? "Pause" : "Play"}
                    aria-label={isCurrentlyPlaying ? "Pause" : "Play"}
                  >
                    {isCurrentlyPlaying ? (
                      <PauseIcon size={16} />
                    ) : (
                      <PlayIcon size={16} />
                    )}
                  </button>
                </div>

                <div className="col-title">
                  <img src={song.coverUrl} alt="" loading="lazy" />
                  <div className="track-meta">
                    <span
                      className={`track-title ${isActive ? "is-active" : ""}`}
                    >
                      {song.title}
                    </span>
                    <span className="track-artist">{song.artist}</span>
                  </div>
                </div>

                <div className="col-album">{song.album}</div>

                <div
                  className="col-like"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    className={`like-btn ${liked ? "liked" : ""}`}
                    onClick={() => toggleLike(song.id)}
                    title={
                      liked ? "Remove from Liked Songs" : "Save to Liked Songs"
                    }
                    aria-label="Like song"
                  >
                    <HeartIcon size={18} filled={liked} />
                  </button>

                  <div className="add-wrap">
                    <button
                      className="add-btn"
                      title="Add to playlist"
                      aria-label="Add to playlist"
                    >
                      <PlusIcon size={16} />
                    </button>
                    <select
                      className="playlist-select"
                      defaultValue=""
                      onChange={(event) => {
                        const playlistId = event.target.value;
                        if (!playlistId) return;
                        addSongToPlaylist(playlistId, song.id);
                        event.target.value = "";
                      }}
                      aria-label="Add to playlist"
                    >
                      <option value="">Add to playlist…</option>
                      {playlists.map((playlist) => (
                        <option key={playlist.id} value={playlist.id}>
                          {playlist.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-duration">
                  {formatDuration(song.duration)}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
