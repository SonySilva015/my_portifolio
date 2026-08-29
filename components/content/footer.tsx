// components/content/footer.tsx
'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const socialLinks = [
        { icon: Github, href: 'https://github.com/SonySilva015', label: 'GitHub' },
        { icon: Linkedin, href: 'https://www.linkedin.com/in/sony-cassungulo-ab1701281/', label: 'LinkedIn' },
        { icon: Mail, href: 'mailto:scassungulo@gmail.com', label: 'Email' },
    ]

    const quickLinks = [
        { name: 'Início', href: '/' },
        { name: 'Sobre', href: '#about' },
        { name: 'Habilidades', href: '#skills' },
        { name: 'Projetos', href: '#projects' },
        { name: 'Contato', href: '#contact' },
    ]

    return (
        <footer className="relative mt-20 bg-linear-to-t from-black/80 via-[#160014]/80 to-transparent border-t border-pink-500/20">
            {/* Efeito de brilho no topo */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-pink-500/50 to-transparent" />

            <div className="container mx-auto px-4 py-12">
                {/* Links Rápidos - Mobile */}
                <div className="lg:hidden mb-8">
                    <h3 className="text-center text-white/80 text-sm uppercase tracking-wider mb-4">Links Rápidos</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {quickLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-white/60 hover:text-pink-400 transition-colors text-sm"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2  items-center">
                    {/* Logo/Info - Esquerda */}
                    <div className="lg:col-span-4 text-center lg:text-left">
                        <h2 className="text-2xl font-bold bg-linear-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
                            Sony Cassungulo
                        </h2>
                        <p className="text-white/60 text-sm max-w-md mx-auto lg:mx-0">
                            Transformando ideias em experiências digitais incríveis através de código criativo e design inovador.
                        </p>

                        {/* Contato Info */}

                    </div>



                    {/* Redes Sociais - Direita */}
                    <div className="lg:col-span-4">
                        <div className="flex justify-center lg:justify-end gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative"
                                    aria-label={social.label}
                                >
                                    <div className="absolute inset-0 bg-pink-500 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
                                    <div className="relative p-3 bg-white/5 rounded-full border border-white/10 hover:border-pink-500/50 transition-all hover:scale-110 hover:bg-pink-500/10">
                                        <social.icon size={20} className="text-white/80 group-hover:text-pink-400 transition-colors" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divisor */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>

                </div>

                {/* Copyright */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-white/40 text-sm">
                    <div className="flex items-center gap-1 mt-2">
                        <span>© {currentYear} Sony Cassungulo.</span>
                        <span className="hidden md:inline">Todos os direitos reservados.</span>
                    </div>



                </div>
            </div>
        </footer>
    )
}