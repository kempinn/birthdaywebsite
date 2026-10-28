
"use client";

import { useState } from "react";
import type { CSSProperties } from "react";


import styles from "../app/gift/gift.module.css";
import { cormorant } from "@/app/fonts";
import { useRouter } from "next/navigation";

/* ========================================
   CONFETTI CONFIGURATION
======================================== */

const confettiColors = [
    "#f9a8d4",
    "#fce7f3",
    "#fbbf24",
    "#ffffff",
    "#e9d5ff",
    "#fda4af",
];

const confettiParticles = Array.from(
    { length: 50 },
    (_, i) => ({
        id: i,

        x: `${Math.cos(i * 2.4) * (100 + (i % 5) * 35)}px`,

        y: `${180 + (i % 6) * 65}px`,

        rotation: `${360 + i * 73}deg`,

        delay: `${(i % 10) * 35}ms`,

        color: confettiColors[i % confettiColors.length],
    })
);

/* ========================================
   SPARKLE CONFIGURATION
======================================== */

const sparkles = [
    { left: "15%", top: "35%", delay: "0s" },
    { left: "80%", top: "30%", delay: "0.4s" },
    { left: "25%", top: "65%", delay: "0.8s" },
    { left: "72%", top: "70%", delay: "0.2s" },
    { left: "50%", top: "25%", delay: "1s" },
    { left: "90%", top: "50%", delay: "0.6s" },
    { left: "10%", top: "55%", delay: "1.2s" },
    { left: "60%", top: "80%", delay: "0.3s" },
];

export default function GiftPage() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    /* ========================================
       OPEN GIFT
    ======================================== */

    const handleGiftClick = () => {
    // Jangan melakukan apa-apa kalau hadiah sudah dibuka
    if (isOpen) return;

    // Jalankan animasi buka hadiah
    setIsOpen(true);

    // Tunggu animasi selesai, lalu pindah ke SurprisePage
    setTimeout(() => {
        router.push("/surprise");
    }, 3000);
};

    return (
        <main className="relative flex min-h-screen min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#171522] text-white">

            {/* Background gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,#49314d_0%,#292333_50%,#171522_100%)]" />

            {/* Pink glow background */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/20 blur-[120px]" />

            {/* ========================================
                FLOATING SPARKLES
            ======================================== */}

            {isOpen && (
                <div className="pointer-events-none absolute inset-0 z-20">
                    {sparkles.map((sparkle, i) => (
                        <span
                            key={i}
                            className={`${styles.sparkle} ${styles.sparkleActive}`}
                            style={{
                                left: sparkle.left,
                                top: sparkle.top,
                                animationDelay: sparkle.delay,
                            }}
                        >
                            ✦
                        </span>
                    ))}
                </div>
            )}

            {/* ========================================
                CONFETTI BURST
            ======================================== */}

            {isOpen && (
                <div className={styles.confettiContainer}>
                    {confettiParticles.map((particle) => (
                        <span
                            key={particle.id}
                            className={styles.confettiPiece}
                            style={
                                {
                                    "--x": particle.x,
                                    "--y": particle.y,
                                    "--rotation": particle.rotation,
                                    "--delay": particle.delay,
                                    "--confetti-color": particle.color,
                                } as CSSProperties
                            }
                        />
                    ))}
                </div>
            )}

            {/* ========================================
                MAIN CONTENT
            ======================================== */}

            <section className="relative z-10 flex min-h-screen min-h-[100dvh] w-full max-w-xl flex-col items-center justify-center px-5 py-10">

                {/* Title */}

                <p
                    className={`${cormorant.className} flex items-center justify-center gap-2 text-center text-md font-bold tracking-[0.1em] text-pink-200`}
                >
                    <span className="text-pink-300">
                        ✦
                    </span>

                    SOMETHING AMAZING IS WAITING FOR YOU

                    <span className="text-pink-200">
                        ✦
                    </span>
                </p>

                {/* ========================================
                    GIFT CONTAINER
                ======================================== */}

                <div
                    role="button"
                    tabIndex={0}
                    aria-label={
                        isOpen
                            ? "Tutup hadiah"
                            : "Buka hadiah"
                    }
                    aria-expanded={isOpen}
                    onClick={handleGiftClick}
                    onKeyDown={(e) => {
                        if (
                            e.key === "Enter" ||
                            e.key === " "
                        ) {
                            e.preventDefault();
                            handleGiftClick();
                        }
                    }}
                    className="relative mt-10 flex h-[260px] w-[300px] cursor-pointer items-center justify-center outline-none"
                >

                    {/* Glow behind gift */}

                    <div
                        className={`pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400/25 blur-[70px] transition-all duration-700 ${
                            isOpen
                                ? "scale-150 bg-pink-400/40"
                                : ""
                        }`}
                    />

                    {/* Magical glow burst */}

                    <div
                        className={`${styles.giftGlow} ${
                            isOpen
                                ? styles.giftGlowActive
                                : ""
                        }`}
                    />

                    {/* ========================================
                        GIFT BOX
                    ======================================== */}

                    <div
                        className={`
                            ${styles.giftFloat}
                            relative z-10 h-[130px] w-[150px]
                            ${isOpen ? styles.giftOpened : ""}
                        `}
                    >

                        {/* Gift body */}

                        <div className="absolute bottom-0 left-0 h-[85px] w-[150px] overflow-hidden rounded-[3px] border border-pink-200/80 bg-pink-400/10 shadow-[0_0_15px_rgba(244,114,182,0.1)]">

                            {/* Vertical ribbon */}

                            <div className="absolute left-[60px] top-0 h-full w-[28px] bg-gradient-to-r from-pink-200 via-rose-50 to-pink-200" />

                            {/* Horizontal ribbon */}

                            <div className="absolute left-0 top-[35px] h-[12px] w-full bg-gradient-to-b from-rose-50 to-pink-200" />

                        </div>

                        {/* ========================================
                            GIFT LID
                        ======================================== */}

                        <div
                            className={`
                                ${styles.giftLid}
                                absolute -left-[5px] top-[25px] z-20
                                h-[22px] w-[160px]
                                rounded-[4px] border border-pink-200/80
                                bg-gradient-to-b from-[#e7a7ca] to-[#c985b1]
                                shadow-[0_0_12px_rgba(244,114,182,0.15)]
                            `}
                        >

                            {/* Ribbon on lid */}

                            <div className="absolute left-[65px] top-0 h-full w-[28px] bg-rose-50" />

                        </div>

                        {/* ========================================
                            GIFT BOW
                        ======================================== */}

                        <div
                            className={`
                                ${styles.giftBow}
                                absolute left-1/2 top-0 z-30
                                h-[40px] w-[80px]
                                -translate-x-1/2
                            `}
                        >

                            {/* Left loop */}

                            <div className="absolute left-0 top-0 h-[28px] w-[40px] rotate-[-25deg] rounded-[80%_80%_20%_80%] border border-pink-200 bg-rose-50 shadow-[0_0_10px_rgba(255,255,255,0.3)]" />

                            {/* Right loop */}

                            <div className="absolute right-0 top-0 h-[28px] w-[40px] scale-x-[-1] rotate-[-25deg] rounded-[80%_80%_20%_80%] border border-pink-200 bg-rose-50 shadow-[0_0_10px_rgba(255,255,255,0.3)]" />

                            {/* Bow center */}

                            <div className="absolute left-[34px] top-[10px] h-[13px] w-[13px] rounded-full border border-pink-200 bg-rose-50 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />

                        </div>

                    </div>

                    {/* ========================================
                        SHADOW UNDER GIFT
                    ======================================== */}

                    <div className="absolute bottom-[35px] left-1/2 h-[15px] w-[130px] -translate-x-1/2 rounded-full bg-black/35 blur-md" />

                </div>

                {/* ========================================
                    SURPRISE MESSAGE
                ======================================== */}

                <div
                    className={`
                        ${cormorant.className}
                        mt-6 flex min-h-[50px] flex-col items-center justify-center
                        text-center text-md font-bold italic tracking-[0.15em]
                        text-pink-200
                        ${
                            isOpen
                                ? styles.surpriseMessageActive
                                : ""
                        }
                        ${
                            isOpen
                                ? styles.surpriseMessage
                                : ""
                        }
                    `}
                >

                    {isOpen ? (
                        <>
                            {/* Decorative hearts */}

                            <p className="mb-2 text-2xl not-italic">
                                ✨ 💖 ✨
                            </p>

                            {/* Birthday greeting */}

                            <p className="text-xl">
                                Happy Birthday, My Love!
                            </p>

                            {/* Romantic message */}

                            <p className="mt-2 text-base font-normal tracking-wide">
                                You are my favorite person
                                and my sweetest surprise.
                            </p>

                            {/* Footer */}

                            <p className="mt-3 text-sm not-italic tracking-normal text-pink-300/80">
                                Made with all my love, just for you ♡
                            </p>
                        </>
                    ) : (
                        <p className="flex items-center justify-center gap-4">
                            <span>✨</span>

                            <span className="tracking-[0.12em]">
                                Click to open the gift
                            </span>

                            <span>✨</span>
                        </p>
                    )}

                </div>

            </section>
        </main>
    );
}