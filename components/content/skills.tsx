'use client'

import { motion, type Variants } from 'framer-motion'
import { Layout, Server, Smartphone, Cloud, Shield } from 'lucide-react'

const skills = [
    {
        title: 'Cyber Security',
        description: 'Segurança ofensiva (pentest) e boas práticas de proteção de aplicações.',
        icon: Shield,
        technologies: ['Pentest', 'Linux', 'OWASP', 'Auth', 'Criptografia'],
    },
    {
        title: 'Frontend',
        description: 'Interfaces modernas, responsivas e de alta performance.',
        icon: Layout,
        technologies: ['React', 'Next.js', 'TailwindCSS', 'TypeScript'],
    },
    {
        title: 'Backend',
        description: 'APIs robustas, escaláveis e arquitetura limpa.',
        icon: Server,
        technologies: ['Node.js', 'Python', 'PostgreSQL', 'Drizzle'],
    },
    {
        title: 'Mobile',
        description: 'Apps híbridos com foco em experiência do usuário.',
        icon: Smartphone,
        technologies: ['React Native', 'Expo', 'Mobile First'],
    },
    {
        title: 'DevOps & Cloud',
        description: 'Infraestrutura moderna e automação CI/CD.',
        icon: Cloud,
        technologies: ['Docker', 'AWS', 'GitHub Actions'],
    },
]

const containerStagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
}

const itemFadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Skills() {
    return (
        <section className="px-6 py-20">
            <div className="max-w-6xl mx-auto">
                {/* Cabeçalho */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-4 mb-16"
                >
                    <h2 className="text-xl font-bold text-white tracking-tight uppercase">
                        Habilidades Técnicas
                    </h2>
                    <div className="h-px flex-1 bg-linear-to-r from-cyan-500/50 to-transparent" />
                </motion.div>

                {/* Grid de Skills */}
                <motion.div
                    variants={containerStagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {skills.map((skill) => {
                        const Icon = skill.icon
                        return (
                            <motion.div
                                key={skill.title}
                                variants={itemFadeUp}
                                whileHover={{ y: -4 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                                className="group p-8 rounded-3xl bg-slate-900 border border-white/5 hover:border-cyan-500/40 hover:bg-cyan-950/10 hover:shadow-[0_0_30px_-10px_rgba(34,211,238,0.3)] transition-colors duration-300"
                            >
                                <div className="flex items-center gap-5 mb-6">
                                    <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-transform duration-300 group-hover:scale-110">
                                        <Icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                                        {skill.title}
                                    </h3>
                                </div>

                                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                    {skill.description}
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    {skill.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-[11px] font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 group-hover:border-cyan-500/20 group-hover:text-cyan-300 transition-all duration-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}