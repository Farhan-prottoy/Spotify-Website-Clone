import Header from "./components/Header";
import NowPlayingBar from "./components/NowPlayingBar";
import QueuePanel from "./components/QueuePanel";
import Sidebar from "./components/Sidebar";
import SongList from "./components/SongList";
import { usePlayer } from "./context/PlayerContext";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";

export default function App() {
  const { togglePlayPause, playNext, playPrevious, isQueueOpen } = usePlayer();

  useKeyboardShortcuts({
    onPlayPause: togglePlayPause,
    onNext: playNext,
    onPrev: playPrevious,
  });

  return (
    <div className="app">
      <div className={`app-body ${isQueueOpen ? "with-queue" : ""}`}>
        <Sidebar />
        <main className="main-view">
          <Header />
          <SongList />
        </main>
        {isQueueOpen ? <QueuePanel /> : null}
      </div>
      <NowPlayingBar />
    </div>
  );
}
