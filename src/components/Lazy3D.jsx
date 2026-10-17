import { Component, Suspense, useEffect, useRef, useState } from "react";

// Shows the 3D scene only once it scrolls near the screen, pauses it when off-screen,
// and swaps to `fallback` if WebGL is unsupported/disabled or the scene crashes.
class Boundary extends Component {
  state = { err: false };
  static getDerivedStateFromError() { return { err: true }; }
  componentDidCatch(e) { console.warn("3D scene failed, showing fallback:", e?.message); }
  render() { return this.state.err ? this.props.fallback : this.props.children; }
}

export default function Lazy3D({ Scene, enabled, fallback, className = "", ...props }) {
  const ref = useRef();
  const [seen, setSeen] = useState(false);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    const io = new IntersectionObserver(([e]) => { setActive(e.isIntersecting); e.isIntersecting && setSeen(true); }, { rootMargin: "200px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [enabled]);
  return (
    <div ref={ref} className={`canvas-wrap ${className}`}>
      {!enabled ? fallback : seen && (
        <Boundary fallback={fallback}>
          <Suspense fallback={<div className="canvas-loading"><span className="spinner" />Loading 3D…</div>}>
            <Scene active={active} {...props} />
          </Suspense>
        </Boundary>
      )}
    </div>
  );
}
