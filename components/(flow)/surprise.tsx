"use client";

import styles from "@/app/surprise/surprise.module.css";
import { particles } from "../../app/particle";
import { cormorant, bodoni } from "@/app/fonts";
import { useRouter } from "next/navigation";
import { useEffect } from "react"; // useRef dihapus karena sudah tidak dipakai
import Image from "next/image";

export default function SurprisePage() {
    const router = useRouter();
    
    // Batasi jumlah partikel agar animasi lebih ringan
    const visibleParticles = particles.slice(0, 20);
    
    // Hanya 10 hearts dengan ukuran lebih kecil
    const hearts = [
        { left: "5%", top: "12%", size: 75 },
        { left: "24%", top: "25%", size: 45 },
        { left: "80%", top: "12%", size: 85 },
        { left: "91%", top: "42%", size: 55 },
        { left: "10%", top: "65%", size: 70 },
        { left: "75%", top: "72%", size: 80 },
        { left: "40%", top: "85%", size: 45 },
        { left: "55%", top: "8%", size: 40 },
        { left: "35%", top: "55%", size: 60 },
        { left: "95%", top: "90%", size: 50 },
    ];

    return (
        <main
            className={`
                ${styles.background}
                relative isolate
                h-[100vh] h-[100dvh]
                w-full
                overflow-hidden
                text-center text-[#fffaf5]
            `}
        >
            {/* BACKGROUND HEARTS */}
            <div className={styles.hearts} aria-hidden="true">
                {hearts.map((heart, index) => (
                    <span
                        key={index}
                        className={styles.heart}
                        style={{
                            left: heart.left,
                            top: heart.top,
                            fontSize: `${heart.size}px`,
                            animationDelay: `${-(index * 2.7) % 18}s`,
                            animationDuration: `${12 + (index % 4) * 2}s`,
                        }}
                    >
                        ♥
                    </span>
                ))}
            </div>

            {/* FALLING PARTICLES */}
            <div
                className={styles.particles}
                aria-hidden="true"
            >
                {visibleParticles.map((particle) => (
                    <span
                        key={particle.id}
                        className={styles.particle}
                        style={particle.style}
                    >
                        {particle.symbol}
                    </span>
                ))}
            </div>

            {/* MAIN CONTENT */}
            <section className={styles.content}>
                {/* SMALL HEADER */}
                <div className="mb-3 flex shrink-0 items-center justify-center gap-2 sm:mb-4">
                    <span className="text-[10px] text-pink-300">
                        ✦
                    </span>
                    <h2
                        className={`
                            ${cormorant.className}
                            text-[9px] sm:text-[10px]
                            font-semibold
                            tracking-[3px] sm:tracking-[4px]
                            uppercase text-pink-200
                        `}
                    >
                        A Love Letter for You
                    </h2>
                    <span className="text-[10px] text-pink-300">
                        ✦
                    </span>
                </div>

                {/* TITLE */}
                <h1
                    className={`
                        ${bodoni.className}
                        ${styles.shimmerText}
                        shrink-0
                        text-[clamp(2.5rem,7vw,5.5rem)]
                        font-bold
                        leading-[0.95]
                        tracking-tight
                    `}
                >
                    <span className="block">
                        Your
                    </span>
                    <span className="block">
                        Special Day
                    </span>
                </h1>

                {/* SUBTITLE */}
                <p
                    className={`
                        ${cormorant.className}
                        mt-3 shrink-0
                        text-sm sm:text-base
                        font-medium italic
                        text-pink-100
                    `}
                >
                    For Special Girl, My Unconditional Love
                </p>

                {/* DECORATIVE LINE */}
                <div
                    className="
                        mt-3 h-px w-12 shrink-0
                        bg-gradient-to-r
                        from-transparent
                        via-pink-200/70
                        to-transparent
                    "
                />

                {/* CENTER PHOTO GALLERY */}
                <div
                    className="
                        relative mt-5 sm:mt-6
                        flex w-full shrink-0
                        items-center justify-center
                        gap-5 sm:gap-7
                    "
                >
                    {/* PHOTO 1 - Menggunakan next/image untuk optimasi */}
                     <div
                        className={`${styles.polaroid} ${styles.polaroidLeft}`}
                    >
                            <div className="relative w-full h-[140px] sm:h-[160px]">
                                <Image
                                    src="/image/surprisePhoto1.jpeg"
                                    alt="A purest beauty form"
                                    fill
                                    sizes="(max-width: 768px) 150px, 200px"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <p className={cormorant.className}>
                                You're effortlessly stunning
                            </p>
                    </div>

                    
                    {/* PHOTO 2 - Tinggi gambar diperbesar agar memenuhi frame bawah */}
                    <div className={`${styles.polaroid} ${styles.polaroidRight}`}>
                        <div className="relative w-full h-[180px] sm:h-[205px]">
                            <Image
                                src="/image/surprisePhoto2.jpeg"
                                alt="A beautiful memory"
                                fill
                                sizes="(max-width: 768px) 150px, 200px"
                                className="object-cover"
                            />
                        </div>
                        <p className={cormorant.className}>
                            This girl must be a soft spot
                        </p>
                    </div>
                </div>

                {/* LETTER BUTTON (Dengan jeda waktu transisi agar mulus) */}
                <button
                    type="button"
                    onClick={() => {
                        setTimeout(() => {
                            router.push("/letter");
                        }, 500); // Jeda 0.5 detik agar animasi tombol sempat tereksekusi
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
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                ✦
                            </span>
                            Read My Letter
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                ✦
                            </span>
                        </span>
                </button>
            </section>

            {/* MUSIC INDICATOR (Hiasan visual saja) */}
            <div
                className={`${styles.musicButton} ${styles.playing}`}
                aria-label="Music playing"
            >
                ♫
            </div>
        </main>
    );
}