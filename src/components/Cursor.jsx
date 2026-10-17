import { useEffect, useRef } from "react";

// Dot + trailing ring; the ring grows over links/buttons.
export default function Cursor() {
  const dot = useRef(), ring = useRef();
  useEffect(() => {
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      dot.current.style.transform = `translate(${x}px,${y}px)`;
      ring.current.classList.toggle("cursor-ring--hover", !!e.target.closest?.("a,button,input,textarea,[data-hover]"));
    };
    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      ring.current.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    document.documentElement.classList.add("has-cursor");
    addEventListener("pointermove", move, { passive: true });
    loop();
    return () => { cancelAnimationFrame(raf); removeEventListener("pointermove", move); document.documentElement.classList.remove("has-cursor"); };
  }, []);
  return (<><div ref={dot} className="cursor-dot" aria-hidden /><div ref={ring} className="cursor-ring" aria-hidden /></>);
}
