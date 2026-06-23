// Inline SVG icon set styled after Spotify's iconography.
// Each icon inherits `currentColor` so colour is controlled via CSS.

const base = {
  fill: "currentColor",
  "aria-hidden": "true",
};

export function SpotifyLogo({ size = 32 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 1 1-.277-1.215c3.809-.87 7.077-.496 9.713 1.115a.623.623 0 0 1 .206.857zm1.224-2.723a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 1 1-.453-1.493c3.633-1.102 8.147-.568 11.234 1.329a.78.78 0 0 1 .256 1.073zm.105-2.835c-3.223-1.914-8.54-2.09-11.617-1.156a.935.935 0 1 1-.542-1.79c3.532-1.072 9.404-.865 13.115 1.338a.936.936 0 1 1-.956 1.608z" />
    </svg>
  );
}

export function HomeIcon({ size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z" />
    </svg>
  );
}

export function SearchIcon({ size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z" />
    </svg>
  );
}

export function LibraryIcon({ size = 24 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1.5.866l13-7.5a1 1 0 0 0 0-1.732l-13-7.5zM16 19.268V4.732L28.598 12 16 19.268z" transform="translate(-2)" />
      <path d="M7 2a1 1 0 0 1 1 1v18a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1z" />
    </svg>
  );
}

export function PlusIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
    </svg>
  );
}

export function PlayIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M7.05 3.606 19.788 11.5a.59.59 0 0 1 0 1L7.05 20.394A.59.59 0 0 1 6 19.894V4.106a.59.59 0 0 1 1.05-.5z" transform="translate(-1)" />
    </svg>
  );
}

export function PauseIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z" />
    </svg>
  );
}

export function NextIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M5.7 3.5a.7.7 0 0 0-1.075.59v15.82a.7.7 0 0 0 1.075.59l11-7.91a.7.7 0 0 0 0-1.18l-11-7.91zM18 3a1 1 0 0 1 1 1v16a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1z" />
    </svg>
  );
}

export function PrevIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M18.3 3.5a.7.7 0 0 1 1.075.59v15.82a.7.7 0 0 1-1.075.59l-11-7.91a.7.7 0 0 1 0-1.18l11-7.91zM6 3a1 1 0 0 0-1 1v16a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1z" />
    </svg>
  );
}

export function ShuffleIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0v1.5h.39a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.95l-1.018 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.151.922zM.391 3.5H0V5h.39c.62 0 1.21.255 1.633.705l.567.66 1.052-1.18-.503-.587A3.75 3.75 0 0 0 .39 3.5z" />
      <path d="m7.5 10.723 1.052-1.18.503.587a3.75 3.75 0 0 0 2.752 1.27h1.949l-1.018-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L14.16 13H12.21a3.75 3.75 0 0 1-2.873-1.34L7.5 10.723z" transform="translate(4)" />
    </svg>
  );
}

export function RepeatIcon({ size = 18, one = false }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h12.5A3.75 3.75 0 0 1 20 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h6.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25H3.75A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z" transform="translate(2 4)" />
      {one ? <text x="12" y="22" fontSize="9" fontWeight="700" fill="currentColor" textAnchor="middle">1</text> : null}
    </svg>
  );
}

export function HeartIcon({ size = 18, filled = false }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      {filled ? (
        <path d="M12 21.35c5.4-3.6 9-7.2 9-11.55a4.8 4.8 0 0 0-9-2.4 4.8 4.8 0 0 0-9 2.4c0 4.35 3.6 7.95 9 11.55z" />
      ) : (
        <path d="M12 5.81 11.06 4.8a4.8 4.8 0 0 0-7.06 6.5c.83 1.66 2.66 3.4 5.06 5.34L12 18.79l2.94-2.16c2.4-1.93 4.23-3.68 5.06-5.33A4.8 4.8 0 0 0 12.94 4.8L12 5.8zm0 2.14.94-1.01a3.3 3.3 0 0 1 4.87 4.44c-.65 1.3-2.24 2.86-4.5 4.68L12 16.86l-1.31-.96c-2.26-1.82-3.85-3.38-4.5-4.68A3.3 3.3 0 0 1 11.06 6.94L12 7.95z" />
      )}
    </svg>
  );
}

export function QueueIcon({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M15 3a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V3zM2 5a1 1 0 0 1 1-1h9a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1z" />
    </svg>
  );
}

export function VolumeIcon({ size = 18, level = "high" }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} {...base}>
      <path d="M9.741 1.825a.75.75 0 0 1 .509.71v18.93a.75.75 0 0 1-1.262.55L4.448 17.5H1.75A1.75 1.75 0 0 1 0 15.75v-7.5A1.75 1.75 0 0 1 1.75 6.5h2.698l4.54-4.515a.75.75 0 0 1 .753-.16z" transform="translate(2.5 .5)" />
      {level === "muted" ? (
        <path d="M20.78 8.22a.75.75 0 0 0-1.06 0L18 9.94l-1.72-1.72a.75.75 0 1 0-1.06 1.06L16.94 11l-1.72 1.72a.75.75 0 1 0 1.06 1.06L18 12.06l1.72 1.72a.75.75 0 0 0 1.06-1.06L19.06 11l1.72-1.72a.75.75 0 0 0 0-1.06z" />
      ) : level === "low" ? (
        <path d="M16.5 7.5a.75.75 0 0 1 1.06 0 4.95 4.95 0 0 1 0 7.0.75.75 0 1 1-1.06-1.06 3.45 3.45 0 0 0 0-4.88.75.75 0 0 1 0-1.06z" />
      ) : (
        <>
          <path d="M16.5 7.5a.75.75 0 0 1 1.06 0 4.95 4.95 0 0 1 0 7.0.75.75 0 1 1-1.06-1.06 3.45 3.45 0 0 0 0-4.88.75.75 0 0 1 0-1.06z" />
          <path d="M18.62 5.38a.75.75 0 0 1 1.06 0 7.95 7.95 0 0 1 0 11.24.75.75 0 1 1-1.06-1.06 6.45 6.45 0 0 0 0-9.12.75.75 0 0 1 0-1.06z" />
        </>
      )}
    </svg>
  );
}

export function EqualizerIcon({ size = 14 }) {
  // Animated "now playing" bars (animation defined in CSS).
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden="true" className="eq">
      <rect className="eq-bar eq-bar-1" x="1" y="6" width="3" height="10" />
      <rect className="eq-bar eq-bar-2" x="6" y="2" width="3" height="14" />
      <rect className="eq-bar eq-bar-3" x="11" y="9" width="3" height="7" />
    </svg>
  );
}
