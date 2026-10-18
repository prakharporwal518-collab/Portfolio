import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Icon from "./Icon.jsx";
import Section from "./Section.jsx";
import { projects, hiddenRepos } from "../data/portfolio.js";
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

const norm = (n) => n.toLowerCase();
const prettify = (n) => n.replace(/[-_]+/g, " ").trim().replace(/\b\w/g, (c) => c.toUpperCase());

// Curated projects first (live link filled from GitHub's "Website" field if empty), then any new repos.
function useProjects() {
  const [list, setList] = useState(projects);
  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/projects", { signal: ctrl.signal })
      .then((r) => (r.ok && r.headers.get("content-type")?.includes("json") ? r.json() : []))
      .then((repos) => {
        if (!Array.isArray(repos) || !repos.length) return;
        const byName = new Map(repos.map((r) => [norm(r.name), r]));
        const known = new Set(projects.map((p) => norm(p.repo)));
        const hidden = new Set(hiddenRepos.map(norm));
        const curated = projects.map((p) => ({ ...p, live: p.live || byName.get(norm(p.repo))?.homepage || "" }));
        const extra = repos.filter((r) => !known.has(norm(r.name)) && !hidden.has(norm(r.name))).map((r) => ({
          repo: r.name, title: prettify(r.name), text: r.description || "A project on my GitHub — open the code to explore it.",
          tags: [r.language, ...r.topics].filter(Boolean).slice(0, 4), github: r.url, live: r.homepage,
        }));
        setList([...curated, ...extra]);
      })
      .catch(() => { /* keep curated list */ });
    return () => ctrl.abort();
  }, []);
  return list;
}

export default function Projects() {
  const list = useProjects();
  return (
    <Section id="projects" kicker="Projects" title="Things I’ve built">
      <div className="projects">
        {list.map((p, i) => (
          <motion.div key={p.repo || p.title} style={{ perspective: 1000 }}
            initial={{ opacity: 0, rotateY: i % 2 ? 40 : -40, x: i % 2 ? 80 : -80, z: -200 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0, z: 0 }} viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: (i % 2) * 0.12, ease: [0.2, 0.7, 0.2, 1] }}>
            <Tilt className="project glass">
              <div className="project__num">{String(i + 1).padStart(2, "0")}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              <div className="project__links">
                {p.live && <a className="btn btn--primary btn--sm" href={p.live} target="_blank" rel="noreferrer"><Icon name="external" size={15} /> Live Demo</a>}
                {p.github && <a className="btn btn--ghost btn--sm" href={p.github} target="_blank" rel="noreferrer"><Icon name="github" size={15} /> Code</a>}
              </div>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
