import { lazy } from "react";
import { motion } from "framer-motion";
import Icon from "./Icon.jsx";
import Lazy3D from "./Lazy3D.jsx";
import Terminal from "./Terminal.jsx";
import { device } from "../hooks/device.js";
import { profile, skills, techStack } from "../data/portfolio.js";
import { scrollToId } from "./scroll.js";
import { useSettings } from "../hooks/settings.jsx";

const HeroScene = lazy(() => import("./three/HeroScene.jsx"));
const up = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] } } };
const color = (n) => skills.find((s) => s.name === n) || { short: n, color: "#a5b4fc" };

export default function Hero({ ready }) {
  const { email, socials: links, hasResume } = useSettings();
  const info = [["pin", "Location", profile.location], ["mail", "Email", email], ["cap", "Education", profile.education], ["briefcase", "Status", profile.status]];
  const socials = [["linkedin", "LinkedIn"], ["github", "GitHub"], ["email", "Email", "mail"], ["x", "X"]];
  return (
    <section id="home" className="hero">
      <div className="hero__grid">
        <div className="hero__main glass">
          <Lazy3D Scene={HeroScene} enabled={device.full3D && ready} className="hero__canvas"
            fallback={<img className="hero__static" src="/hero-static.svg" alt="" width="420" height="420" />} />
          <div className="crumb"><i /> Portfolio / Home</div>
          <motion.div className="hero__text" initial="hidden" animate={ready ? "show" : "hidden"} transition={{ staggerChildren: 0.12 }}>
            <motion.h2 variants={up}>Hello, I’m</motion.h2>
            <motion.h1 variants={up}>{profile.firstName} <span className="grad">{profile.lastName}</span></motion.h1>
            <motion.p variants={up} className="roles">{profile.roles.join("  |  ")}</motion.p>
            <motion.p variants={up} className="lead">{profile.tagline}</motion.p>
            <motion.div variants={up} className="cta">
              <a className="btn btn--primary" href="#projects" onClick={(e) => { e.preventDefault(); scrollToId("projects"); }}>View My Projects <Icon name="arrow" /></a>
              {hasResume
                ? <a className="btn btn--ghost" href="/resume.pdf" download="Prakhar-Porwal-Resume.pdf"><Icon name="download" /> Download Resume</a>
                : <span className="btn btn--ghost btn--disabled" title="Resume coming soon"><Icon name="download" /> Resume coming soon</span>}
            </motion.div>
          </motion.div>
          <div className="code-float glass" aria-hidden>
            <i className="dots" />
            <pre>{`const dreams = [\n  "Build",\n  "Learn",\n  "Grow",\n  "Make an impact"\n];`}</pre>
          </div>
          <div className="tag-float glass" aria-hidden>&lt;/&gt;</div>
        </div>

        <aside className="hero__side">
          <div className="panel glass">
            <h3>Quick Info</h3>
            {info.map(([ic, k, v]) => (
              <div className="info" key={k}><span className="info__ic"><Icon name={ic} /></span><div><small>{k}</small><b>{v}</b></div></div>
            ))}
          </div>
          <div className="panel glass">
            <h3>Tech Stack</h3>
            <div className="stack">
              {techStack.map((n) => { const s = color(n); return <span key={n} title={n} data-hover style={{ "--c": s.color }}>{s.short}</span>; })}
            </div>
          </div>
          <div className="panel glass">
            <h3>Connect With Me</h3>
            <div className="socials">
              {socials.map(([k, label, ic]) => (
                <a key={k} href={links[k]} target={k === "email" ? undefined : "_blank"} rel="noreferrer" aria-label={label}><Icon name={ic || k} /></a>
              ))}
            </div>
          </div>
        </aside>
      </div>
      <Terminal />
    </section>
  );
}
