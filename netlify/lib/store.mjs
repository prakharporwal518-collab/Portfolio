// Shared helpers for the Netlify functions (kept outside netlify/functions
// so Netlify doesn't treat this file as a function itself).
import { getStore } from "@netlify/blobs";
import { createHash, timingSafeEqual } from "node:crypto";

// One site-wide store holds the admin settings JSON and the resume PDF.
export const store = () => getStore({ name: "portfolio", consistency: "strong" });

export async function readSettings() {
  try {
    return (await store().get("settings", { type: "json" })) || {};
  } catch (e) {
    console.warn("settings read failed:", e.message);
    return {};
  }
}

// Admin requests send "Authorization: Bearer <ADMIN_PASSWORD>".
export function isAdmin(req) {
  const pw = process.env.ADMIN_PASSWORD;
  const given = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!pw || !given) return false;
  const h = (s) => createHash("sha256").update(s).digest();
  return timingSafeEqual(h(given), h(pw));
}

export const json = (body, status = 200, headers = {}) => Response.json(body, { status, headers });

// Cached on Netlify's CDN until we purge the tag after an admin change.
export const cdnCache = (tag) => ({
  "Cache-Control": "public, max-age=0, must-revalidate",
  "Netlify-CDN-Cache-Control": "public, durable, s-maxage=31536000",
  "Netlify-Cache-Tag": tag,
});
