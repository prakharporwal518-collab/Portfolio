import { useEffect, useState } from "react";
import Icon from "./Icon.jsx";
import { platforms } from "../data/portfolio.js";
import { useSettings } from "../hooks/settings.jsx";

// Password-protected editor (open /#admin). Saves to Netlify Blobs via /api/settings and /resume.pdf.
const PW_KEY = "portfolio-admin";
const readPw = () => { try { return sessionStorage.getItem(PW_KEY) || ""; } catch { return ""; } };
const savePw = (v) => { try { sessionStorage.setItem(PW_KEY, v); } catch { /* private mode */ } };

async function call(url, pw, opts = {}) {
  const r = await fetch(url, { ...opts, headers: { Authorization: `Bearer ${pw}`, ...opts.headers } });
  const data = r.headers.get("content-type")?.includes("json") ? await r.json() : null;
  if (!data) throw new Error("The admin panel only works on the deployed Netlify site.");
  if (!r.ok) throw new Error(data.error || `Error ${r.status}`);
  return data;
}

export default function Admin({ onClose }) {
  const s = useSettings();
  const [pw, setPw] = useState(readPw);
  const [authed, setAuthed] = useState(false);
  const [form, setForm] = useState(null);
  const [msg, setMsg] = useState(["", ""]); // [type, text]
  const [busy, setBusy] = useState(false);
  const [file, setFile] = useState(null);

  // prefill once settings are known
  useEffect(() => {
    if (form) return;
    setForm({ email: s.email, socials: { linkedin: s.raw?.socials?.linkedin || "", x: s.raw?.socials?.x || "" }, usernames: { ...s.usernames } });
  }, [s, form]);
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, [onClose]);

  const run = async (fn, ok) => {
    setBusy(true); setMsg(["", ""]);
    try { await fn(); setMsg(["ok", ok]); } catch (e) { setMsg(["err", e.message]); } finally { setBusy(false); }
  };
  const login = (e) => { e.preventDefault(); run(async () => { await call("/api/settings", pw, { method: "POST", headers: { "Content-Type": "application/json" }, body: '{"check":true}' }); savePw(pw); setAuthed(true); }, "Logged in."); };
  const save = (e) => { e.preventDefault(); run(async () => { await call("/api/settings", pw, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); await s.reload(); }, "Saved! Live stats refresh within a minute."); };
  const upload = () => run(async () => {
    if (!file) throw new Error("Choose a PDF first.");
    if (file.size > 4 * 1024 * 1024) throw new Error("PDF must be 4 MB or smaller.");
    const fd = new FormData(); fd.append("file", file);
    await call("/resume.pdf", pw, { method: "POST", body: fd });
    setFile(null); await s.reload();
  }, "Resume uploaded — the Download Resume button is live.");
  const remove = () => confirm("Delete the uploaded resume?") && run(async () => { await call("/resume.pdf", pw, { method: "DELETE" }); await s.reload(); }, "Resume removed.");

  const set = (group, k) => (e) => setForm((f) => (group ? { ...f, [group]: { ...f[group], [k]: e.target.value } } : { ...f, [k]: e.target.value }));

  return (
    <div className="admin" role="dialog" aria-modal="true" aria-label="Admin panel" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="admin__box glass" data-lenis-prevent>
        <button className="admin__close" onClick={onClose} aria-label="Close"><Icon name="x" /></button>
        <h2>Portfolio Admin</h2>
        {!authed ? (
          <form onSubmit={login} className="form">
            <p className="muted">Enter your admin password (the <code>ADMIN_PASSWORD</code> set in Netlify).</p>
            <label>Password<input type="password" value={pw} onChange={(e) => setPw(e.target.value)} required autoFocus autoComplete="current-password" /></label>
            <button className="btn btn--primary" disabled={busy}>{busy ? "Checking…" : "Log in"}</button>
          </form>
        ) : form && (
          <>
            <form onSubmit={save} className="form">
              <h3>Contact & links</h3>
              <label>Email<input type="email" value={form.email} onChange={set(null, "email")} /></label>
              <label>LinkedIn URL<input type="url" placeholder="https://www.linkedin.com/in/…" value={form.socials.linkedin} onChange={set("socials", "linkedin")} /></label>
              <label>X / Twitter URL<input type="url" placeholder="https://x.com/…" value={form.socials.x} onChange={set("socials", "x")} /></label>
              <h3>Coding platform usernames</h3>
              <div className="admin__grid">
                {Object.entries(platforms).map(([k, p]) => (
                  <label key={k}>{p.name}<input value={form.usernames[k] || ""} onChange={set("usernames", k)} placeholder="username" autoComplete="off" /></label>
                ))}
              </div>
              <button className="btn btn--primary" disabled={busy}>{busy ? "Saving…" : "Save changes"}</button>
            </form>
            <div className="form">
              <h3>Resume (PDF, max 4 MB)</h3>
              <p className="muted">{s.hasResume ? <>A resume is uploaded — <a href="/resume.pdf" target="_blank" rel="noreferrer">view it</a>.</> : "No resume uploaded yet."}</p>
              <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0] || null)} />
              <div className="cta">
                <button className="btn btn--primary" onClick={upload} disabled={busy || !file}><Icon name="download" /> Upload resume</button>
                {s.hasResume && <button className="btn btn--ghost" onClick={remove} disabled={busy}>Delete</button>}
              </div>
            </div>
          </>
        )}
        {msg[1] && <p className={`admin__msg admin__msg--${msg[0]}`} role="status">{msg[1]}</p>}
      </div>
    </div>
  );
}
