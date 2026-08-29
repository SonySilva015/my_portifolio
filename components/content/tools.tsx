'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'

const tools = [
    { name: 'React', icon: 'react', level: 85 },
    { name: 'Next.js', icon: 'nextjs', level: 80 },
    { name: 'TypeScript', icon: 'typescript', level: 75 },
    { name: 'JavaScript', icon: 'javascript', level: 85 },
    { name: 'Tailwind', icon: 'tailwindcss', level: 80 },
    { name: 'Node.js', icon: 'nodejs', level: 70 },
    { name: 'Python', icon: 'python', level: 87 },
    { name: 'Java', icon: 'java', level: 60 },
    { name: 'PostgreSQL', icon: 'postgresql', level: 90 },
    { name: 'MySQL', icon: 'mysql', level: 60 },
    { name: 'Docker', icon: 'docker', level: 85 },
    { name: 'Git', icon: 'git', level: 80 },
]

const containerStagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05 } },
}

const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

export default function ToolsSection() {
    return (
        <section className="px-6">
            <div className="max-w-5xl mx-auto">
                {/* Título discreto e profissional */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-4 mb-8"
                >
                    <h2 className="text-xl font-bold text-white tracking-tight uppercase">
                        Tech Stack
                    </h2>
                    <div className="h-px flex-1 bg-linear-to-r from-cyan-500/50 to-transparent" />
                </motion.div>

                {/* Grid com nível de conhecimento */}
                <motion.div
                    variants={containerStagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
                >
                    {tools.map((tool) => (
                        <motion.div
                            key={tool.name}
                            variants={itemFadeUp}
                            className="group bg-white/3 border border-white/10 rounded-xl px-4 py-3 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-colors duration-300"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="relative w-5 h-5 shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300">
                                    <Image
                                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tool.icon}/${tool.icon}-original.svg`}
                                        alt={tool.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-sm font-medium text-slate-300 group-hover:text-cyan-100 transition-colors duration-300 truncate">
                                    {tool.name}
                                </span>
                            </div>

                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] font-mono text-slate-600">
                                    Nível
                                </span>
                                <span className="text-[10px] font-mono text-cyan-400">
                                    {tool.level}%
                                </span>
                            </div>

                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${tool.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
                                    className="h-full rounded-full bg-linear-to-r from-cyan-500 to-emerald-400"
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}