"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import "./globals.css";
import "./button.css";
import "./gift/gift.module.css";
import "./happybirthday.module.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pathname = usePathname();

  // Tentukan halaman mana saja yang musiknya harus menyala (halaman flow)
  const isFlowPage = 
    pathname.startsWith("/surprise") ||
    pathname.startsWith("/letter") ||
    pathname.startsWith("/memories") ||
    pathname.startsWith("/ending") ||
    pathname.startsWith("/wishes") ||
    pathname.startsWith("/video");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    if (isFlowPage) {
      // Putar musik jika berada di halaman flow
      const playMusic = async () => {
        try {
          await audio.play();
        } catch (error) {
          console.log("Autoplay diblokir browser, menunggu interaksi pertama...");

          // Solusi cadangan: putar saat ada klik/sentuhan pertama di mana saja
          const unlockAudio = async () => {
            try {
              await audio.play();
              window.removeEventListener("click", unlockAudio);
              window.removeEventListener("keydown", unlockAudio);
              window.removeEventListener("touchstart", unlockAudio);
            } catch (e) {
              console.log("Gagal memutar audio:", e);
            }
          };

          window.addEventListener("click", unlockAudio);
          window.addEventListener("keydown", unlockAudio);
          window.addEventListener("touchstart", unlockAudio);
        }
      };

      playMusic();
    } else {
      // Hentikan dan reset musik jika berada di luar halaman flow (halaman awal)
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isFlowPage]);

  return (
    <html lang="en">
      <body>
        {children}

        {/* Elemen audio global hanya dirender ketika berada di halaman flow */}
        {isFlowPage && (
          <audio ref={audioRef} loop preload="auto" className="hidden">
            <source src="/music/birthdaysong.mp3" type="audio/mpeg" />
            Browsermu tidak mendukung elemen audio.
          </audio>
        )}
      </body>
    </html>
  );
}