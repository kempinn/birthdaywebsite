"use client";

import { useEffect, useRef } from "react";

export default function FlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    // 1. Coba putar musik secara otomatis saat pertama kali dimuat
    const playMusic = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.log("Autoplay diblokir browser, menunggu interaksi pertama...");

        // 2. Solusi Cadangan: Putar musik otomatis pada KLIK / SENTUHAN pertama pengguna di mana saja
        const unlockAudio = async () => {
          try {
            await audio.play();
            // Hapus listener setelah musik berhasil berputar agar tidak terpanggil terus
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
  }, []);

  return (
    <>
      {children}

      {/* Elemen audio global untuk seluruh halaman flow */}
      <audio ref={audioRef} loop preload="auto" className="hidden">
        <source src="/music/birthdaysong.mp3" type="audio/mpeg" />
        Browsermu tidak mendukung elemen audio.
      </audio>
    </>
  );
}