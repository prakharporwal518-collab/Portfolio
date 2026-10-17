import { lazy } from "react";
import { motion } from "framer-motion";
import Section from "./Section.jsx";
import Lazy3D from "./Lazy3D.jsx";
import { device } from "../hooks/device.js";
import { skills } from "../data/portfolio.js";

const SkillsBall = lazy(() => import("./three/SkillsBall.jsx"));

export default function Skills() {
  const grid = (
    <div className="skill-grid">
      {skills.map((s) => <span key={s.name} style={{ "--c": s.color }}>{s.name}</span>)}
    </div>
  );
  return (
    <Section id="skills" kicker="Skills" title="My tech universe">
      <div className="skills">
        <Lazy3D Scene={SkillsBall} enabled={device.lite3D} fallback={grid} className="skills__ball" />
        <motion.div className="skills__text glass" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h3>Drag the sphere to spin it 🌐</h3>
          <p>I write DSA in C++, build web apps with React and Node, and I’m learning system design, AI and machine learning.</p>
          {device.lite3D && grid}
        </motion.div>
      </div>
    </Section>
  );
}
