import { useState } from "react";
import Icon from "./Icon.jsx";
import { NAV } from "./Sidebar.jsx";
import { scrollToId } from "./scroll.js";

// Search jumps to the first section whose name or text matches.
export default function Topbar() {
  const [q, setQ] = useState("");
  const [miss, setMiss] = useState(false);
  const search = (e) => {
    e.preventDefault();
    const s = q.trim().toLowerCase();
    if (!s) return;
    const hit = NAV.find(([id, label]) => label.toLowerCase().includes(s)) ||
      NAV.find(([id]) => document.getElementById(id)?.textContent.toLowerCase().includes(s));
    setMiss(!(hit && scrollToId(hit[0])));
  };
  return (
    <header className="topbar">
      <form className={`search glass ${miss ? "search--miss" : ""}`} onSubmit={search} role="search">
        <Icon name="search" />
        <input value={q} onChange={(e) => { setQ(e.target.value); setMiss(false); }} placeholder="Search my portfolio… (e.g. React, projects)" aria-label="Search portfolio" />
      </form>
      <div className="status glass"><i className="pulse" /> Available for opportunities</div>
    </header>
  );
}
