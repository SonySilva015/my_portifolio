'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function About() {
    const focusAreas = ['Full Stack', 'Alto Desempenho', 'Segurança Cibernética'];

    return (
        <section
            id="about"
            className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 max-md:px-4 md:h-screen"
        >
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-75 md:w-100 h-75 md:h-120 shrink-0"
            >
                {/* Anel com o mesmo par de cores do glow de fundo */}
                <div className="absolute -inset-1 rounded-full md:rounded-lg bg-gradient-to-br from-cyan-500/30 via-transparent to-emerald-500/30 blur-sm" />

                <div className="relative w-full h-full rounded-full md:rounded-lg overflow-hidden border border-white/10">
                    <Image
                        className="object-cover"
                        src="/me.jpeg"
                        fill
                        sizes="(max-width: 768px) 300px, 400px"
                        priority
                        alt="Sony"
                    />
                </div>

                {/* Cantos estilo HUD — só no formato desktop (retangular) */}
                <div className="hidden md:block absolute -top-2 -left-2 w-6 h-6 border-t border-l border-emerald-400/50 rounded-tl-md" />
                <div className="hidden md:block absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-emerald-400/50 rounded-br-md" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="text-white max-w-lg"
            >
                <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/80">
                    $ whoami
                </p>
                <h1 className="mt-2 text-2xl md:text-3xl font-medium text-white tracking-tight">
                    Sobre Mim
                </h1>
                <div className="w-24 h-px mt-4 bg-gradient-to-r from-cyan-500/70 to-emerald-500/70" />

                <p className="mt-8 text-sm md:text-base text-white/70 leading-relaxed">
                    Sou um desenvolvedor de software com mais de 2 anos de experiência
                    criando soluções digitais inovadoras para empresas de diversos segmentos.
                </p>
                <p className="mt-4 text-sm md:text-base text-white/70 leading-relaxed">
                    Tenho habilidades fortes em criar aplicações web responsivas e de alto
                    desempenho, utilizando as mais recentes tecnologias e frameworks, e estou
                    sempre em busca de novos desafios para aprimorar minhas habilidades.
                    Tenho um forte conhecimento em segurança cibernética e melhores práticas de
                    desenvolvimento e pentests.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs text-slate-400">
                    {focusAreas.map((area, i) => (
                        <span key={area} className="flex items-center gap-3">
                            <span>{area}</span>
                            {i < focusAreas.length - 1 && (
                                <span className="w-1 h-1 rounded-full bg-white/20" />
                            )}
                        </span>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}