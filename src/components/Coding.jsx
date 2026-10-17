import { motion } from "framer-motion";
import Icon from "./Icon.jsx";
import Section from "./Section.jsx";
import Counter from "./Counter.jsx";
import { Tilt } from "./Projects.jsx";
import { platforms } from "../data/portfolio.js";
import { useStats } from "../hooks/useStats.js";

const RINGS = [["easy", "Easy", "#22c55e"], ["medium", "Medium", "#f59e0b"], ["hard", "Hard", "#ef4444"]];
const LOGO = { leetcode: "LC", gfg: "GfG", codechef: "CC", codeforces: "CF", hackerrank: "HR", github: "GH" };

function Ring({ value, total, label, color, i }) {
  const pct = total ? Math.min(value / total, 1) : 0;
  return (
    <div className="ring" style={{ "--c": color }}>
      <svg viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="50" className="ring__track" />
        <motion.circle cx="60" cy="60" r="50" className="ring__bar" initial={{ pathLength: 0 }} whileInView={{ pathLength: pct || 0.001 }}
          viewport={{ once: true }} transition={{ duration: 1.6, delay: i * 0.2, ease: "easeOut" }} />
      </svg>
      <div className="ring__label"><b><Counter value={value} /></b><small>{label}</small></div>
    </div>
  );
}

const statLines = (k, s) => ({
  leetcode: [["Solved", s.solved], ["Easy / Med / Hard", `${s.easy ?? 0} / ${s.medium ?? 0} / ${s.hard ?? 0}`], ["Contest rating", s.rating || "—"]],
  gfg: [["Problems solved", s.solved], ["Coding score", s.score]],
  codechef: [["Stars", s.stars ? `${s.stars}★` : "—"], ["Rating", s.rating || "—"], ["Highest", s.highest || "—"]],
  codeforces: [["Rating", s.rating || "—"], ["Rank", s.rank], ["Solved", s.solved ?? "—"]],
  hackerrank: [["Badges", s.badges], ["Stars", s.stars]],
  github: [["Public repos", s.repos], ["Contributions (1y)", s.contributions ?? "—"]],
})[k];

export default function Coding() {
  const { stats, live } = useStats();
  const total = ["leetcode", "gfg", "codechef", "codeforces", "hackerrank"].reduce((n, k) => n + (Number(stats[k]?.solved) || 0), 0);
  const lc = stats.leetcode;
  return (
    <Section id="coding" kicker="Coding Platforms" title="Problem solving, by the numbers">
      <div className="coding-top">
        <div className="total glass">
          <small>Total Problems Solved</small>
          <b className="grad"><Counter value={total} duration={2} />+</b>
          <span className={`badge ${live ? "badge--live" : ""}`}>{live ? "● Live stats" : "Static stats"}</span>
        </div>
        <div className="leetcode glass">
          <div className="leetcode__head"><span className="logo" style={{ "--c": platforms.leetcode.color }}>LC</span><div><b>LeetCode</b><small>{lc.rating ? `Contest rating ${lc.rating}` : "Problems by difficulty"}</small></div></div>
          <div className="rings">{RINGS.map(([k, l, c], i) => <Ring key={k} i={i} value={lc[k] || 0} total={lc.solved || 0} label={l} color={c} />)}</div>
        </div>
      </div>
      <div className="platforms">
        {Object.entries(platforms).map(([k, p], i) => (
          <motion.div key={k} initial={{ opacity: 0, y: 50, rotateX: -30 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}>
            <Tilt className="platform glass" max={8}>
              <div className="platform__head"><span className="logo" style={{ "--c": p.color }}>{LOGO[k]}</span><div><b>{p.name}</b><small>{p.username ? `@${p.username}` : "Profile coming soon"}</small></div></div>
              <dl>{statLines(k, stats[k]).map(([a, b]) => <div key={a}><dt>{a}</dt><dd>{typeof b === "number" ? <Counter value={b} /> : b}</dd></div>)}</dl>
              {p.username
                ? <a className="btn btn--ghost btn--sm" href={p.url(p.username)} target="_blank" rel="noreferrer">Visit Profile <Icon name="external" size={15} /></a>
                : <span className="btn btn--ghost btn--sm btn--disabled" aria-disabled>Visit Profile</span>}
            </Tilt>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
