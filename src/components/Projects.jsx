import { useRef } from "react";
import { motion } from "framer-motion";
import Icon from "./Icon.jsx";
import Section from "./Section.jsx";
import { projects } from "../data/portfolio.js";
import { device } from "../hooks/device.js";

// 3D tilt + glow that follows the cursor (CSS variables, no re-renders).
export function Tilt({ children, className = "", max = 12 }) {
  const ref = useRef();
  if (device.mobile || device.reduced) return <div className={className}>{children}</div>;
  const move = (e) => {
    const r = ref.current.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    ref.current.style.setProperty("--mx", `${x * 100}%`);
    ref.current.style.setProperty("--my", `${y * 100}%`);
    ref.current.style.transform = `perspective(900px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg) scale(1.02)`;
  };
  const leave = () => (ref.current.style.transform = "");
  return <div ref={ref} className={`tilt ${className}`} onPointerMove={move} onPointerLeave={leave}>{children}</div>;
}

export default function Projects() {
  return (
    <Section id="projects" kicker="Projects" title="Things I’ve built">
      <div className="projects">
        {projects.map((p, i) => (
          <motion.div key={p.title} style={{ perspective: 1000 }}
            initial={{ opacity: 0, rotateY: i % 2 ? 40 : -40, x: i % 2 ? 80 : -80, z: -200 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0, z: 0 }} viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: (i % 2) * 0.12, ease: [0.2, 0.7, 0.2, 1] }}>
            <Tilt className="project glass">
              <div className="project__num">0{i + 1}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              <div className="project__links">
                {p.github && <a href={p.github} target="_blank" rel="noreferrer"><Icon name="github" /> Code</a>}
                {p.live && <a href={p.live} target="_blank" rel="noreferrer"><Icon name="external" /> Live</a>}
                {!p.github && !p.live && <span className="muted">Coming soon</span>}
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
