// GET /api/stats — live coding-platform stats. Each platform is fetched
// independently; anything that fails is simply left out, and the site
// falls back to the static numbers in src/data/portfolio.js.
import { platforms } from "../../src/data/portfolio.js";
import { readSettings } from "../lib/store.mjs";

const UA = { "User-Agent": "Mozilla/5.0 (portfolio-stats)" };
const get = (url, opts = {}) =>
  fetch(url, { ...opts, headers: { ...UA, ...opts.headers }, signal: AbortSignal.timeout(7000) }).then((r) => {
    if (!r.ok) throw new Error(`${url} → ${r.status}`);
    return r;
  });
const num = (html, re) => { const m = html.match(re); return m ? Number(m[1]) : undefined; };

const fetchers = {
  async leetcode(u) {
    const query = `query($u:String!){matchedUser(username:$u){submitStatsGlobal{acSubmissionNum{difficulty count}}}userContestRanking(username:$u){rating}}`;
    const r = await get("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
      body: JSON.stringify({ query, variables: { u } }),
    });
    const { data } = await r.json();
    const ac = Object.fromEntries(data.matchedUser.submitStatsGlobal.acSubmissionNum.map((d) => [d.difficulty, d.count]));
    return { solved: ac.All, easy: ac.Easy, medium: ac.Medium, hard: ac.Hard, rating: Math.round(data.userContestRanking?.rating || 0) };
  },
  async codeforces(u) {
    const [info, status] = await Promise.all([
      get(`https://codeforces.com/api/user.info?handles=${u}`).then((r) => r.json()),
      get(`https://codeforces.com/api/user.status?handle=${u}`).then((r) => r.json()).catch(() => null),
    ]);
    const me = info.result[0];
    const solved = status ? new Set(status.result.filter((s) => s.verdict === "OK").map((s) => `${s.problem.contestId}${s.problem.index}`)).size : undefined;
    return { rating: me.rating || 0, maxRating: me.maxRating || 0, rank: me.rank || "unrated", solved };
  },
  async codechef(u) {
    const html = await get(`https://www.codechef.com/users/${u}`).then((r) => r.text());
    return {
      rating: num(html, /rating-number">\s*(\d+)/),
      highest: num(html, /Highest Rating\s*(\d+)/),
      stars: num(html, /(\d)★/),
      solved: num(html, /Total Problems Solved:\s*(\d+)/),
    };
  },
  async gfg(u) {
    const html = await get(`https://www.geeksforgeeks.org/user/${u}/`).then((r) => r.text());
    return { solved: num(html, /total_problems_solved\\?"\s*:\s*(\d+)/), score: num(html, /\\?"score\\?"\s*:\s*(\d+)/) };
  },
  async hackerrank(u) {
    const { models } = await get(`https://www.hackerrank.com/rest/hackers/${u}/badges`).then((r) => r.json());
    return { badges: models.filter((b) => b.stars > 0).length, stars: models.reduce((s, b) => s + (b.stars || 0), 0) };
  },
  async github(u) {
    const [user, contrib] = await Promise.all([
      get(`https://api.github.com/users/${u}`, { headers: { Accept: "application/vnd.github+json" } }).then((r) => r.json()),
      get(`https://github-contributions-api.jogruber.de/v4/${u}?y=last`).then((r) => r.json()).catch(() => null),
    ]);
    return { repos: user.public_repos, followers: user.followers, contributions: contrib?.total?.lastYear };
  },
};

// drop undefined/NaN values so the client keeps its static fallback for them
const clean = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== null && !Number.isNaN(v)));

export default async () => {
  // usernames saved from the admin panel win over the ones in the data file
  const saved = (await readSettings()).usernames || {};
  const user = (k) => saved[k] || platforms[k]?.username;
  const keys = Object.keys(fetchers).filter(user);
  const results = await Promise.allSettled(keys.map((k) => fetchers[k](user(k))));
  const body = {};
  results.forEach((r, i) => {
    if (r.status === "fulfilled") body[keys[i]] = clean(r.value);
    else console.warn(`stats: ${keys[i]} failed —`, r.reason?.message);
  });
  return Response.json(body, {
    headers: {
      "Cache-Control": "public, max-age=600",
      "Netlify-CDN-Cache-Control": "public, durable, s-maxage=21600, stale-while-revalidate=86400",
      "Netlify-Cache-Tag": "stats",
    },
  });
};
