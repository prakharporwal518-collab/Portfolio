import { useEffect, useState } from "react";

// CSS-3D cube loader with a progress %. Finishes when the page has loaded.
export default function Loader({ onDone }) {
  const [p, setP] = useState(0);
  const [out, setOut] = useState(false);
  useEffect(() => {
    let v = 0, done = document.readyState === "complete";
    const onLoad = () => (done = true);
    window.addEventListener("load", onLoad);
    const id = setInterval(() => {
      v = Math.min(done ? v + 9 : v + (92 - v) * 0.07, 100);
      setP(Math.round(v));
      if (v >= 100) {
        clearInterval(id);
        setOut(true);
        setTimeout(onDone, 450);
      }
    }, 40);
    const failsafe = setTimeout(() => (done = true), 4000);
    return () => { clearInterval(id); clearTimeout(failsafe); window.removeEventListener("load", onLoad); };
  }, [onDone]);
  return (
    <div className={`loader ${out ? "loader--out" : ""}`} role="status" aria-label={`Loading ${p}%`}>
      <div className="cube3d">
        {["f", "b", "l", "r", "t", "d"].map((s) => <span key={s} className={`face ${s}`} />)}
      </div>
      <div className="loader__pct">{p}%</div>
      <div className="loader__bar"><i style={{ width: `${p}%` }} /></div>
    </div>
  );
}
