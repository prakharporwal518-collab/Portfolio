import { useState } from "react";
import { motion } from "framer-motion";
import Icon from "./Icon.jsx";
import Section from "./Section.jsx";
import { certifications, achievements } from "../data/portfolio.js";

function Cert({ c, i }) {
  const [flip, setFlip] = useState(false); // tap to flip on touch screens
  return (
    <motion.div className={`cert ${flip ? "cert--flip" : ""}`} onClick={() => setFlip(!flip)} data-hover
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
      <div className="cert__inner">
        <div className="cert__face glass">
          <Icon name="award" size={30} />
          <h3>{c.name}</h3>
          <p>{c.issuer}</p>
          <small className="muted">Hover / tap to flip</small>
        </div>
        <div className="cert__face cert__back glass">
          <small>Issued</small>
          <b>{c.date}</b>
          {c.url
            ? <a className="btn btn--primary btn--sm" href={c.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>View <Icon name="external" size={15} /></a>
            : <span className="btn btn--ghost btn--sm btn--disabled">View soon</span>}
        </div>
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  return (
    <>
      <Section id="certifications" kicker="Certifications" title="Learning, certified">
        <div className="certs">{certifications.map((c, i) => <Cert key={c.name} c={c} i={i} />)}</div>
      </Section>
      <Section id="achievements" kicker="Achievements" title="Milestones so far">
        <ol className="timeline">
          {achievements.map((a, i) => (
            <motion.li key={a.title} className={i % 2 ? "right" : "left"}
              initial={{ opacity: 0, x: i % 2 ? 120 : -120, rotateY: i % 2 ? -35 : 35, z: -150 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0, z: 0 }} viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }} style={{ transformPerspective: 1000 }}>
              <div className="glass"><span className="date">{a.date}</span><h3>{a.title}</h3><p>{a.text}</p></div>
            </motion.li>
          ))}
        </ol>
      </Section>
    </>
  );
}
