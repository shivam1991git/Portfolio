"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/*
 * "The Stack" — three translucent layers (client, API, data) with request
 * packets travelling down and responses travelling back up. The orthographic
 * camera sits at the same angle as the CSS fallback so the two match.
 */

const ACCENT = "#ff6b3d";
const LAYER_GAP = 1.25;
const PLATE = 3;
const PACKET_COUNT = 10;
const LANES: [number, number][] = [
  [-0.9, -0.9],
  [0.9, -0.9],
  [-0.9, 0.9],
  [0.9, 0.9],
  [0, 0],
];

type Pointer = { x: number; y: number };

function Plate({ highlight }: { highlight?: boolean }) {
  const geometry = useMemo(() => new THREE.BoxGeometry(PLATE, 0.05, PLATE), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  return (
    <>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#141417" transparent opacity={0.78} roughness={0.55} metalness={0.25} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={highlight ? ACCENT : "#ffffff"} transparent opacity={highlight ? 0.95 : 0.3} />
      </lineSegments>
    </>
  );
}

/** Top layer: a tiny interface — header bar and a grid of cards. */
function ClientLayer() {
  const cards = [-0.75, 0, 0.75].flatMap((x) => [-0.1, 0.65].map((z) => [x, z] as const));

  return (
    <group position={[0, LAYER_GAP, 0]}>
      <Plate />
      <mesh position={[0, 0.05, -0.95]}>
        <boxGeometry args={[2.3, 0.04, 0.32]} />
        <meshStandardMaterial color="#2a2a30" />
      </mesh>
      {cards.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.06, z]}>
          <boxGeometry args={[0.6, i === 0 ? 0.12 : 0.05, 0.6]} />
          <meshStandardMaterial
            color={i === 0 ? ACCENT : "#24242a"}
            emissive={i === 0 ? ACCENT : "#000000"}
            emissiveIntensity={i === 0 ? 0.35 : 0}
          />
        </mesh>
      ))}
    </group>
  );
}

const API_NODES = LANES.map(([x, z]) => new THREE.Vector3(x, 0.12, z));
const API_WIRES = new THREE.BufferGeometry().setFromPoints(
  LANES.slice(0, 4).flatMap(([x, z]) => [new THREE.Vector3(0, 0.12, 0), new THREE.Vector3(x, 0.12, z)])
);

/** Middle layer: service nodes wired to a central gateway. */
function ApiLayer() {
  return (
    <group>
      <Plate highlight />
      <lineSegments geometry={API_WIRES}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.25} />
      </lineSegments>
      {API_NODES.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[i === 4 ? 0.16 : 0.1, 24, 24]} />
          <meshStandardMaterial
            color={i === 4 ? ACCENT : "#d4d4d8"}
            emissive={i === 4 ? ACCENT : "#000000"}
            emissiveIntensity={i === 4 ? 0.6 : 0}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Bottom layer: database shards. */
function DataLayer() {
  const cylinder = useMemo(() => new THREE.CylinderGeometry(0.34, 0.34, 0.32, 40, 1), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(cylinder, 30), [cylinder]);

  return (
    <group position={[0, -LAYER_GAP, 0]}>
      <Plate />
      {[-0.85, 0, 0.85].map((x) => (
        <group key={x} position={[x, 0.2, 0.15]}>
          <mesh geometry={cylinder}>
            <meshStandardMaterial color="#1f1f24" roughness={0.4} metalness={0.4} />
          </mesh>
          <lineSegments geometry={edges}>
            <lineBasicMaterial color="#ffffff" transparent opacity={0.35} />
          </lineSegments>
        </group>
      ))}
    </group>
  );
}

/** Faint vertical lanes the packets travel along. */
function Lanes() {
  const geometry = useMemo(() => {
    const points = LANES.flatMap(([x, z]) => [
      new THREE.Vector3(x, LAYER_GAP, z),
      new THREE.Vector3(x, -LAYER_GAP, z),
    ]);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.08} />
    </lineSegments>
  );
}

/** Request/response packets — one instanced mesh, updated every frame. */
function Packets() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: PACKET_COUNT }, (_, i) => ({
        lane: LANES[i % LANES.length],
        offset: i / PACKET_COUNT,
        speed: 0.16 + (i % 3) * 0.035,
      })),
    []
  );

  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();

    seeds.forEach((seed, i) => {
      // 0→1 travels down (request), 1→2 travels back up (response)
      const phase = (t * seed.speed + seed.offset) % 1;
      const leg = phase < 0.5 ? phase * 2 : 2 - phase * 2;
      const eased = leg * leg * (3 - 2 * leg);
      dummy.position.set(seed.lane[0], LAYER_GAP - eased * LAYER_GAP * 2, seed.lane[1]);
      const pulse = Math.sin(phase * Math.PI);
      dummy.scale.setScalar(0.5 + pulse * 0.6);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, PACKET_COUNT]}>
      <sphereGeometry args={[0.07, 16, 16]} />
      <meshBasicMaterial color={ACCENT} toneMapped={false} />
    </instancedMesh>
  );
}

/** Keeps the orthographic camera framing the stack at any canvas size. */
function CameraRig() {
  const size = useThree((state) => state.size);
  const get = useThree((state) => state.get);

  useEffect(() => {
    const camera = get().camera as THREE.OrthographicCamera;
    camera.zoom = Math.min(size.width, size.height) / 6.2;
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [get, size]);

  return null;
}

/** Idle sway plus a gentle lean toward the cursor. */
function Stack({ pointer }: { pointer: React.RefObject<Pointer> }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    const g = group.current;
    if (!g) return;
    const t = clock.getElapsedTime();
    const p = pointer.current ?? { x: 0, y: 0 };
    const targetY = Math.sin(t * 0.3) * 0.12 + p.x * 0.35;
    const targetX = p.y * 0.08;
    const k = 1 - Math.exp(-delta * 3);
    g.rotation.y += (targetY - g.rotation.y) * k;
    g.rotation.x += (targetX - g.rotation.x) * k;
    g.position.y = Math.sin(t * 0.6) * 0.05;
  });

  return (
    <group ref={group}>
      <ClientLayer />
      <ApiLayer />
      <DataLayer />
      <Lanes />
      <Packets />
    </group>
  );
}

export default function StackScene({ onReady }: { onReady?: () => void }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const pointer = useRef<Pointer>({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;

    // Stop rendering entirely when the hero is scrolled out of view
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);

    const onMove = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: (event.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={wrapper} className="h-full w-full">
      <Canvas
        orthographic
        camera={{ position: [5, 4.2, 5], near: 0.1, far: 50 }}
        dpr={[1, 1.75]}
        frameloop={visible ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        onCreated={() => onReady?.()}
      >
        <CameraRig />
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 8, 3]} intensity={1.4} />
        <pointLight position={[0, 0.6, 0]} color={ACCENT} intensity={4} distance={4} />
        <Stack pointer={pointer} />
      </Canvas>
    </div>
  );
}
