# Portfolio
My personal developer portfolio — a 3D, animated site built with React, Three.js (React Three Fiber + drei), Framer Motion, GSAP ScrollTrigger and Lenis, deployed on Netlify.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Edit your info
- **No code needed:** open `https://<your-site>/#admin` (or click *Admin* in the footer), log in with the `ADMIN_PASSWORD` environment variable set in Netlify, then set coding-platform usernames, email, LinkedIn/X links and upload your resume PDF. Saved in Netlify Blobs.
- **In code:** name, skills, projects, certificates, achievements and fallback stats live in **`src/data/portfolio.js`**.

## How it works
- **3D scenes** (`src/components/three/`) are lazy-loaded with `React.lazy` + `Suspense`, only mount when scrolled near, and pause when off-screen.
- **Mobile / low-end / reduced-motion**: heavy scenes are replaced by static SVGs (`public/*.svg`); animations are disabled for `prefers-reduced-motion`.
- **Live stats**: `netlify/functions/stats.mjs` (served at `/api/stats`) fetches LeetCode, Codeforces, CodeChef, GeeksforGeeks, HackerRank and GitHub. Anything that fails falls back to the static numbers in the data file. Responses are cached on Netlify's CDN for 6 hours.
- **Admin API**: `netlify/functions/settings.mjs` (`/api/settings`) and `resume.mjs` (`/resume.pdf`), password-checked against `ADMIN_PASSWORD`.
- **Contact form** uses Netlify Forms — submissions show up in the Netlify dashboard under *Forms*.
- `scripts/land-dots.mjs` generated the dotted Earth used by the globe (one-off).
