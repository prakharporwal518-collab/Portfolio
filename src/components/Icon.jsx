// Tiny inline SVG icon set (stroke icons) — avoids an icon library.
const P = {
  home: "M3 11l9-8 9 8M5 10v10h14V10",
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0",
  folder: "M3 7h6l2 2h10v10H3z",
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  award: "M12 15a6 6 0 100-12 6 6 0 000 12zM8.5 14L7 22l5-3 5 3-1.5-8",
  trophy: "M8 21h8M12 17v4M7 4h10v4a5 5 0 01-10 0zM7 6H4a3 3 0 003 4M17 6h3a3 3 0 01-3 4",
  mail: "M3 5h18v14H3zM3 6l9 7 9-7",
  search: "M11 18a7 7 0 100-14 7 7 0 000 14zM21 21l-5-5",
  pin: "M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12zM12 11a2 2 0 100-4 2 2 0 000 4z",
  cap: "M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5",
  briefcase: "M3 7h18v13H3zM8 7V4h8v3",
  code: "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
  brain: "M9 4a3 3 0 00-3 3 3 3 0 00-2 5 3 3 0 002 5 3 3 0 006 0V4M15 4a3 3 0 013 3 3 3 0 012 5 3 3 0 01-2 5 3 3 0 01-6 0",
  stack: "M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6",
  rocket: "M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 15l-3-3c2-6 7-9 14-9 0 7-3 12-9 14zM15 9h.01",
  arrow: "M5 12h14M13 6l6 6-6 6",
  download: "M12 3v12M7 10l5 5 5-5M4 21h16",
  external: "M14 4h6v6M20 4l-9 9M18 14v6H4V6h6",
  github: "M9 19c-4 1.5-4-2-6-2.5M15 22v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 00-6 0C6.8 3.8 5.8 4.1 5.8 4.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004.4 10.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22",
  linkedin: "M4 9h4v12H4zM6 3a2 2 0 110 4 2 2 0 010-4zM10 9h4v2c.6-1 2-2.2 4-2.2 3.4 0 4 2.2 4 5.2v7h-4v-6c0-1.5 0-3.3-2-3.3s-2.2 1.5-2.2 3.2V21H10z",
  x: "M4 4l16 16M20 4L4 20",
  menu: "M4 6h16M4 12h16M4 18h16",
  terminal: "M4 4h16v16H4zM8 9l3 3-3 3M13 15h3",
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4z",
};
export default function Icon({ name, size = 18, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...rest}>
      <path d={P[name]} />
    </svg>
  );
}
