// Decides how much 3D/animation this device gets. Computed once.
function detect() {
  if (typeof window === "undefined") return { reduced: true, mobile: true, lite3D: false, full3D: false, particles: 0 };
  const mq = (q) => window.matchMedia(q).matches;
  const reduced = mq("(prefers-reduced-motion: reduce)");
  const mobile = mq("(max-width: 820px), (pointer: coarse)");
  const lowEnd = (navigator.hardwareConcurrency || 8) < 4 || (navigator.deviceMemory || 8) < 4 || navigator.connection?.saveData;
  let webgl = false;
  try {
    const c = document.createElement("canvas");
    webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch { /* no WebGL */ }
  const lite3D = webgl && !reduced && !lowEnd; // light scenes (skills ball)
  const full3D = lite3D && !mobile; // heavy scenes (hero, globe)
  return { reduced, mobile, lowEnd, lite3D, full3D, particles: mobile || lowEnd ? 0.35 : 1 };
}
export const device = detect();
