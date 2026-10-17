import * as THREE from "three";
// Radial gradient texture used for soft additive glows (no image files needed).
let tex;
export function glowTexture() {
  if (tex) return tex;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.25, "rgba(255,255,255,.45)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  tex = new THREE.CanvasTexture(c);
  return tex;
}
export const additive = { transparent: true, depthWrite: false, blending: THREE.AdditiveBlending };
