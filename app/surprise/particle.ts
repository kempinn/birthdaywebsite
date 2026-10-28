import {useState} from "react";

export const particles = Array.from({ length: 80 }, (_, index) => {
    const left = Math.random() * 100;
    const size = 8 + Math.random() * 14;
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * -20;
    const drift = Math.random() * 100 - 50;
    const opacity = 0.3 + Math.random() * 0.6;

    const symbols = ["✦", "✧", "⋆", "·"];

    return {
        id: index,
        symbol: symbols[index % symbols.length],
        style: {
            "--left": `${left}%`,
            "--size": `${size}px`,
            "--duration": `${duration}s`,
            "--delay": `${delay}s`,
            "--drift": `${drift}px`,
            "--opacity": opacity,
        } as React.CSSProperties,
    };
});