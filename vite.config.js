import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// three.js, GSAP and Lenis are only reached through dynamic import(),
// so Vite puts them in separate chunks that load after first paint.
export default defineConfig({
  plugins: [react()],
  build: { target: "es2020", chunkSizeWarningLimit: 1200 },
});
