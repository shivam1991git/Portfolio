"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const startMusicRef = useRef<((e: Event) => void) | null>(null);

  useEffect(() => {
    const startMusic = async () => {
      if (!audioRef.current) return;

      try {
        audioRef.current.volume = 0.4;
        await audioRef.current.play();
        setPlaying(true);
      } catch {}
    };

    startMusicRef.current = () => startMusic();

    // Start on ANY interaction
    window.addEventListener("click", startMusicRef.current, { once: true });
    window.addEventListener("scroll", startMusicRef.current, { once: true });
    window.addEventListener("keydown", startMusicRef.current, { once: true });

    return () => {
      if (startMusicRef.current) {
        window.removeEventListener("click", startMusicRef.current);
        window.removeEventListener("scroll", startMusicRef.current);
        window.removeEventListener("keydown", startMusicRef.current);
      }
    };
  }, []);

  const toggle = useCallback(() => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  }, [playing]);

  return (
    <>
      <audio ref={audioRef} loop>
     {/* //   <source src="/docs/bossoli_instrumental.mp3" type="audio/mpeg" /> */}
      </audio>

      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition"
      >
        {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </>
  );
}