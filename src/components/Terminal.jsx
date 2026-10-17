import { useEffect, useRef, useState } from "react";
import Icon from "./Icon.jsx";
import { profile, skills, projects } from "../data/portfolio.js";
import { NAV } from "./Sidebar.jsx";
import { scrollToId } from "./scroll.js";

const WELCOME = ["Welcome to my portfolio!", "Explore my projects, skills and experience.", "Type 'help' to see commands. 🚀"];
const cmds = {
  help: () => ["Commands: about, skills, projects, contact, goto <section>, clear"],
  about: () => [`${profile.firstName} ${profile.lastName} — ${profile.roles.join(", ")}.`, profile.tagline],
  skills: () => [skills.map((s) => s.name).join(" · ")],
  projects: () => projects.map((p, i) => `${i + 1}. ${p.title}`),
  contact: () => [`Email: ${profile.email}`, "Or use the contact form — 'goto contact'."],
  goto: (arg) => {
    const hit = NAV.find(([id, label]) => [id, label.toLowerCase()].includes(arg));
    return hit && scrollToId(hit[0]) ? [`Navigating to ${hit[1]}…`] : [`Unknown section. Try: ${NAV.map((n) => n[0]).join(", ")}`];
  },
};

export default function Terminal() {
  const [lines, setLines] = useState(WELCOME.map((t) => ({ t })));
  const [val, setVal] = useState("");
  const body = useRef();
  useEffect(() => { body.current.scrollTop = body.current.scrollHeight; }, [lines]);
  const run = (e) => {
    e.preventDefault();
    const [cmd, ...rest] = val.trim().toLowerCase().split(/\s+/);
    setVal("");
    if (!cmd) return;
    if (cmd === "clear") return setLines([]);
    const out = cmds[cmd] ? cmds[cmd](rest.join(" ")) : [`command not found: ${cmd} — try 'help'`];
    setLines((l) => [...l, { t: val, cmd: true }, ...out.map((t) => ({ t }))]);
  };
  return (
    <div className="terminal glass" onClick={() => body.current.querySelector("input").focus({ preventScroll: true })}>
      <div className="terminal__bar"><Icon name="terminal" size={15} /> Terminal <i className="pulse" /></div>
      <div className="terminal__body" ref={body} aria-live="polite">
        {lines.map((l, i) => <p key={i} className={l.cmd ? "cmd" : ""}>{l.cmd ? <><span className="prompt">prakhar@portfolio:~$</span> {l.t}</> : <><span className="caret">&gt;</span> {l.t}</>}</p>)}
        <form onSubmit={run}>
          <label className="prompt" htmlFor="term-in">prakhar@portfolio:~$</label>
          <input id="term-in" value={val} onChange={(e) => setVal(e.target.value)} autoComplete="off" spellCheck="false" aria-label="Terminal command" />
        </form>
      </div>
    </div>
  );
}
