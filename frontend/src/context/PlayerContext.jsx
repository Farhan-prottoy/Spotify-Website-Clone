import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

const PlayerContext = createContext(null);

function safeParseArray(storageKey, fallback) {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.7);

  const [shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off"); // off | all | one
  const [searchQuery, setSearchQuery] = useState("");
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const lastVolumeRef = useRef(0.7);

  const [likedSongIds, setLikedSongIds] = useState(() =>
    safeParseArray("likedSongIds", []),
  );

  const [playlists, setPlaylists] = useState(() =>
    safeParseArray("playlists", [
      { id: "default", name: "My Playlist", songIds: [] },
    ]),
  );

  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  const currentSong = currentIndex >= 0 ? songs[currentIndex] : null;

  const filteredSongs = useMemo(() => {
    if (!searchQuery.trim()) return songs;
    const q = searchQuery.toLowerCase();
    return songs.filter((song) => {
      return (
        song.title.toLowerCase().includes(q) ||
        song.artist.toLowerCase().includes(q) ||
        song.album.toLowerCase().includes(q)
      );
    });
  }, [songs, searchQuery]);

  const upNextQueue = useMemo(() => {
    if (!songs.length || currentIndex < 0) return [];
    const remaining = songs.filter((_, idx) => idx !== currentIndex);
    return remaining.slice(0, 8);
  }, [songs, currentIndex]);

  useEffect(() => {
    localStorage.setItem("likedSongIds", JSON.stringify(likedSongIds));
  }, [likedSongIds]);

  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.preload = "metadata";
    audio.volume = volume;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    const onEnded = () => {
      if (repeatMode === "one") {
        audio.currentTime = 0;
        audio.play().catch(() => undefined);
        return;
      }
      playNext(true);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
    };
  }, [repeatMode, songs.length, currentIndex, shuffle]);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE}/songs`);
        if (!response.ok) throw new Error("Failed to fetch songs");
        const data = await response.json();
        setSongs(data);
      } catch (fetchError) {
        setError(fetchError.message || "Unable to load songs");
      } finally {
        setIsLoading(false);
      }
    };

    loadSongs();
  }, []);

  const playByIndex = async (index) => {
    const song = songs[index];
    if (!song) return;

    const audio = audioRef.current;
    if (audio.src !== song.audioUrl) {
      audio.src = song.audioUrl;
      setDuration(0);
      setCurrentTime(0);
    }

    setCurrentIndex(index);
    setRecentlyPlayed((prev) => {
      const next = [song, ...prev.filter((item) => item.id !== song.id)];
      return next.slice(0, 10);
    });

    try {
      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  };

  const togglePlayPause = async () => {
    const audio = audioRef.current;

    if (!currentSong && songs.length > 0) {
      await playByIndex(0);
      return;
    }

    if (audio.paused) {
      await audio.play().catch(() => undefined);
    } else {
      audio.pause();
    }
  };

  const getRandomIndex = () => {
    if (songs.length <= 1) return currentIndex;
    let random = currentIndex;
    while (random === currentIndex) {
      random = Math.floor(Math.random() * songs.length);
    }
    return random;
  };

  const playNext = (fromEnded = false) => {
    if (!songs.length) return;

    if (shuffle) {
      playByIndex(getRandomIndex());
      return;
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < songs.length) {
      playByIndex(nextIndex);
      return;
    }

    if (repeatMode === "all") {
      playByIndex(0);
      return;
    }

    if (fromEnded) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const playPrevious = () => {
    if (!songs.length) return;

    if (audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }

    const prevIndex = currentIndex <= 0 ? songs.length - 1 : currentIndex - 1;
    playByIndex(prevIndex);
  };

  const seekTo = (nextTime) => {
    const audio = audioRef.current;
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const updateVolume = (nextVolume) => {
    const volumeValue = Math.min(1, Math.max(0, nextVolume));
    audioRef.current.volume = volumeValue;
    audioRef.current.muted = false;
    setVolumeState(volumeValue);
    setIsMuted(false);
    if (volumeValue > 0) lastVolumeRef.current = volumeValue;
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      const audio = audioRef.current;
      if (next) {
        lastVolumeRef.current = volume > 0 ? volume : lastVolumeRef.current;
        audio.volume = 0;
        setVolumeState(0);
      } else {
        const restored = lastVolumeRef.current || 0.7;
        audio.volume = restored;
        setVolumeState(restored);
      }
      return next;
    });
  };

  const toggleQueue = () => setIsQueueOpen((prev) => !prev);

  const toggleShuffle = () => setShuffle((prev) => !prev);

  const cycleRepeatMode = () => {
    setRepeatMode((prev) => {
      if (prev === "off") return "all";
      if (prev === "all") return "one";
      return "off";
    });
  };

  const toggleLike = (songId) => {
    setLikedSongIds((prev) => {
      if (prev.includes(songId)) return prev.filter((id) => id !== songId);
      return [...prev, songId];
    });
  };

  const createPlaylist = (name) => {
    if (!name.trim()) return;
    if (
      playlists.some(
        (playlist) => playlist.name.toLowerCase() === name.trim().toLowerCase(),
      )
    )
      return;
    const newPlaylist = {
      id: crypto.randomUUID(),
      name: name.trim(),
      songIds: [],
    };
    setPlaylists((prev) => [...prev, newPlaylist]);
  };

  const addSongToPlaylist = (playlistId, songId) => {
    setPlaylists((prev) =>
      prev.map((playlist) => {
        if (playlist.id !== playlistId) return playlist;
        if (playlist.songIds.includes(songId)) return playlist;
        return { ...playlist, songIds: [...playlist.songIds, songId] };
      }),
    );
  };

  const value = {
    songs,
    filteredSongs,
    isLoading,
    error,
    currentSong,
    currentIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    shuffle,
    repeatMode,
    searchQuery,
    isQueueOpen,
    isMuted,
    likedSongIds,
    playlists,
    recentlyPlayed,
    upNextQueue,
    setSearchQuery,
    playByIndex,
    togglePlayPause,
    playNext,
    playPrevious,
    seekTo,
    updateVolume,
    toggleMute,
    setShuffle,
    toggleShuffle,
    cycleRepeatMode,
    toggleLike,
    toggleQueue,
    createPlaylist,
    addSongToPlaylist,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used inside PlayerProvider");
  return context;
}
