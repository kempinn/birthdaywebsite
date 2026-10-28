"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Dancing_Script } from "next/font/google";
import styles from "@/app/letter/letter.module.css";
import { cormorant } from "@/app/fonts";
import { letterText } from "../../app/letter/letterTexts"; // <--- Diimpor dari file terpisah

// Inisialisasi font gaya latin / cursive yang aesthetic
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function LetterPage() {
  const router = useRouter();

  const textRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Menggunakan useRef untuk menampung teks ketikan agar TIDAK memicu re-render React tiap huruf
  const typedTextRef = useRef("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // TYPEWRITER EFFECT (Dioptimasi tanpa setState per karakter agar 60 FPS mulus)
  useEffect(() => {
    let currentIndex = 0;
    let timer: NodeJS.Timeout;

    const typeText = () => {
      if (currentIndex <= letterText.length) {
        typedTextRef.current = letterText.slice(0, currentIndex);
        
        // Update langsung ke DOM elemen khusus teks agar tidak mentrigger React Re-render
        const targetElement = document.getElementById("typewriter-target");
        if (targetElement) {
          targetElement.textContent = typedTextRef.current;
        }

        // Auto scroll container secara efisien
        const container = textRef.current;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }

        currentIndex++;
        timer = setTimeout(typeText, 25); // Kecepatan dikit dinaikin agar lebih responsif
      } else {
        setIsTypingComplete(true);
      }
    };

    const startDelay = setTimeout(typeText, 1200);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timer);
    };
  }, []);

  // AUTO PLAY MUSIC
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    const playMusic = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.log("Autoplay diblokir browser:", error);
      }
    };

    playMusic();
  }, []);

  // SLIDER VERTIKAL (Di-throttle agar tidak memicu reflow berat)
  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const container = textRef.current;
    if (!container) return;

    const val = Number(event.target.value);
    const maxScroll = container.scrollHeight - container.clientHeight;
    container.scrollTop = (val / 100) * maxScroll;
    setScrollProgress(val);
  };

  // Handle manual scroll user untuk update progress bar slider
  useEffect(() => {
    const container = textRef.current;
    if (!container) return;

    const handleScroll = () => {
      const maxScroll = container.scrollHeight - container.clientHeight;
      if (maxScroll > 0) {
        setScrollProgress((container.scrollTop / maxScroll) * 100);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className={styles.letterPage}>
      <h1 className={`${styles.letterTitle} ${styles.shimmerText}`}>
        Happy Birthday
      </h1>

      <div className={styles.letterCard}>
        {/* Terapkan font dancingScript dan kelas konten dengan teks renggang */}
        <div ref={textRef} className={`${styles.letterContent} ${dancingScript.className}`}>
          {/* Menggunakan span dengan ID target DOM langsung agar terhindar dari lag Re-render React */}
          <span id="typewriter-target" style={{ whiteSpace: "pre-wrap" }}></span>

          {!isTypingComplete && (
            <span className={styles.cursor}>|</span>
          )}
        </div>

        {isTypingComplete && (
          <div className={styles.verticalSlider}>
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={scrollProgress}
              onChange={handleSliderChange}
              className={styles.verticalRange}
              aria-label="Geser untuk membaca surat"
              style={{
                background: `linear-gradient(to top, #f2b8e8 ${scrollProgress}%, rgba(255,255,255,0.18) ${scrollProgress}%)`,
              }}
            />
          </div>
        )}
      </div>

      {/* BUTTON MUNCUL SETELAH TYPING SELESAI */}
      {isTypingComplete && (
        <button
          type="button"
          onClick={() => {
            router.push("/memories");
          }}
          className={`
            ${cormorant.className}
            button
            group relative mt-10 rounded-full
            overflow-hidden
            border px-8 py-3
            text-sm font-bold tracking-[3px]
            uppercase
            transition-all duration-500 ease-out
            cursor-pointer
            border-pink-300/60
            bg-white/5
            text-pink-100
            hover:border-pink-300
            hover:shadow-[0_0_25px_rgba(244,114,182,0.6)]
            hover:scale-105
            active:scale-95
          `}
        >
          <span className="buttonFill" />
          <span className="relative z-10 flex items-center justify-center gap-3">
            Your Memories
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </button>
      )}

      {/* MUSIC INDICATOR */}
      <div
        className={`${styles.musicButton} ${styles.playing}`}
        aria-label="Music playing"
      >
        ♫
      </div>

      <audio ref={audioRef} autoPlay loop>
        <source
          src="/music/birthday-song.mp3"
          type="audio/mpeg"
        />
      </audio>
    </main>
  );
}