import { lazy, Suspense, useEffect, useState } from "react";
import { SettingsProvider } from "./hooks/settings.jsx";
import { MotionConfig } from "framer-motion";
import { device } from "./hooks/device.js";
import Loader from "./components/Loader.jsx";
import Cursor from "./components/Cursor.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Coding from "./components/Coding.jsx";
import Certifications from "./components/Certifications.jsx";
import Contact from "./components/Contact.jsx";

const Admin = lazy(() => import("./components/Admin.jsx"));
const isAdminHash = () => window.location.hash === "#admin";

export default function App() {
  const [loaded, setLoaded] = useState(device.reduced || isAdminHash());
  const [admin, setAdmin] = useState(isAdminHash);
  useEffect(() => {
    const onHash = () => setAdmin(isAdminHash());
    addEventListener("hashchange", onHash);
    return () => removeEventListener("hashchange", onHash);
  }, []);
  const closeAdmin = () => { history.replaceState(null, "", location.pathname); setAdmin(false); };

  // Lenis smooth scroll + GSAP ScrollTrigger section transitions (loaded lazily)
  useEffect(() => {
    if (!loaded || device.reduced) return;
    let cleanup = () => {};
    Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({ lerp: 0.1, anchors: true });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (t) => lenis.raf(t * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        window.__lenis = lenis;
        const ctx = gsap.context(() => {
          gsap.utils.toArray(".section").forEach((el) => {
            gsap.fromTo(el,
              { opacity: 0, scale: 0.94, rotateX: 6, z: -120, transformPerspective: 1000 },
              { opacity: 1, scale: 1, rotateX: 0, z: 0, ease: "power2.out", duration: 1,
                scrollTrigger: { trigger: el, start: "top 88%", end: "top 45%", scrub: 0.6 } });
          });
        });
        cleanup = () => { ctx.revert(); gsap.ticker.remove(tick); lenis.destroy(); delete window.__lenis; };
      }
    );
    return () => cleanup();
  }, [loaded]);

  return (
    <SettingsProvider>
    <MotionConfig reducedMotion="user">
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      {!device.mobile && !device.reduced && <Cursor />}
      <Sidebar />
      <div className="main">
        <Topbar />
        <main>
          <Hero ready={loaded} />
          <About />
          <Skills />
          <Projects />
          <Coding />
          <Certifications />
          <Contact />
        </main>
        <footer className="footer">
          <span>&lt;/&gt; Crafted with passion by Prakhar Porwal</span>
          <span>© {new Date().getFullYear()} · <a href="#admin" className="admin-link">Admin</a></span>
        </footer>
      </div>
      {admin && <Suspense fallback={null}><Admin onClose={closeAdmin} /></Suspense>}
    </MotionConfig>
    </SettingsProvider>
  );
}
