import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { skills } from "../../data/portfolio.js";

// Draws a round "badge" for a skill onto a canvas → texture (no icon files to download).
function badge({ short, color }) {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  g.beginPath(); g.arc(128, 128, 112, 0, Math.PI * 2);
  g.fillStyle = "rgba(10,14,40,.92)"; g.fill();
  g.lineWidth = 10; g.strokeStyle = color; g.shadowColor = color; g.shadowBlur = 24; g.stroke();
  g.shadowBlur = 0; g.fillStyle = color; g.textAlign = "center"; g.textBaseline = "middle";
  g.font = `800 ${short.length > 3 ? 64 : 88}px Inter, system-ui, sans-serif`;
  g.fillText(short, 128, 134);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function Tag({ skill, position }) {
  const ref = useRef();
  const [hover, setHover] = useState(false);
  const map = useMemo(() => badge(skill), [skill]);
  useFrame((_, dt) => { const s = THREE.MathUtils.damp(ref.current.scale.x, hover ? 1.35 : 0.95, 8, dt); ref.current.scale.set(s, s, 1); });
  return (
    <sprite ref={ref} position={position} onPointerOver={(e) => (e.stopPropagation(), setHover(true))} onPointerOut={() => setHover(false)}>
      <spriteMaterial map={map} transparent depthWrite={false} />
    </sprite>
  );
}

function Ball() {
  // Fibonacci sphere — evenly spread points
  const points = useMemo(() => skills.map((_, i) => {
    const y = 1 - (i / (skills.length - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * Math.PI * (3 - Math.sqrt(5));
    return new THREE.Vector3(Math.cos(th) * r, y, Math.sin(th) * r).multiplyScalar(2.7);
  }), []);
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[2.25, 1]} />
        <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.18} />
      </mesh>
      {skills.map((s, i) => <Tag key={s.name} skill={s} position={points[i]} />)}
    </group>
  );
}

export default function SkillsBall({ active }) {
  return (
    <Canvas dpr={[1, 1.75]} frameloop={active ? "always" : "never"} camera={{ position: [0, 0, 8], fov: 50 }} gl={{ alpha: true, antialias: true }}>
      <Ball />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.6} rotateSpeed={0.7} enableDamping />
    </Canvas>
  );
}
