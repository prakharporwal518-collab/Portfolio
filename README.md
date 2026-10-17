# Portfolio
My personal developer portfolio — a 3D, animated site built with React, Three.js (React Three Fiber + drei), Framer Motion, GSAP ScrollTrigger and Lenis, deployed on Netlify.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Edit your info
Everything (name, links, skills, projects, certificates, achievements, coding-platform usernames and fallback stats) lives in **`src/data/portfolio.js`**. Put your resume at `public/resume.pdf`.

## How it works
- **3D scenes** (`src/components/three/`) are lazy-loaded with `React.lazy` + `Suspense`, only mount when scrolled near, and pause when off-screen.
- **Mobile / low-end / reduced-motion**: heavy scenes are replaced by static SVGs (`public/*.svg`); animations are disabled for `prefers-reduced-motion`.
- **Live stats**: `netlify/functions/stats.mjs` (served at `/api/stats`) fetches LeetCode, Codeforces, CodeChef, GeeksforGeeks, HackerRank and GitHub. Anything that fails falls back to the static numbers in the data file. Responses are cached on Netlify's CDN for 6 hours.
- **Contact form** uses Netlify Forms — submissions show up in the Netlify dashboard under *Forms*.
- `scripts/land-dots.mjs` generated the dotted Earth used by the globe (one-off).
