
"use client";
import styles from "../app/happybirthday.module.css";
import { particles } from "../app/particle";
import { cormorant, bodoni } from "@/app/fonts";
import Countdown from "./countdown";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export default function HappyBirthday() {
    const [isFinished, setIsFinished] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const router = useRouter();
    const handleFinished = useCallback((): void => {
        setIsFinished(true);
    }, []);

    const handleSecondsChange = useCallback(
        (seconds: number): void => {
            setSecondsLeft(seconds);
        },
        []
    );

    return (
        <main className={`${styles.background} min-h-screen flex flex-col items-center pt-15`}>
        
        <div className={styles.lightBlobs}>
            <div className={styles.lightBlobs}>
            <span className={`${styles.blob} ${styles.blob1}`} />
            <span className={`${styles.blob} ${styles.blob2}`} />
            <span className={`${styles.blob} ${styles.blob3}`} />
            <span className={`${styles.blob} ${styles.blob4}`} />
            <span className={`${styles.blob} ${styles.blob5}`} />
            <span className={`${styles.blob} ${styles.blob6}`} />
            <span className={`${styles.blob} ${styles.blob7}`} />
            <span className={`${styles.blob} ${styles.blob8}`} />
            <span className={`${styles.blob} ${styles.blob9}`} />
            <span className={`${styles.blob} ${styles.blob10}`} />
            <span className={`${styles.blob} ${styles.blob11}`} />
            <span className={`${styles.blob} ${styles.blob12}`} />
        </div>
        </div>

        

        {/* FALLING PARTICLES */}
        <div className={styles.particles}>
            {particles.map((particle) => (
                <span
                    key={particle.id}
                    className={styles.particle}
                    style={particle.style}
                >
                    {particle.symbol}
                </span>
            ))}
        </div>


            {/* HEADER */}
            <div className="flex items-center gap-4 py-8">
                <span className="block text-pink-400 text-xl">
                    •
                </span>

                <h1
                    className={`${cormorant.className} text-md font-bold text-pink-200 tracking-widest`}
                >
                    COUNTING DOWN TO YOUR BIRTHDAY
                </h1>

                <span className="block text-pink-400 text-xl">
                    •
                </span>
            </div>

            <h1
                className={`${bodoni.className} ${styles.shimmerText} text-6xl font-bold mt-4 items-center text-center italic tracking-widest`}
            >
                Your Special Day is
            </h1>

            <h1
                className={`${bodoni.className} ${styles.shimmerText} text-4xl font-bold mt-4 items-center text-center italic tracking-widest`}
            >
                Coming!
            </h1>

            <h1
                className={`${cormorant.className} text-md text-pink-200 mt-6 font-bold items-center text-center italic`}
            >
                Everybody's been waiting for this big day!
            </h1>

            <Countdown
                onFinished={handleFinished}
                onSecondsChange={handleSecondsChange}
            />

            <h1
                className={`${cormorant.className} text-sm mt-4 text-pink-200 text-center font-bold italic tracking-wide`}
                style={{ fontWeight: 700 }}
            >
                {isFinished
                    ? "This is your Special day. Enjoy Honeyy"
                    : `Coming in ${secondsLeft.toLocaleString()} seconds...`}
            </h1>

            {/* BIRTHDAY BUTTON */}
            <button
                type="button"
                disabled={!isFinished}
                onClick={() => {
                    router.push("/gift");
                }}
                className={`
                    ${cormorant.className}
                    button
                    group relative mt-3 rounded-full
                    overflow-hidden
                    border px-8 py-3
                    text-sm font-bold tracking-[3px]
                    uppercase
                    transition-all duration-500 ease-out
                    ${
                        isFinished
                            ? `
                                cursor-pointer
                                border-pink-300/60
                                bg-white/5
                                text-pink-100
                                hover:border-pink-300
                                hover:shadow-[0_0_25px_rgba(244,114,182,0.6)]
                                hover:scale-105
                                active:scale-95
                            `
                            : `
                                cursor-not-allowed
                                border-white/10
                                bg-white/5
                                text-white/30
                                opacity-50
                            `
                    }
                `}
            >
                    <span className="buttonFill" />
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {isFinished
                                ? "Open Your Gift"
                                : "Wait for the Surprise"}

                            <span
                                className={`
                                    transition-transform duration-300
                                    ${isFinished ? "group-hover:translate-x-1" : ""}
                                `}
                            >
                                ✦
                        </span>
                    </span>
            </button>

        </main>
    );
}