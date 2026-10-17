import { useEffect, useState } from "react";
import { platforms } from "../data/portfolio.js";

const staticStats = () => Object.fromEntries(Object.entries(platforms).map(([k, p]) => [k, { ...p.static }]));

// Starts with static numbers, then merges whatever the live function returns.
export function useStats() {
  const [stats, setStats] = useState(staticStats);
  const [live, setLive] = useState(false);
  useEffect(() => {
    if (!Object.values(platforms).some((p) => p.username)) return;
    const ctrl = new AbortController();
    fetch("/api/stats", { signal: ctrl.signal })
      .then((r) => (r.ok && r.headers.get("content-type")?.includes("json") ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        setStats((s) => Object.fromEntries(Object.entries(s).map(([k, v]) => [k, { ...v, ...(data[k] || {}) }])));
        setLive(Object.keys(data).length > 0);
      })
      .catch(() => { /* keep static fallback */ });
    return () => ctrl.abort();
  }, []);
  return { stats, live };
}
