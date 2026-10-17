// One-off generator: node scripts/land-dots.mjs <dir-with-world-atlas>
// Writes src/components/three/landDots.json — [lat,lon,lat,lon,...] on land.
import { createRequire } from "module";
import { writeFileSync } from "fs";
const require = createRequire(process.argv[2] + "/package.json");
const topo = require("world-atlas/land-110m.json");
const { feature } = require("topojson-client");
const land = feature(topo, topo.objects.land);
const polys = land.features.flatMap((f) => (f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates));
const inRing = (x, y, r) => { let c = false; for (let i = 0, j = r.length - 1; i < r.length; j = i++) { const [xi, yi] = r[i], [xj, yj] = r[j]; if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };
const onLand = (lon, lat) => polys.some((p) => inRing(lon, lat, p[0]) && !p.slice(1).some((h) => inRing(lon, lat, h)));
const out = [];
for (let lat = -58; lat <= 82; lat += 2) {
  const step = 2 / Math.max(Math.cos((lat * Math.PI) / 180), 0.3);
  for (let lon = -180; lon < 180; lon += step) if (onLand(lon, lat)) out.push(lat, Math.round(lon * 10) / 10);
}
writeFileSync(new URL("../src/components/three/landDots.json", import.meta.url), JSON.stringify(out));
console.log(out.length / 2, "dots");
