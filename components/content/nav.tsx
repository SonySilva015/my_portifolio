'use client'
import { useState, useEffect } from "react"

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <nav className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 flex items-center w-full max-w-6xl justify-between text-slate-100 px-4 md:px-6 py-4 transition-all duration-500 ${scrolled ? 'glass-effect rounded-2xl mt-2 max-w-5xl' : ''
                }`}>
                <img className="hover-scale relative z-50 h-auto w-15" src="/logo.png" alt="Logo" />

                {/* Overlay escuro para o menu mobile */}
                {mobileOpen && (
                    <div
                        className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-slideDown"
                        onClick={() => setMobileOpen(false)}
                    />
                )}

                {/* Menu Mobile */}
                <div
                    id="menu"
                    className={`${mobileOpen ? 'max-md:top-20 max-md:opacity-100 max-md:visible' : 'max-md:-top-96 max-md:opacity-0 max-md:invisible'} 
                        max-md:fixed max-md:left-1/2 max-md:-translate-x-1/2 max-md:w-[90%] max-md:bg-black/90 max-md:backdrop-blur-xl 
                        max-md:rounded-2xl max-md:border max-md:border-white/10 max-md:p-6 max-md:transition-all max-md:duration-500 
                        max-md:z-50 flex-col md:flex-row flex items-center gap-2 text-sm`}
                >
                    <a className="nav-link px-4 py-2 text-slate-100 hover:text-slate-200 w-full md:w-auto text-center" href="#home" onClick={() => setMobileOpen(false)}>Home</a>
                    <a className="nav-link px-4 py-2 text-slate-100 hover:text-slate-200 w-full md:w-auto text-center" href="#sobre" onClick={() => setMobileOpen(false)}>Sobre</a>
                    <a className="nav-link px-4 py-2 text-slate-100 hover:text-slate-200 w-full md:w-auto text-center" href="#formacao" onClick={() => setMobileOpen(false)}>Formação</a>
                    <a className="nav-link px-4 py-2 text-slate-100 hover:text-slate-200 w-full md:w-auto text-center" href="#projectos" onClick={() => setMobileOpen(false)}>Projectos</a>
                    <a className="nav-link px-4 py-2 text-slate-100 hover:text-slate-200 w-full md:w-auto text-center" href="#contacto" onClick={() => setMobileOpen(false)}>Contacto</a>

                    {/* Botão de fechar apenas no mobile */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="md:hidden absolute -top-3 -right-3 bg-gray-800/90 hover:bg-gray-700 text-white p-2 rounded-full transition-all hover:rotate-90 border border-white/20"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>

                <button
                    onClick={() => setMobileOpen(true)}
                    className="md:hidden hover:scale-110 transition-transform relative z-50"
                >
                    <svg className="size-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div className="hidden md:block gradient-border shimmer">

                </div>
            </nav >
        </>
    )
}