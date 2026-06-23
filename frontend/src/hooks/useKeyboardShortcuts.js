import { useEffect } from "react";

export function useKeyboardShortcuts({ onPlayPause, onNext, onPrev }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      const tag = document.activeElement?.tagName?.toLowerCase();
      const isTyping = tag === "input" || tag === "textarea";
      if (isTyping) return;

      if (event.code === "Space") {
        event.preventDefault();
        onPlayPause();
      }
      if (event.code === "ArrowRight" && event.shiftKey) {
        onNext();
      }
      if (event.code === "ArrowLeft" && event.shiftKey) {
        onPrev();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onNext, onPlayPause, onPrev]);
}
