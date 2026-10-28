"use client";

import { useRouter } from "next/navigation";
import styles from "@/app/memories/memories.module.css";
import { cormorant, bodoni } from "@/app/fonts";

export default function MemoriesPage() {
  const router = useRouter();

  // Konfigurasi foto kenangan
  const memoriesPhotos = [
    { id: 1, src: "/image/memoriesPhoto1.jpeg", alt: "Memory 1", imgStyle: { height: "270px", objectPosition: "center" } },
    { id: 2, src: "/image/memoriesPhoto3.jpeg", alt: "Memory 2", imgStyle: { height: "280px", objectPosition: "center 70%" } },
    { id: 3, src: "/image/memoriesPhoto7.jpeg", alt: "Memory 3", imgStyle: { height: "270px", objectPosition: "center" } },
    { id: 4, src: "/image/memoriesPhoto4.jpeg", alt: "Memory 4", imgStyle: { height: "292px", objectPosition: "center" } },
    { id: 5, src: "/image/memoriesPhoto5.jpeg", alt: "Memory 5", imgStyle: { height: "270px", objectPosition: "center" } },
    { id: 6, src: "/image/memoriesPhoto6.jpeg", alt: "Memory 6", imgStyle: { height: "285px", objectPosition: "center" } },
    { id: 7, src: "/image/memoriesPhoto2.jpeg", alt: "Memory 7", imgStyle: { height: "280px", objectPosition: "center" } },
    { id: 8, src: "/image/memoriesPhoto8.jpeg", alt: "Memory 8", imgStyle: { height: "290px", objectPosition: "center" } },
    { id: 9, src: "/image/memoriesPhoto9.jpeg", alt: "Memory 9", imgStyle: { height: "280px", objectPosition: "center" } },
    { id: 10, src: "/image/memoriesPhoto10.jpeg", alt: "Memory 10", imgStyle: { height: "292px", objectPosition: "center" } },
    { id: 11, src: "/image/memoriesPhoto11.jpeg", alt: "Memory 11", imgStyle: { height: "280px", objectPosition: "center" } },
    { id: 12, src: "/image/memoriesPhoto12.jpeg", alt: "Memory 12", imgStyle: { height: "292px", objectPosition: "center" } },
    { id: 13, src: "/image/memoriesPhoto13.jpeg", alt: "Memory 13", imgStyle: { height: "290px", objectPosition: "center" } },
    { id: 14, src: "/image/memoriesPhoto14.jpeg", alt: "Memory 14", imgStyle: { height: "300px", objectPosition: "center" } },
    { id: 15, src: "/image/memoriesPhoto15.jpeg", alt: "Memory 15", imgStyle: { height: "290px", objectPosition: "center" } },
  ];

  return (
    <main className={styles.memoriesPage}>
      {/* TITLE */}
      <div className={styles.titleContainer}>
        <h1 className={`${bodoni.className} ${styles.memoriesTitle} ${styles.shimmerText}`}>
          Little Museum of You
        </h1>
        <p className={`${cormorant.className} ${styles.memoriesSubtitle}`}>
          ✦ Your favorite Gallery ✦
        </p>
      </div>

      {/* RENDER GRID GALLERY */}
      <div className={styles.galleryGrid}>
        {memoriesPhotos.map((photo, index) => (
          <div key={photo.id} className={styles.polaroidCard}>
            <img 
              src={photo.src} 
              alt={photo.alt} 
              style={photo.imgStyle} 
              loading={index < 6 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        ))}
      </div>

      {/* ACTION BUTTON */}
      <button
        type="button"
        onClick={() => router.push("/videoplay")}
        className={`
          ${cormorant.className}
          button
          group relative mt-10 rounded-full
          inline-flex items-center justify-center
          overflow-hidden
          border px-10 py-5
          text-base font-bold tracking-[3px]
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
          Watch Video
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </button>

      {/* MUSIC INDICATOR (DI KANAN BAWAH) */}
      <div className={`${styles.musicButton} ${styles.playing}`} aria-label="Music playing">
        ♫
      </div>
    </main>
  );
}