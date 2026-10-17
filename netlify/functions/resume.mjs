// GET    /resume.pdf → download the uploaded resume
// POST   /resume.pdf → upload a new PDF (admin only, multipart field "file")
// DELETE /resume.pdf → remove it (admin only)
import { purgeCache } from "@netlify/functions";
import { store, isAdmin, json, cdnCache } from "../lib/store.mjs";

const MAX = 4 * 1024 * 1024; // Netlify functions accept ~6 MB request bodies
const purge = () => purgeCache({ tags: ["resume", "settings"] }).catch((e) => console.warn("purge failed:", e.message));

export default async (req) => {
  if (req.method === "GET") {
    const pdf = await store().get("resume", { type: "arrayBuffer" });
    if (!pdf) return new Response("Resume not uploaded yet.", { status: 404, headers: { "Content-Type": "text/plain", ...cdnCache("resume") } });
    return new Response(pdf, {
      headers: { "Content-Type": "application/pdf", "Content-Disposition": 'inline; filename="Prakhar-Porwal-Resume.pdf"', ...cdnCache("resume") },
    });
  }
  if (!isAdmin(req)) return json({ error: "Wrong password" }, 401);

  if (req.method === "DELETE") {
    await store().delete("resume");
    await purge();
    return json({ ok: true });
  }
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let file;
  try { file = (await req.formData()).get("file"); } catch { return json({ error: "Send the PDF as multipart field 'file'" }, 400); }
  if (!file || typeof file === "string") return json({ error: "No file received" }, 400);
  if (file.size > MAX) return json({ error: "PDF must be 4 MB or smaller" }, 413);
  const buf = await file.arrayBuffer();
  if (new TextDecoder().decode(buf.slice(0, 5)) !== "%PDF-") return json({ error: "That file is not a PDF" }, 415);

  await store().set("resume", buf, { metadata: { name: String(file.name).slice(0, 120), size: file.size, uploadedAt: new Date().toISOString() } });
  await purge();
  return json({ ok: true });
};

export const config = { path: "/resume.pdf" };
