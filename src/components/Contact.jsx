import { lazy, useState } from "react";
import { motion } from "framer-motion";
import Icon from "./Icon.jsx";
import Section from "./Section.jsx";
import Lazy3D from "./Lazy3D.jsx";
import { device } from "../hooks/device.js";
import { profile } from "../data/portfolio.js";

const Globe = lazy(() => import("./three/Globe.jsx"));
const encode = (d) => new URLSearchParams(d).toString();

export default function Contact() {
  const [state, setState] = useState("idle"); // idle | sending | sent | error
  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    try {
      // Netlify Forms: POST url-encoded data to "/" — submissions appear in the Netlify dashboard
      const r = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: encode({ "form-name": "contact", ...Object.fromEntries(new FormData(form)) }) });
      if (!r.ok) throw new Error(r.status);
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  };
  return (
    <Section id="contact" kicker="Contact" title="Let’s build something together">
      <div className="contact">
        <Lazy3D Scene={Globe} enabled={device.full3D} className="contact__globe" fallback={<img className="globe-static" src="/globe-static.svg" alt="" width="360" height="360" loading="lazy" />} />
        <motion.form className="form glass" onSubmit={submit} name="contact" initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="muted">Based in {profile.location} — open to internships, collaborations and open-source.</p>
          <input type="hidden" name="form-name" value="contact" />
          <p hidden><label>Don’t fill this: <input name="bot-field" /></label></p>
          <label>Name<input name="name" required maxLength={80} autoComplete="name" /></label>
          <label>Email<input name="email" type="email" required autoComplete="email" /></label>
          <label>Message<textarea name="message" rows="5" required maxLength={2000} /></label>
          <button className="btn btn--primary" disabled={state === "sending"}>{state === "sending" ? "Sending…" : <>Send Message <Icon name="send" /></>}</button>
          <p className="form__msg" role="status">
            {state === "sent" && "✅ Thanks! Your message was sent — I’ll get back to you soon."}
            {state === "error" && <>⚠️ Couldn’t send right now. Please email me at <a href={profile.socials.email}>{profile.email}</a>.</>}
          </p>
        </motion.form>
      </div>
    </Section>
  );
}
