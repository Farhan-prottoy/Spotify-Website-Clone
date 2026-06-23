import { useRef, useState } from "react";

/**
 * Spotify-style track bar: green fill, white thumb that appears on hover/drag,
 * click anywhere to seek, and pointer-drag to scrub. Reused for progress + volume.
 */
export default function RangeBar({ value, max, onChange, onCommit, className = "", ariaLabel }) {
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const ratioFromClientX = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    if (rect.width === 0) return 0;
    return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
  };

  const handlePointerDown = (event) => {
    event.preventDefault();
    setDragging(true);
    onChange(ratioFromClientX(event.clientX) * max);

    const handleMove = (moveEvent) => onChange(ratioFromClientX(moveEvent.clientX) * max);
    const handleUp = (upEvent) => {
      setDragging(false);
      const finalValue = ratioFromClientX(upEvent.clientX) * max;
      onCommit?.(finalValue);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  };

  const percent = max > 0 ? Math.min(100, (value / max) * 100) : 0;

  return (
    <div
      ref={trackRef}
      className={`range-bar ${dragging ? "dragging" : ""} ${className}`}
      onPointerDown={handlePointerDown}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={Math.round(max)}
      aria-valuenow={Math.round(value)}
      tabIndex={0}
    >
      <div className="range-track">
        <div className="range-fill" style={{ width: `${percent}%` }}>
          <span className="range-thumb" />
        </div>
      </div>
    </div>
  );
}
