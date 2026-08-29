"use client";

import { motion } from "framer-motion";
import {
    Mail,
    MessageSquare,
    Github,
    Linkedin,
    Send,
    MapPin
} from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen text-slate-200 py-24 px-6">
            <div className="max-w-6xl mx-auto">

                {/* Header da Página */}
                <div className="mb-16 text-center lg:text-left">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-4"
                    >
                        Vamos conversar<span className="text-purple-500">.</span>
                    </motion.h1>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Lado Esquerdo: Informações de Contato */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-5 space-y-8"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">

                            {/* Card Email */}
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors group">
                                <Mail className="text-purple-500 mb-4 group-hover:scale-110 transition-transform" size={28} />
                                <h3 className="text-white font-medium mb-1">Email</h3>
                                <p className="text-slate-400 text-sm">scassungulo@gmail.com</p>
                            </div>

                            {/* Card Localização */}
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors group">
                                <MapPin className="text-purple-500 mb-4 group-hover:scale-110 transition-transform" size={28} />
                                <h3 className="text-white font-medium mb-1">Localização</h3>
                                <p className="text-slate-400 text-sm">Moxico, Angola</p>
                            </div>

                        </div>

                        {/* Redes Sociais */}
                        <div className="pt-8 border-t border-white/10">
                            <h3 className="text-white font-medium mb-6">Conecte-se comigo</h3>
                            <div className="flex gap-4">
                                {[
                                    { icon: Github, href: "https://github.com/SonySilva015", label: "GitHub" },
                                    { icon: Linkedin, href: "https://www.linkedin.com/in/sony-cassungulo-ab1701281/", label: "LinkedIn" },
                                    { icon: MessageSquare, href: "https://wa.me/926376713", label: "WhatsApp" }
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-purple-500 hover:border-purple-500/50 transition-all"
                                        aria-label={social.label}
                                    >
                                        <social.icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Lado Direito: Formulário com FormSubmit */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-7"
                    >
                        <form
                            action="https://formsubmit.co/scassungulo@gmail.com"
                            method="POST"
                            className="space-y-6 bg-white/2 border border-white/5 p-8 rounded-3xl shadow-2xl"
                        >
                            {/* Configurações do FormSubmit */}
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_template" value="table" />
                            <input type="text" name="_honey" style={{ display: 'none' }} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono uppercase tracking-widest text-slate-500 ml-1">Nome</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Seu nome"
                                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-mono uppercase tracking-widest text-slate-500 ml-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="seu@email.com"
                                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-slate-500 ml-1">Assunto</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    placeholder="No que posso ajudar?"
                                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-mono uppercase tracking-widest text-slate-500 ml-1">Mensagem</label>
                                <textarea
                                    rows={5}
                                    name="message"
                                    required
                                    placeholder="Sua mensagem aqui..."
                                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full md:w-auto px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-purple-900/20 cursor-pointer"
                            >
                                Enviar Mensagem
                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </main>
    );
}