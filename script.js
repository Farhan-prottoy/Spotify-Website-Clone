let currentSong = new Audio();
let songs = [];
let currentSongIndex = 0;
let isPlaying = false;

async function getSongs() {
  try {
    // Since we can't fetch from the songs folder directly in a browser,
    // we'll create a predefined list of songs
    const songList = [
      "Ahare-Minar_FusionBD.Com.mp3",
      "Chaite Paro 2008.mp3",
      "Ei Bidaye.mp3",
      "Kaabil_Hoon-Kaabil_FusionBD.Com.mp3",
      "Ke_Tumi-Tahsan_FusionBD.Com.mp3",
      "Lost In The Echo.mp3",
      "Love_You_Zindagi-Dear_Zindagi_FusionBD.Com.mp3",
      "Luis Fonsi_ Daddy Yankee - Despacito ft. Justin Bieber.mp3",
      "Pehli Mohabbat (Darshan Raval) Full Song(honeysingh.co).mp3",
      "Rafa ft. Topu - Jonmodin (music.com.bd).mp3",
    ];

    return songList.map((song) => `Songs/${song}`);
  } catch (error) {
    console.error("Error getting songs:", error);
    return [];
  }
}

// Format time from seconds to MM:SS
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Clean song name for display
function cleanSongName(songPath) {
  const fileName = songPath.split("/").pop();
  return fileName
    .replace(".mp3", "")
    .replaceAll("%20", " ")
    .replaceAll("_", " ");
}

// Update the current song display
function updateCurrentSongDisplay(songPath) {
  const songName = cleanSongName(songPath);
  document.getElementById("currentSongName").textContent = songName;
  document.getElementById("currentArtist").textContent = "Unknown Artist";

  // Update the song image (using a default image since we don't have album covers)
  const songImg = document.getElementById("currentSongImg");
  songImg.src = "https://via.placeholder.com/56x56/1db954/ffffff?text=♪";
  songImg.style.display = "block";
}

// Play a specific song
async function playSong(songPath, index) {
  currentSongIndex = index;

  if (currentSong.src) {
    currentSong.pause();
  }

  currentSong.src = songPath;
  updateCurrentSongDisplay(songPath);

  try {
    await currentSong.play();
    isPlaying = true;
    updatePlayButton();
  } catch (error) {
    console.error("Error playing song:", error);
    // Fallback for browsers that require user interaction
    isPlaying = false;
    updatePlayButton();
  }
}

// Toggle play/pause
function togglePlayPause() {
  if (isPlaying) {
    currentSong.pause();
    isPlaying = false;
  } else {
    if (currentSong.src) {
      currentSong.play().catch((error) => {
        console.error("Error playing song:", error);
      });
    } else if (songs.length > 0) {
      playSong(songs[0], 0);
    }
    isPlaying = true;
  }
  updatePlayButton();
}

// Update play/pause button
function updatePlayButton() {
  const playBtn = document.getElementById("playPause");
  if (isPlaying) {
    playBtn.src = "Images/svg format/pause.svg";
    playBtn.style.filter = "invert(0)";
    playBtn.title = "Pause";
  } else {
    playBtn.src = "Images/svg format/play.svg";
    playBtn.style.filter = "invert(0)";
    playBtn.title = "Play";
  }
}

// Play next song
function nextSong() {
  if (songs.length === 0) return;
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong(songs[currentSongIndex], currentSongIndex);
}

// Play previous song
function prevSong() {
  if (songs.length === 0) return;
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(songs[currentSongIndex], currentSongIndex);
}

// Update progress bar
function updateProgress() {
  if (currentSong.duration) {
    const progress = (currentSong.currentTime / currentSong.duration) * 100;
    document.querySelector(".progress").style.width = `${progress}%`;

    document.getElementById("currentTime").textContent = formatTime(
      currentSong.currentTime,
    );
    document.getElementById("totalTime").textContent = formatTime(
      currentSong.duration,
    );
  }
}

// Set progress when user clicks on progress bar
function setProgress(e) {
  const progressBar = document.querySelector(".progressBar");
  const clickX = e.offsetX;
  const width = progressBar.clientWidth;
  const duration = currentSong.duration;

  if (duration) {
    currentSong.currentTime = (clickX / width) * duration;
  }
}

async function init() {
  songs = await getSongs();
  console.log("Loaded songs:", songs);

  let isShuffleOn = false;
  let repeatMode = "off";

  const songList = document.querySelector(".songList ul");
  songList.innerHTML = "";

  // Populate library list (already existing)
  songs.forEach((song, index) => {
    const cleanName = cleanSongName(song);
    let artistName = "Unknown Artist";
    const nameParts = cleanName.split(" - ");
    if (nameParts.length > 1) {
      artistName = nameParts[0];
    }

    songList.innerHTML += `
            <li data-song="${song}" data-index="${index}">
                <img class="invert" src="Images/svg format/music.svg" alt="">
                <div class="info">
                    <div>${cleanName}</div>
                    <div>${artistName}</div>
                </div>
                <div class="playnow">
                    <span>Play Now</span>
                    <img class="invert" src="Images/svg format/play.svg" alt="">
                </div>
            </li>
        `;
  });

  document.querySelectorAll(".songList li").forEach((li) => {
    li.addEventListener("click", (e) => {
      const songPath = li.getAttribute("data-song");
      const index = parseInt(li.getAttribute("data-index"));
      playSong(songPath, index);

      document.querySelectorAll(".songList li").forEach((item) => {
        item.classList.remove("active-song");
      });
      li.classList.add("active-song");
    });
  });

  // Add event listeners for player controls
  document
    .getElementById("playPause")
    .addEventListener("click", togglePlayPause);
  document.getElementById("nextSong").addEventListener("click", nextSong);
  document.getElementById("prevSong").addEventListener("click", prevSong);

  // Shuffle button functionality
  const shuffleBtn = document.getElementById("shuffleBtn");
  if (shuffleBtn) {
    shuffleBtn.addEventListener("click", () => {
      isShuffleOn = !isShuffleOn;
      shuffleBtn.classList.toggle("active-control", isShuffleOn);
      console.log(`Shuffle mode: ${isShuffleOn ? "on" : "off"}`);
    });
  }

  // Repeat button functionality
  const repeatBtn = document.getElementById("repeatBtn");
  if (repeatBtn) {
    repeatBtn.addEventListener("click", () => {
      if (repeatMode === "off") {
        repeatMode = "all";
        repeatBtn.classList.add("active-control");
      } else if (repeatMode === "all") {
        repeatMode = "one";
        repeatBtn.classList.add("active-control");
        repeatBtn.classList.add("repeat-one");
      } else {
        repeatMode = "off";
        repeatBtn.classList.remove("active-control");
        repeatBtn.classList.remove("repeat-one");
      }
      console.log(`Repeat mode: ${repeatMode}`);
    });
  }

  // Progress bar click event
  document.querySelector(".progressBar").addEventListener("click", setProgress);

  // Audio event listeners
  currentSong.addEventListener("timeupdate", updateProgress);

  currentSong.addEventListener("ended", () => {
    if (repeatMode === "one") {
      currentSong.currentTime = 0;
      currentSong.play();
    } else if (repeatMode === "all" || !isShuffleOn) {
      nextSong();
    } else if (isShuffleOn) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      playSong(songs[randomIndex], randomIndex);
    }
  });

  currentSong.addEventListener("loadedmetadata", () => {
    document.getElementById("totalTime").textContent = formatTime(
      currentSong.duration,
    );
  });

  currentSong.addEventListener("play", () => {
    isPlaying = true;
    updatePlayButton();
  });

  currentSong.addEventListener("pause", () => {
    isPlaying = false;
    updatePlayButton();
  });

  document.querySelectorAll(".card").forEach((card, index) => {
    const playButton = card.querySelector(".play-btn");
    if (playButton) {
      playButton.addEventListener("click", (e) => {
        e.stopPropagation();

        // If we have songs in the list, play the first one
        if (songs.length > 0) {
          playSong(songs[0], 0);

          // Update the active song in the sidebar
          document.querySelectorAll(".songList li").forEach((item) => {
            item.classList.remove("active-song");
          });
          const firstSong = document.querySelector(".songList li");
          if (firstSong) firstSong.classList.add("active-song");
        }
      });
    }

    // Make the whole card clickable
    card.addEventListener("click", () => {
      if (songs.length > 0) {
        playSong(songs[0], 0);

        // Update the active song in the sidebar
        document.querySelectorAll(".songList li").forEach((item) => {
          item.classList.remove("active-song");
        });
        const firstSong = document.querySelector(".songList li");
        if (firstSong) firstSong.classList.add("active-song");
      }
    });
  });

  // Volume control
  const volumeBar = document.querySelector(".volumeBar");
  if (volumeBar) {
    volumeBar.addEventListener("click", (e) => {
      const clickX = e.offsetX;
      const width = volumeBar.clientWidth;
      const volume = clickX / width;

      currentSong.volume = Math.max(0, Math.min(1, volume));
      document.querySelector(".volumeProgress").style.width =
        `${currentSong.volume * 100}%`;
    });
  }

  // Set default volume
  currentSong.volume = 0.7;
  document.querySelector(".volumeProgress").style.width = "70%";

  console.log("Spotify Clone initialized successfully!");
}

// Start the application when the page loads
document.addEventListener("DOMContentLoaded", init);
