'use client';

import React, { useEffect, useRef } from 'react';
import { Lock } from 'lucide-react';

type Props = {
    children?: React.ReactNode;
    baseColor?: string;
    activeColor?: string;
    size?: number;
    blur?: number;
    /** Ativa grid + scanlines + scan sweep + decoração pentest de fundo. Default: true */
    showTexture?: boolean;
};

const codeSnippets = [
    { text: 'import socket', top: '8%', left: '4%', rotate: -6 },
    { text: 'nmap -sV target', top: '22%', left: '88%', rotate: 4 },
    { text: 'def scan_ports():', top: '68%', left: '3%', rotate: 3 },
    { text: "sudo ./exploit.py", top: '85%', left: '80%', rotate: -4 },
    { text: '0x41414141', top: '40%', left: '92%', rotate: 6 },
    { text: 'SELECT * FROM users;--', top: '55%', left: '6%', rotate: -3 },
];

const locks = [
    { top: '14%', left: '90%', size: 18, rotate: -10 },
    { top: '78%', left: '6%', size: 22, rotate: 8 },
    { top: '48%', left: '2%', size: 14, rotate: -14 },
];

const stars = [
    { top: '6%', left: '30%', delay: '0s' },
    { top: '18%', left: '70%', delay: '1.2s' },
    { top: '35%', left: '10%', delay: '2.4s' },
    { top: '62%', left: '94%', delay: '0.6s' },
    { top: '90%', left: '40%', delay: '1.8s' },
    { top: '75%', left: '55%', delay: '3s' },
    { top: '10%', left: '95%', delay: '2.1s' },
];

export default function BackgroundGlow({
    children,
    baseColor = 'rgba(6, 182, 212, 0.22)',
    activeColor = 'rgba(16, 185, 129, 0.75)',
    size = 450,
    blur = 80,
    showTexture = true,
}: Props) {
    const backgroundRef = useRef<HTMLDivElement | null>(null);
    const requestRef = useRef<number | null>(null);

    const mousePosition = useRef({ x: 0, y: 0 });
    const glowPosition = useRef({ x: 0, y: 0 });
    const currentScale = useRef(1);
    const targetScale = useRef(1);

    const parseRGBA = (rgba: string): number[] => {
        const values = rgba.match(/\d+(\.\d+)?/g)?.map(Number);
        return values ?? [0, 0, 0, 0];
    };

    const baseRGBA = useRef<number[]>(parseRGBA(baseColor));
    const activeRGBA = useRef<number[]>(parseRGBA(activeColor));
    const currentRGBA = useRef<number[]>(parseRGBA(baseColor));

    useEffect(() => {
        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        let prefersReducedMotion = reducedMotionQuery.matches;

        const clickableSelector = 'a, button, [role="button"], input, select, textarea, label';

        const updateMousePosition = (e: MouseEvent) => {
            mousePosition.current = { x: e.clientX, y: e.clientY };
            const target = e.target as HTMLElement;
            const isClickable = target.closest(clickableSelector) !== null;
            targetScale.current = isClickable ? 0.35 : 1;

            if (prefersReducedMotion && backgroundRef.current) {
                const [r, g, b, a] = currentRGBA.current;
                backgroundRef.current.style.background = `
          radial-gradient(circle ${size}px at ${e.clientX}px ${e.clientY}px,
            rgba(${r}, ${g}, ${b}, ${a}), transparent ${blur}%)
        `;
            }
        };

        const animate = () => {
            const speed = 0.25;
            glowPosition.current.x += (mousePosition.current.x - glowPosition.current.x) * speed;
            glowPosition.current.y += (mousePosition.current.y - glowPosition.current.y) * speed;
            currentScale.current += (targetScale.current - currentScale.current) * speed;

            const colorFactor = (1 - currentScale.current) / (1 - 0.35);
            for (let i = 0; i < 4; i++) {
                const targetVal =
                    baseRGBA.current[i] + (activeRGBA.current[i] - baseRGBA.current[i]) * colorFactor;
                currentRGBA.current[i] += (targetVal - currentRGBA.current[i]) * speed;
            }

            if (backgroundRef.current) {
                const [r, g, b, a] = currentRGBA.current;
                const dynamicSize = size * currentScale.current;
                backgroundRef.current.style.background = `
          radial-gradient(circle ${dynamicSize.toFixed(0)}px at ${glowPosition.current.x.toFixed(0)}px ${glowPosition.current.y.toFixed(0)}px,
            rgba(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)}, ${a.toFixed(2)}), transparent ${blur}%)
        `;
            }
            requestRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', updateMousePosition);
        if (!prefersReducedMotion) requestRef.current = requestAnimationFrame(animate);

        const handleMotionChange = (e: MediaQueryListEvent) => {
            prefersReducedMotion = e.matches;
            if (prefersReducedMotion && requestRef.current !== null) {
                cancelAnimationFrame(requestRef.current);
                requestRef.current = null;
            } else if (!prefersReducedMotion && requestRef.current === null) {
                requestRef.current = requestAnimationFrame(animate);
            }
        };
        reducedMotionQuery.addEventListener('change', handleMotionChange);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            reducedMotionQuery.removeEventListener('change', handleMotionChange);
            if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
        };
    }, [size, blur]);

    return (
        <div className="relative min-h-screen bg-linear-to-b from-[#000000] via-[#050a08] to-[#000000] overflow-hidden">
            {showTexture && (
                <>
                    {/* Decoração pentest — cadeados, trechos de código, estrelas. Discreta e estática. */}
                    <div className="fixed inset-0 pointer-events-none z-0 select-none">
                        {codeSnippets.map((s, i) => (
                            <span
                                key={`code-${i}`}
                                className="absolute font-mono text-[11px] text-emerald-300/[0.08] whitespace-nowrap"
                                style={{ top: s.top, left: s.left, transform: `rotate(${s.rotate}deg)` }}
                            >
                                {s.text}
                            </span>
                        ))}

                        {locks.map((l, i) => (
                            <Lock
                                key={`lock-${i}`}
                                size={l.size}
                                className="absolute text-cyan-300/[0.09]"
                                style={{ top: l.top, left: l.left, transform: `rotate(${l.rotate}deg)` }}
                            />
                        ))}

                        {stars.map((s, i) => (
                            <span
                                key={`star-${i}`}
                                className="absolute w-1 h-1 rounded-full bg-white/20 motion-safe:animate-pulse"
                                style={{ top: s.top, left: s.left, animationDelay: s.delay, animationDuration: '4s' }}
                            />
                        ))}
                    </div>

                    {/* Grid fino */}
                    <div
                        className="fixed inset-0 pointer-events-none z-0"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px)
              `,
                            backgroundSize: '48px 48px',
                            maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)',
                            WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)',
                        }}
                    />

                    {/* Scanlines */}
                    <div
                        className="fixed inset-0 pointer-events-none z-0 opacity-40"
                        style={{
                            backgroundImage:
                                'repeating-linear-gradient(to bottom, rgba(255,255,255,0.025) 0px, transparent 1px, transparent 3px)',
                        }}
                    />

                    {/* Scan sweep */}
                    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden motion-reduce:hidden">
                        <div className="scan-sweep" />
                    </div>

                    {/* Readout de canto */}
                    <div className="fixed bottom-4 left-4 z-0 pointer-events-none font-mono text-[10px] text-emerald-400/40 flex items-center gap-2 select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70 animate-pulse" />
                        <span>root@sony — secure_connection</span>
                    </div>

                    <style>{`
            .scan-sweep {
              position: absolute;
              left: 0;
              right: 0;
              height: 120px;
              background: linear-gradient(to bottom, transparent, rgba(16, 185, 129, 0.05), transparent);
              animation: scan-sweep-move 9s linear infinite;
            }
            @keyframes scan-sweep-move {
              0%   { top: -120px; }
              100% { top: 100%; }
            }
          `}</style>
                </>
            )}

            <div ref={backgroundRef} className="fixed inset-0 pointer-events-none z-0" />
            <div className="relative z-10">{children}</div>
        </div>
    );
}