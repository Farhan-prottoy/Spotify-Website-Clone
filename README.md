# Spotify Clone Pro (React + Express)

This project was upgraded from a static HTML/CSS/JS clone into a scalable full-stack architecture.

## New Architecture

```
.
├── frontend/                 # React (Vite) app
│   ├── src/
│   │   ├── components/       # Reusable UI blocks
│   │   ├── context/          # Global player state (Context API)
│   │   └── hooks/            # Keyboard shortcuts hook
├── backend/                  # Node.js + Express API
│   └── src/
│       ├── routes/           # /api endpoints
│       └── data/             # songs.json seed data
├── Songs/                    # Local mp3 files (served by backend)
└── legacy files              # Existing static prototype kept for reference
```

## Implemented (Phase 1 → Phase 5 core)

### Phase 1: UI/UX

- Spotify-style layout: sidebar + main + bottom player
- Responsive behavior (desktop/tablet/mobile)
- Hover transitions and smooth interactions
- Active/highlighted currently playing song
- Album covers + metadata

### Phase 2: Audio Player

- Play/Pause
- Next/Previous
- Seek via progress range
- Current time + duration
- Volume slider
- Shuffle mode
- Repeat modes: off/all/one
- Keyboard shortcut: Space to toggle play/pause

### Phase 3: State Management

- Global `PlayerContext` with:
  - `currentSong`
  - `isPlaying`
  - `currentTime` / `duration`
  - `volume`
  - `shuffle` / `repeatMode`

### Phase 4: Data Management

- Songs moved to backend JSON source
- Express API endpoint: `GET /api/songs`
- Frontend fetches songs dynamically
- Audio files served from `/media/songs`

### Phase 5: Advanced Features (initial)

- Likes/favorites persisted in `localStorage`
- Playlist creation and add-to-playlist
- Song search
- Queue (up next)
- Recently played

## Setup

### 1) Backend

```bash
cd backend
npm install
npm run dev
```

Server starts on `http://localhost:5000`.

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

App starts on `http://localhost:5173`.

## API

- `GET /api/songs` → returns song list
- `GET /media/songs/:filename` → serves mp3 files
- `GET /health` → health check

## Next High-Value Upgrades

1. JWT auth + user model (MongoDB)
2. Persist likes/playlists/recent on backend per user
3. Real queue reordering
4. Unit tests + integration tests
5. Optional deployment with Docker + Render/Railway/Vercel

## Notes

- Existing legacy static files are still present to compare the old and new versions.
- This project is for educational/portfolio use.
