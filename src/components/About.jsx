import { motion } from "framer-motion";
import Icon from "./Icon.jsx";
import Section from "./Section.jsx";
import { features } from "../data/portfolio.js";

export default function About() {
  return (
    <Section id="about" kicker="About me" title="What I do">
      <div className="features">
        {features.map((f, i) => (
          <motion.article key={f.title} className="feature glass" data-hover
            initial={{ opacity: 0, y: 40, rotateX: -25 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: i * 0.1 }}>
            <span className="feature__ic"><Icon name={f.icon} size={22} /></span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
            <Icon name="arrow" className="feature__arrow" />
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
