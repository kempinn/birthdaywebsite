
import type { CSSProperties } from "react";

const particleSymbols = ["✦", "✧", "♡", "✿", "·", "✧"];

export const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    symbol: particleSymbols[i % particleSymbols.length],

    style: {
        "--left": `${(i * 37 + 11) % 100}%`,
        "--size": `${8 + ((i * 13) % 12)}px`,
        "--duration": `${7 + ((i * 7) % 10)}s`,
        "--delay": `${-((i * 3) % 15)}s`,
        "--drift": `${((i * 17) % 120) - 60}px`,
        "--opacity": `${0.4 + ((i * 13) % 6) / 10}`,
    } as CSSProperties,
}));