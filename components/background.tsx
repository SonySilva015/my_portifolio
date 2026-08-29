'use client';

import React, { useEffect, useRef } from 'react';

type Props = {
    children?: React.ReactNode;
    baseColor?: string;
    activeColor?: string;
    size?: number;
    blur?: number;
    /** Ativa grid + scanlines + scan sweep + matrix rain de fundo. Default: true */
    showTexture?: boolean;
};

const MATRIX_CHARS =
    'アイウエオカキクケコサシスセソタチツテト0123456789';

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

    // --- Glow que segue o mouse ---
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

    // --- Matrix rain (canvas, contido nas bordas via máscara) ---
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!showTexture) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const fontSize = 16;
        let columns = 0;
        let drops: number[] = [];
        let rainRaf: number | null = null;
        let lastFrame = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            columns = Math.floor(canvas.width / fontSize);
            drops = new Array(columns).fill(0).map(() => Math.random() * -100);
        };

        const drawFrame = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
                const isHead = Math.random() > 0.95;
                ctx.fillStyle = isHead ? 'rgba(167, 243, 208, 0.9)' : 'rgba(16, 185, 129, 0.4)';
                ctx.fillText(char, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const loop = (timestamp: number) => {
            // Throttle a ~20fps — suficiente pro efeito, mais barato de CPU.
            if (timestamp - lastFrame > 50) {
                drawFrame();
                lastFrame = timestamp;
            }
            rainRaf = requestAnimationFrame(loop);
        };

        resize();
        window.addEventListener('resize', resize);

        if (prefersReducedMotion) {
            drawFrame(); // um frame estático só, sem loop
        } else {
            rainRaf = requestAnimationFrame(loop);
        }

        return () => {
            window.removeEventListener('resize', resize);
            if (rainRaf !== null) cancelAnimationFrame(rainRaf);
        };
    }, [showTexture]);

    return (
        <div className="relative min-h-screen bg-linear-to-b from-[#000000] via-[#050a08] to-[#000000] overflow-hidden">
            {showTexture && (
                <>
                    {/* Matrix rain — visível só nas bordas, invisível atrás do conteúdo central */}
                    <canvas
                        ref={canvasRef}
                        className="fixed inset-0 pointer-events-none z-0 opacity-70"
                        style={{
                            maskImage: 'radial-gradient(ellipse at center, transparent 35%, black 85%)',
                            WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 35%, black 85%)',
                        }}
                    />

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

                    {/* Scan sweep com glitch periódico */}
                    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden motion-reduce:hidden">
                        <div className="scan-sweep" />
                    </div>

                    {/* Readout de canto — HUD persistente */}
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
              animation: scan-sweep-move 9s linear infinite, scan-sweep-glitch 15s steps(1) infinite;
            }
            @keyframes scan-sweep-move {
              0%   { top: -120px; }
              100% { top: 100%; }
            }
            @keyframes scan-sweep-glitch {
              0%, 96%, 100% { transform: translateX(0); filter: none; }
              97% { transform: translateX(-6px); filter: hue-rotate(20deg); }
              98% { transform: translateX(4px); filter: none; }
            }
          `}</style>
                </>
            )}

            <div ref={backgroundRef} className="fixed inset-0 pointer-events-none z-0" />
            <div className="relative z-10">{children}</div>
        </div>
    );
}