"use client";

import { motion, type Variants } from "framer-motion";
import {
    GraduationCap,
    Award,
    Calendar,
    Clock,
    BookOpen,
    ExternalLink,
    Layout,
    Layers,
    Server,
    Code2,
    CheckCircle2,
    Globe,
} from "lucide-react";

const certifications = [
    {
        title: "Responsive Web Design",
        description: "CSS moderno e layouts adaptáveis.",
        link: "https://freecodecamp.org/certification/SonyCassungulo/responsive-web-design",
        icon: Layout,
    },
    {
        title: "Front End Libraries",
        description: "React, Bootstrap e ecossistema front-end.",
        link: "https://www.freecodecamp.org/certification/SonyCassungulo/front-end-development-libraries",
        icon: Layers,
    },
    {
        title: "Back End & APIs",
        description: "Node.js, Express e arquitetura de APIs.",
        link: "https://freecodecamp.org/certification/SonyCassungulo/back-end-development-and-apis",
        icon: Server,
    },
    {
        title: "JS Data Structures",
        description: "Lógica avançada e algoritmos complexos.",
        link: "https://freecodecamp.org/certification/SonyCassungulo/javascript-algorithms-and-data-structures-v8",
        icon: Code2,
    },
];

const languages = [
    { name: "Português", level: "Nativo", fill: 5 },
    { name: "Inglês", level: "Intermediário", fill: 3 },
];

const containerStagger: Variants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.12 },
    },
};

const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AboutEducation() {
    return (
        <section className="px-6 text-slate-200" id="about">
            <div className="max-w-6xl mx-auto space-y-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Coluna da Esquerda (Educação + Idiomas) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="lg:col-span-5 space-y-12"
                    >
                        {/* Bloco de Educação */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                                    <GraduationCap size={28} />
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight">Educação</h2>
                            </div>

                            <motion.div
                                whileHover={{ y: -3 }}
                                transition={{ duration: 0.25 }}
                                className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.35)] transition-all backdrop-blur-sm"
                            >
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-white leading-tight">
                                            Licenciatura em Ciência da Computação
                                        </h3>
                                        <a
                                            href="https://www.ispmoxico.co.ao/"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1 text-cyan-400 hover:text-emerald-400 hover:underline mt-2 text-sm transition-colors"
                                        >
                                            ISP Moxico <ExternalLink size={14} />
                                        </a>
                                    </div>

                                    <div className="space-y-3 text-slate-400 text-sm">
                                        <div className="flex items-center gap-3">
                                            <Calendar size={16} className="text-cyan-400" />
                                            <span>2022 — 2027</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock size={16} className="text-cyan-400" />
                                            <span>Duração: 5 anos</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <BookOpen size={16} className="text-cyan-400" />
                                            <span>Foco em Engenharia de Software</span>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <div className="flex justify-between mb-2 text-xs font-mono uppercase tracking-widest text-slate-500">
                                            <span>Progresso do Curso</span>
                                            <span className="text-emerald-400">80%</span>
                                        </div>
                                        <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "80%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="h-full bg-linear-to-r from-cyan-500 to-emerald-400"
                                            />
                                            {/* Shimmer que percorre a barra uma vez, depois do preenchimento */}
                                            <motion.div
                                                initial={{ x: "-100%" }}
                                                whileInView={{ x: "400%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.2, delay: 1.4, ease: "easeInOut" }}
                                                className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Bloco de Idiomas */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                                    <Globe size={28} />
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight">Idiomas</h2>
                            </div>

                            <motion.div
                                whileHover={{ y: -3 }}
                                transition={{ duration: 0.25 }}
                                className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.35)] transition-all space-y-5 backdrop-blur-sm"
                            >
                                {languages.map((lang, i) => (
                                    <div
                                        key={lang.name}
                                        className={`space-y-2 ${i > 0 ? "pt-4 border-t border-white/5" : ""}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-white font-medium text-sm">{lang.name}</span>
                                            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                                                {lang.level}
                                            </span>
                                        </div>
                                        <div className="flex gap-1">
                                            {Array.from({ length: 5 }).map((_, dot) => (
                                                <motion.span
                                                    key={dot}
                                                    initial={{ scaleX: 0 }}
                                                    whileInView={{ scaleX: dot < lang.fill ? 1 : 0.15 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.3, delay: dot * 0.06 }}
                                                    className={`h-1 flex-1 rounded-full origin-left ${dot < lang.fill
                                                            ? "bg-gradient-to-r from-cyan-500 to-emerald-400"
                                                            : "bg-white/10"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Coluna de Certificações (Direita) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="lg:col-span-7 space-y-8"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                                    <Award size={28} />
                                </div>
                                <h2 className="text-3xl font-bold tracking-tight">Certificações</h2>
                            </div>
                            <span className="hidden sm:block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                                freeCodeCamp Verified
                            </span>
                        </div>

                        <motion.div
                            variants={containerStagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                            {certifications.map((cert) => {
                                const Icon = cert.icon;
                                return (
                                    <motion.a
                                        key={cert.title}
                                        variants={itemFadeUp}
                                        href={cert.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        whileHover={{ scale: 1.03, y: -4 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className="flex flex-col p-5 rounded-2xl bg-white/3 border border-white/5 hover:bg-white/[0.07] hover:border-cyan-400/40 hover:shadow-[0_0_30px_-8px_rgba(34,211,238,0.35)] transition-colors group backdrop-blur-sm"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <motion.div
                                                whileHover={{ rotate: 12 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                                className="p-2 bg-slate-900 rounded-lg text-cyan-400 group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-emerald-500 group-hover:text-slate-950 transition-colors"
                                            >
                                                <Icon size={20} />
                                            </motion.div>
                                            <CheckCircle2 size={16} className="text-cyan-400/50 group-hover:text-emerald-400 transition-colors" />
                                        </div>
                                        <h4 className="font-medium text-white text-sm mb-1 group-hover:text-cyan-400 transition-colors">
                                            {cert.title}
                                        </h4>
                                        <p className="text-slate-500 text-xs leading-relaxed">
                                            {cert.description}
                                        </p>
                                    </motion.a>
                                );
                            })}
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}