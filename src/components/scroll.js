// Scroll to a section id, through Lenis when it's running.
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return false;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -16 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}
