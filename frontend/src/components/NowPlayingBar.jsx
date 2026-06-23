import { usePlayer } from "../context/PlayerContext";
import RangeBar from "./RangeBar";
import {
  HeartIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  QueueIcon,
  RepeatIcon,
  ShuffleIcon,
  VolumeIcon,
} from "./icons";

function timeLabel(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function NowPlayingBar() {
  const {
    currentSong,
    isPlaying,
    togglePlayPause,
    playNext,
    playPrevious,
    currentTime,
    duration,
    seekTo,
    volume,
    updateVolume,
    isMuted,
    toggleMute,
    shuffle,
    toggleShuffle,
    repeatMode,
    cycleRepeatMode,
    isQueueOpen,
    toggleQueue,
    likedSongIds,
    toggleLike,
  } = usePlayer();

  const liked = currentSong ? likedSongIds.includes(currentSong.id) : false;
  const volumeLevel =
    isMuted || volume === 0 ? "muted" : volume < 0.5 ? "low" : "high";

  return (
    <footer className="now-playing">
      <div className="np-left">
        {currentSong ? (
          <>
            <img
              className="np-cover"
              src={currentSong.coverUrl}
              alt=""
              loading="lazy"
            />
            <div className="np-info">
              <span className="np-title">{currentSong.title}</span>
              <span className="np-artist">{currentSong.artist}</span>
            </div>
            <button
              className={`like-btn ${liked ? "liked" : ""}`}
              onClick={() => toggleLike(currentSong.id)}
              title={liked ? "Remove from Liked Songs" : "Save to Liked Songs"}
              aria-label="Like song"
            >
              <HeartIcon size={18} filled={liked} />
            </button>
          </>
        ) : (
          <div className="np-info">
            <span className="np-title">No track selected</span>
            <span className="np-artist">Choose a song to start</span>
          </div>
        )}
      </div>

      <div className="np-center">
        <div className="np-controls">
          <button
            className={`ctrl-btn ${shuffle ? "is-on" : ""}`}
            onClick={toggleShuffle}
            title="Shuffle"
            aria-label="Shuffle"
          >
            <ShuffleIcon size={18} />
          </button>
          <button
            className="ctrl-btn"
            onClick={playPrevious}
            title="Previous"
            aria-label="Previous"
          >
            <PrevIcon size={18} />
          </button>
          <button
            className="play-toggle"
            onClick={togglePlayPause}
            title={isPlaying ? "Pause" : "Play"}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
          </button>
          <button
            className="ctrl-btn"
            onClick={() => playNext(false)}
            title="Next"
            aria-label="Next"
          >
            <NextIcon size={18} />
          </button>
          <button
            className={`ctrl-btn ${repeatMode !== "off" ? "is-on" : ""}`}
            onClick={cycleRepeatMode}
            title={
              repeatMode === "one"
                ? "Repeat one"
                : repeatMode === "all"
                  ? "Repeat all"
                  : "Repeat"
            }
            aria-label="Repeat"
          >
            <RepeatIcon size={18} one={repeatMode === "one"} />
          </button>
        </div>

        <div className="np-progress">
          <span className="np-time">{timeLabel(currentTime)}</span>
          <RangeBar
            value={Math.min(currentTime, duration || 0)}
            max={duration || 0}
            onChange={seekTo}
            ariaLabel="Seek"
            className="progress-bar"
          />
          <span className="np-time">{timeLabel(duration)}</span>
        </div>
      </div>

      <div className="np-right">
        <button
          className={`ctrl-btn ${isQueueOpen ? "is-on" : ""}`}
          onClick={toggleQueue}
          title="Queue"
          aria-label="Queue"
        >
          <QueueIcon size={18} />
        </button>
        <button
          className="ctrl-btn"
          onClick={toggleMute}
          title={isMuted ? "Unmute" : "Mute"}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          <VolumeIcon size={18} level={volumeLevel} />
        </button>
        <RangeBar
          value={isMuted ? 0 : volume}
          max={1}
          onChange={updateVolume}
          ariaLabel="Volume"
          className="volume-bar"
        />
      </div>
    </footer>
  );
}
