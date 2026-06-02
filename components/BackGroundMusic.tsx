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
        type="button"
        aria-label={playing ? "Pause background music" : "Play background music"}
        onClick={toggle}
        className="fixed bottom-4 left-4 z-50 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur transition hover:bg-white/20 sm:bottom-6 sm:left-6"
      >
        {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </>
  );
}
