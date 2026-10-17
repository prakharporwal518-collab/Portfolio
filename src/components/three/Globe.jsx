import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import land from "./landDots.json";
import { glowTexture, additive } from "./glow.js";

const R = 2;
const toVec = (lat, lon, r = R) => {
  const phi = ((90 - lat) * Math.PI) / 180, th = ((lon + 180) * Math.PI) / 180;
  return [-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th)];
};
const HOME = [23.26, 77.41]; // Bhopal

function Earth() {
  const g = useRef(), pin = useRef();
  const dots = useMemo(() => {
    const a = new Float32Array((land.length / 2) * 3);
    for (let i = 0; i < land.length; i += 2) a.set(toVec(land[i], land[i + 1], R + 0.01), (i / 2) * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(a, 3));
    return geo;
  }, []);
  useFrame(({ clock }, dt) => {
    g.current.rotation.y += dt * 0.12;
    const s = 1 + Math.sin(clock.elapsedTime * 3) * 0.35;
    pin.current.scale.set(s * 0.5, s * 0.5, 1);
  });
  return (
    <group rotation={[0.35, -1.9, 0]}>
      <group ref={g}>
        <mesh>
          <sphereGeometry args={[R, 48, 48]} />
          <meshStandardMaterial color="#0b1240" emissive="#1e1b4b" emissiveIntensity={0.6} roughness={0.7} />
        </mesh>
        <points geometry={dots}>
          <pointsMaterial size={0.035} color="#7dd3fc" sizeAttenuation transparent opacity={0.9} />
        </points>
        <sprite ref={pin} position={toVec(...HOME, R + 0.05)}>
          <spriteMaterial map={glowTexture()} color="#f472b6" {...additive} />
        </sprite>
      </group>
      {/* atmosphere */}
      <sprite scale={[5.6, 5.6, 1]}>
        <spriteMaterial map={glowTexture()} color="#6366f1" opacity={0.45} {...additive} />
      </sprite>
    </group>
  );
}

export default function Globe({ active }) {
  return (
    <Canvas dpr={[1, 1.75]} frameloop={active ? "always" : "never"} camera={{ position: [0, 0, 7.4], fov: 45 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 3, 5]} color="#60a5fa" intensity={50} />
      <pointLight position={[-5, -2, 2]} color="#a855f7" intensity={30} />
      <Earth />
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} enableDamping />
    </Canvas>
  );
}
