import { motion } from "framer-motion";
export default function Section({ id, kicker, title, children, className = "" }) {
  return (
    <section id={id} className={`section ${className}`}>
      <motion.header className="section__head" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
        <span className="kicker">{kicker}</span>
        <h2>{title}</h2>
      </motion.header>
      {children}
    </section>
  );
}
