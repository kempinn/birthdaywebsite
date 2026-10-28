"use client";

import React, { useState, useRef } from "react";
import { Cormorant_Garamond } from "next/font/google";
import { useRouter } from "next/navigation";
import styles from "@/app/videoplay/video.module.css";
import { bodoni } from "@/app/fonts";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export default function VideoPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <main className={styles.videoPage}>
      {/* JUDUL HALAMAN */}
      <div className={styles.titleContainer}>
        <h1
          className={`${bodoni.className} ${styles.videoTitle} ${styles.shimmerText} text-5xl md:text-6xl font-bold items-center text-center italic tracking-widest`}
        >
          Our Best Captured Memory
        </h1>
        <p className={`${cormorant.className} ${styles.videoSubtitle}`}>
          ✦ a special video message ✦
        </p>
      </div>

      {/* KONTAINER VIDEO UTAMA */}
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          src="/video/memoriesvideo.mp4"
          className={styles.mainVideo}
          controls
          onPlay={() => setIsVideoPlaying(true)}
          onPause={() => setIsVideoPlaying(false)}
        />
        
        {!isVideoPlaying && (
          <button 
            type="button" 
            className={styles.centerPlayBtn}
            onClick={toggleVideoPlay}
          >
            ▶
          </button>
        )}
      </div>

      {/* TOMBOL NAVIGASI BAWAH */}
      <button
        type="button"
        onClick={() => {
          router.push("/wishes");
        }}
        className={`
          ${cormorant.className}
          button
          group relative mt-7 rounded-full
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
          Birthday Wishes
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </button>
    </main>
  );
}