import { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, Sparkles, RoundedBox, Edges } from "@react-three/drei";
import { device } from "../../hooks/device.js";
import { glowTexture, additive } from "./glow.js";

const damp = THREE.MathUtils.damp;

function Cube() {
  const outer = useRef(), inner = useRef();
  useFrame((_, dt) => {
    outer.current.rotation.y += dt * 0.25;
    inner.current.rotation.y -= dt * 0.6;
    inner.current.rotation.x += dt * 0.3;
  });
  return (
    <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.6}>
      <group ref={outer} rotation={[0.35, 0.6, 0]}>
        <RoundedBox args={[1.8, 1.8, 1.8]} radius={0.12} smoothness={3}>
          <meshStandardMaterial color="#1e3a8a" emissive="#3b82f6" emissiveIntensity={0.45} metalness={0.6} roughness={0.25} transparent opacity={0.72} />
          <Edges color="#7dd3fc" threshold={20} />
        </RoundedBox>
        <mesh ref={inner}>
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          <meshStandardMaterial color="#e0e7ff" emissive="#a5b4fc" emissiveIntensity={1.4} />
        </mesh>
      </group>
    </Float>
  );
}

function Platform() {
  return (
    <group position={[0, -1.6, 0]} rotation={[0, Math.PI / 4, 0]}>
      {[3.2, 3.7, 4.2].map((s, i) => (
        <mesh key={s} position={[0, -i * 0.22, 0]}>
          <boxGeometry args={[s, 0.1, s]} />
          <meshStandardMaterial color="#0b1030" emissive={i ? "#6d28d9" : "#2563eb"} emissiveIntensity={0.35 - i * 0.08} metalness={0.8} roughness={0.3} transparent opacity={0.85} />
          <Edges color={i ? "#a78bfa" : "#60a5fa"} />
        </mesh>
      ))}
    </group>
  );
}

// Whole hero object tilts toward the mouse; stars drift the other way for parallax.
function Rig() {
  const obj = useRef(), sky = useRef();
  const { viewport } = useThree();
  const x = viewport.width > 7 ? viewport.width * 0.3 : 0;
  const k = Math.min(1, viewport.width / 12); // shrink on narrower screens
  useFrame(({ pointer }, dt) => {
    obj.current.rotation.y = damp(obj.current.rotation.y, pointer.x * 0.4, 3, dt);
    obj.current.rotation.x = damp(obj.current.rotation.x, -pointer.y * 0.18, 3, dt);
    sky.current.position.x = damp(sky.current.position.x, -pointer.x * 0.8, 2, dt);
    sky.current.position.y = damp(sky.current.position.y, -pointer.y * 0.5, 2, dt);
    sky.current.rotation.y += dt * 0.01;
  });
  const n = device.particles;
  return (
    <>
      <group ref={sky}>
        <Stars radius={70} depth={40} count={Math.round(2500 * n)} factor={3.2} saturation={0.6} fade speed={0.6} />
        <Sparkles count={Math.round(50 * n)} scale={[14, 7, 6]} size={2.2} speed={0.3} color="#a78bfa" />
      </group>
      <group ref={obj} position={[x, 0.2, 0]} scale={0.85 * k}>
        <sprite scale={[5.5, 5.5, 1]} position={[0, -0.2, -1.5]}>
          <spriteMaterial map={glowTexture()} color="#4f46e5" opacity={0.55} {...additive} />
        </sprite>
        <Cube />
        <Platform />
      </group>
    </>
  );
}

export default function HeroScene({ active }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 1.2, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      eventSource={document.getElementById("root")}
      eventPrefix="client"
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 4]} color="#60a5fa" intensity={60} />
      <pointLight position={[-4, -1, 3]} color="#a855f7" intensity={45} />
      <directionalLight position={[0, 5, 2]} intensity={0.6} />
      <Rig />
    </Canvas>
  );
}
