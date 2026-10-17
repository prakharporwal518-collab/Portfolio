// GET  /api/settings → public settings (usernames, links, email, hasResume)
// POST /api/settings → save settings (admin only). Body {check:true} just verifies the password.
import { purgeCache } from "@netlify/functions";
import { store, readSettings, isAdmin, json, cdnCache } from "../lib/store.mjs";

const PLATFORMS = ["leetcode", "gfg", "codechef", "codeforces", "hackerrank", "github"];
const LINKS = ["linkedin", "x"];
const clip = (v, n) => (typeof v === "string" ? v.trim().slice(0, n) : "");

export default async (req) => {
  if (req.method === "GET") {
    const [settings, resume] = await Promise.all([readSettings(), store().getMetadata("resume").catch(() => null)]);
    return json({ ...settings, hasResume: !!resume }, 200, cdnCache("settings"));
  }
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (!process.env.ADMIN_PASSWORD) return json({ error: "ADMIN_PASSWORD is not set in Netlify environment variables" }, 500);
  if (!isAdmin(req)) return json({ error: "Wrong password" }, 401);

  let body;
  try { body = await req.json(); } catch { return json({ error: "Invalid JSON" }, 400); }
  if (body.check) return json({ ok: true });

  const email = clip(body.email, 120);
  const settings = {
    usernames: Object.fromEntries(PLATFORMS.map((k) => [k, clip(body.usernames?.[k], 60).replace(/[^\w.-]/g, "")])),
    socials: Object.fromEntries(LINKS.map((k) => { const v = clip(body.socials?.[k], 300); return [k, /^https:\/\//i.test(v) ? v : ""]; })),
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "",
    updatedAt: new Date().toISOString(),
  };
  await store().setJSON("settings", settings);
  await purgeCache({ tags: ["settings", "stats"] }).catch((e) => console.warn("purge failed:", e.message));
  return json({ ok: true, settings });
};

export const config = { path: "/api/settings" };
