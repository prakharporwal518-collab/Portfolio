// GET /api/projects — your public, non-fork GitHub repos (newest first).
// The site merges these with the curated list in src/data/portfolio.js.
import { platforms } from "../../src/data/portfolio.js";
import { readSettings, json, cdnCache } from "../lib/store.mjs";

export default async () => {
  const user = (await readSettings()).usernames?.github || platforms.github.username;
  try {
    const r = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed&type=owner`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "portfolio-projects" },
      signal: AbortSignal.timeout(7000),
    });
    if (!r.ok) throw new Error(`GitHub ${r.status}`);
    const repos = (await r.json())
      .filter((x) => !x.fork && !x.archived && !x.private)
      .map((x) => ({ name: x.name, description: x.description || "", homepage: x.homepage || "", language: x.language || "", topics: x.topics || [], url: x.html_url, stars: x.stargazers_count, pushed: x.pushed_at }));
    return json(repos, 200, { ...cdnCache("projects"), "Netlify-CDN-Cache-Control": "public, durable, s-maxage=21600, stale-while-revalidate=86400" });
  } catch (e) {
    console.warn("projects fetch failed:", e.message);
    return json([], 200, { "Cache-Control": "no-store" });
  }
};

export const config = { path: "/api/projects" };
