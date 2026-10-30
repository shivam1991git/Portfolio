"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Three.js lives in its own chunk and is only requested on capable desktops
const StackScene = dynamic(() => import("./three/StackScene"), { ssr: false });

const LAYERS = [
  { index: "01", name: "Client", stack: "React · Next.js", top: "24%" },
  { index: "02", name: "API", stack: "Node.js · NestJS", top: "41%" },
  { index: "03", name: "Data", stack: "MongoDB · MySQL", top: "58%" },
];

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Static CSS rendering of the same stack — used on phones, for reduced motion, and while 3D loads. */
function StackFallback({ hidden }: { hidden: boolean }) {
  const plane = (top: string, accent?: boolean, children?: React.ReactNode) => (
    <div
      className="absolute left-1/2 aspect-square w-[49%]"
      style={{ top, transform: "translate(-50%, -50%) rotateX(59deg) rotateZ(-45deg)" }}
    >
      <div
        className={`h-full w-full rounded-[6px] border bg-ink-800/80 p-[9%] ${
          accent ? "border-accent/80" : "border-white/25"
        }`}
      >
        {children}
      </div>
    </div>
  );

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 transition-opacity duration-700 ${hidden ? "opacity-0" : "opacity-100"}`}
    >
      {plane(
        "67%",
        false,
        <div className="grid h-full grid-cols-3 items-center gap-[10%]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="aspect-square rounded-full border border-white/30 bg-ink-700" />
          ))}
        </div>
      )}
      {plane(
        "50%",
        true,
        <div className="relative h-full">
          {["left-0 top-0", "right-0 top-0", "left-0 bottom-0", "right-0 bottom-0"].map((pos) => (
            <span key={pos} className={`absolute ${pos} h-[12%] w-[12%] rounded-full bg-zinc-300`} />
          ))}
          <span className="absolute left-1/2 top-1/2 h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_24px_rgb(255_107_61/0.8)]" />
        </div>
      )}
      {plane(
        "33%",
        false,
        <div className="flex h-full flex-col gap-[8%]">
          <div className="h-[14%] rounded-sm bg-ink-700" />
          <div className="grid flex-1 grid-cols-3 gap-[8%]">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`rounded-sm ${i === 0 ? "bg-accent" : "bg-ink-700"}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function HeroVisual() {
  const [enable3d, setEnable3d] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const capable =
      window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      supportsWebGL();

    if (!capable) return;

    // Wait until the browser is idle so 3D never competes with first paint
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setEnable3d(true), { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setEnable3d(true), 600);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[540px]">
      <StackFallback hidden={ready} />

      {enable3d && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        >
          <StackScene onReady={() => setReady(true)} />
        </div>
      )}

      {/* Layer legend */}
      <ul className="pointer-events-none absolute inset-0" aria-label="Layers of the stack I work across">
        {LAYERS.map((layer) => (
          <li
            key={layer.name}
            className="absolute right-0 rounded-md bg-ink-950/75 px-2 py-1 text-right font-mono backdrop-blur-sm"
            style={{ top: layer.top }}
          >
            <p className="text-[10px] uppercase tracking-[0.18em] text-subtle sm:text-[11px]">
              <span className="text-accent">{layer.index}</span> {layer.name}
            </p>
            <p className="mt-0.5 hidden text-[11px] text-muted sm:block">{layer.stack}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
