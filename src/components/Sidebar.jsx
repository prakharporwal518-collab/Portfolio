import { useEffect, useState } from "react";
import Icon from "./Icon.jsx";
import { profile } from "../data/portfolio.js";
import { scrollToId } from "./scroll.js";

export const NAV = [
  ["home", "Home", "home"], ["about", "About", "user"], ["skills", "Skills", "spark"], ["projects", "Projects", "folder"],
  ["coding", "Coding", "chart"], ["certifications", "Certifications", "award"], ["achievements", "Achievements", "trophy"], ["contact", "Contact", "mail"],
];

export default function Sidebar({ onAdmin }) {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el); });
    return () => io.disconnect();
  }, []);
  const go = (e, id) => { e.preventDefault(); setOpen(false); scrollToId(id); };
  return (
    <>
      <button className="menu-btn glass" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}><Icon name={open ? "x" : "menu"} /></button>
      <aside className={`sidebar glass ${open ? "sidebar--open" : ""}`}>
        <a href="#home" className="brand" onClick={(e) => go(e, "home")}>
          <span className="brand__cube" aria-hidden /> {profile.firstName} {profile.lastName}
        </a>
        <nav>
          {NAV.map(([id, label, icon]) => (
            <a key={id} href={`#${id}`} onClick={(e) => go(e, id)} className={active === id ? "active" : ""}>
              <Icon name={icon} /> {label}
            </a>
          ))}
        </nav>
        <div className="quote glass">
          <p>“{profile.quote}”</p>
          <a href="#contact" onClick={(e) => go(e, "contact")} aria-label="Contact me"><Icon name="arrow" /></a>
        </div>
        <small className="crafted">&lt;/&gt; Crafted with passion <span>♥</span><a href="#admin" onClick={(e) => { setOpen(false); onAdmin(e); }} className="admin-lock" aria-label="Admin panel" title="Admin">🔒</a></small>
      </aside>
    </>
  );
}
