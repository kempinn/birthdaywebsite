"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/ending/ending.module.css"; // <--- Path CSS diperbaiki agar tidak error
import { cormorant } from "@/app/fonts";

export default function EndingPage() {
  const router = useRouter();

  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Bagian awal surat yang menggunakan efek ketik
  const endingText = `Thank you for being part of my life.
I hope this little gift can make your special day even more beautiful.`;

  // TYPEWRITER EFFECT
  useEffect(() => {
    let currentIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const typeText = () => {
      if (currentIndex < endingText.length) {
        currentIndex++;
        setDisplayText(endingText.slice(0, currentIndex));
        timeout = setTimeout(typeText, 40);
      } else {
        setIsTypingComplete(true);
      }
    };

    const startDelay = setTimeout(typeText, 800);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <main className={styles.endingPage}>
      <div className={styles.contentContainer}>
        {/* JUDUL UTAMA */}
        <h1 className={`${styles.endingTitle} ${styles.shimmerText}`}>
          Happy Birthday
          {!isTypingComplete && <span className={styles.cursor}>|</span>}
        </h1>

        {/* PESAN PENUTUP DENGAN EFEK KETIK */}
        <div className={styles.messageBox}>
          <p className={styles.messageText}>{displayText}</p>

          {/* FOREVER YOURS MUNCUL SETELAH KETIK SELESAI DENGAN STYLE SPESIFIK */}
          {isTypingComplete && (
            <p
              className={`
                ${cormorant.className}
                mt-4 text-lg text-pink-200 font-bold italic tracking-[0.12em]
                transition-opacity duration-1000 opacity-100
              `}
            >
              Forever yours. 🤍
            </p>
          )}
        </div>

        {/* TOMBOL REPLAY MUNCUL SETELAH KETIK SELESAI */}
        {isTypingComplete && (
          <button
            type="button"
            onClick={() => {
              router.push("/"); // Sesuaikan route kembali ke awal
            }}
            className={`
               ${cormorant.className}
               button
               group relative mt-6 rounded-full
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
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>↺</span> REPLAY FROM START
            </span>
          </button>
        )}
      </div>

      {/* MUSIC INDICATOR */}
      <div
        className={`${styles.musicButton} ${styles.playing}`}
        aria-label="Music playing"
      >
        ♫
      </div>
    </main>
  );
}