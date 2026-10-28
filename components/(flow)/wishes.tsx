"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/wishes/wishes.module.css";
import { cormorant } from "@/app/fonts"; // Sesuaikan path font jika berbeda

export default function WishesPage() {
  const router = useRouter();

  const textRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const wishesText = `I wish you happiness, good health, success, and endless blessings in this new chapter of your life. May all your dreams come true, your days be filled with joy, and your heart always find peace. Thank you for being such a wonderful part of my life. I hope this year brings you everything you've been wishing for. Stay happy, stay healthy, and keep shining. I love you always. 🤍`;

  // TYPEWRITER EFFECT
  useEffect(() => {
    let currentIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const typeText = () => {
      if (currentIndex < wishesText.length) {
        currentIndex++;
        setDisplayText(wishesText.slice(0, currentIndex));
        timeout = setTimeout(typeText, 35);
      } else {
        setIsTypingComplete(true);
      }
    };

    const startDelay = setTimeout(typeText, 1200);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timeout);
    };
  }, []);

  // AUTO SCROLL KETIKA MENGETIK
  useEffect(() => {
    const container = textRef.current;
    if (!container) return;

    if (!isTypingComplete) {
      container.scrollTop = container.scrollHeight;
    }
  }, [displayText, isTypingComplete]);

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

  return (
    <main className={styles.wishesPage}>
      <div className={styles.wishesCard}>
        <div ref={textRef} className={styles.wishesContent}>
          {/* JUDUL DAN SUBJUDUL DI DALAM KOTAK */}
          <h1 className={`${styles.wishesTitle} ${styles.shimmerText}`}>
            Birthday Wishes
          </h1>
          

          <p className={`${cormorant.className} text-lg text-pink-200 -mt-1 mb-3 font-bold items-center text-center italic tracking-[0.12em]`}>
          Happy Birthday, my love 🤍
          </p>

          <div className={styles.divider} />

          {/* TEKS UTAMA DENGAN EFEK KETIK */}
          <div className={styles.typingContainer}>
            {displayText}
            {!isTypingComplete && <span className={styles.cursor}>|</span>}
          </div>
        </div>
      </div>

      {/* BUTTON MUNCUL SETELAH TYPING SELESAI */}
      {isTypingComplete && (
        <button
          type="button"
          onClick={() => {
            router.push("/ending"); // Sesuaikan route tujuan berikutnya
          }}
          className={`
           ${cormorant.className}
            button
            group relative mt-10 rounded-full
            inline-flex items-center justify-center
            overflow-hidden
            border px-8 py-5
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
            One more thing...
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
        <source src="/music/birthday-song.mp3" type="audio/mpeg" />
      </audio>
    </main>
  );
}
