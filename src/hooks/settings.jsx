import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { platforms, profile } from "../data/portfolio.js";

// Settings saved from the admin panel (/api/settings) layered over src/data/portfolio.js.
const Ctx = createContext(null);

function merge(r) {
  const usernames = Object.fromEntries(Object.entries(platforms).map(([k, p]) => [k, r?.usernames?.[k] || p.username]));
  const email = r?.email || profile.email;
  const links = Object.fromEntries(Object.entries(r?.socials || {}).filter(([, v]) => v));
  return { usernames, email, socials: { ...profile.socials, ...links, email: `mailto:${email}` }, hasResume: !!r?.hasResume, online: !!r };
}

export function SettingsProvider({ children }) {
  const [remote, setRemote] = useState(null);
  const reload = useCallback(
    () => fetch("/api/settings", { cache: "no-store" })
      .then((r) => (r.ok && r.headers.get("content-type")?.includes("json") ? r.json() : null))
      .then((d) => d && setRemote(d))
      .catch(() => { /* offline / local dev: use data file only */ }),
    []
  );
  useEffect(() => { reload(); }, [reload]);
  const value = useMemo(() => ({ ...merge(remote), raw: remote, reload }), [remote, reload]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useSettings = () => useContext(Ctx);
