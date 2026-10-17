import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

// Counts up from 0 when it scrolls into view (re-animates if the value changes, e.g. live stats arrive).
export default function Counter({ value = 0, duration = 1.6 }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true });
  const from = useRef(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(from.current, Number(value) || 0, { duration, ease: "easeOut", onUpdate: (v) => { from.current = v; ref.current && (ref.current.textContent = Math.round(v).toLocaleString()); } });
    return () => c.stop();
  }, [inView, value, duration]);
  return <span ref={ref}>0</span>;
}
