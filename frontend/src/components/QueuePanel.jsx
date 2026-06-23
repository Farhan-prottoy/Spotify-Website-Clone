import { usePlayer } from "../context/PlayerContext";

function Row({ song, onPlay, active }) {
  return (
    <li className={`queue-row ${active ? "active" : ""}`} onClick={onPlay}>
      <img src={song.coverUrl} alt="" loading="lazy" />
      <div className="queue-meta">
        <span className="queue-title">{song.title}</span>
        <span className="queue-artist">{song.artist}</span>
      </div>
    </li>
  );
}

export default function QueuePanel() {
  const { upNextQueue, recentlyPlayed, playByIndex, songs, currentSong } =
    usePlayer();

  return (
    <aside className="queue-panel">
      {currentSong ? (
        <>
          <h2 className="queue-heading">Now playing</h2>
          <ul className="queue-list">
            <Row song={currentSong} active onPlay={() => {}} />
          </ul>
        </>
      ) : null}

      <h2 className="queue-heading">Next up</h2>
      <ul className="queue-list">
        {upNextQueue.length === 0 ? (
          <li className="queue-empty">Nothing queued</li>
        ) : null}
        {upNextQueue.map((song) => {
          const index = songs.findIndex((item) => item.id === song.id);
          return (
            <Row
              key={`queue-${song.id}`}
              song={song}
              onPlay={() => playByIndex(index)}
            />
          );
        })}
      </ul>

      <h2 className="queue-heading">Recently played</h2>
      <ul className="queue-list">
        {recentlyPlayed.length === 0 ? (
          <li className="queue-empty">No recent tracks</li>
        ) : null}
        {recentlyPlayed.map((song) => {
          const index = songs.findIndex((item) => item.id === song.id);
          return (
            <Row
              key={`recent-${song.id}`}
              song={song}
              onPlay={() => playByIndex(index)}
            />
          );
        })}
      </ul>
    </aside>
  );
}
