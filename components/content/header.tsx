'use client';
import Link from "next/link";
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, Download } from 'lucide-react';

export default function Hero() {
    return (
        <>
            <style>
                {`
                @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
                .hero-poppins, .hero-poppins * {
                    font-family: "Poppins", sans-serif;
                }
                .name-gradient {
                    background-image: linear-gradient(
                        90deg,
                        #22d3ee, /* cyan-400 */
                        #34d399, /* emerald-400 */
                        #0891b2, /* cyan-600 */
                        #22d3ee
                    );
                    background-size: 300% auto;
                    animation: name-gradient-shift 6s ease-in-out infinite;
                }
                @keyframes name-gradient-shift {
                    0%   { background-position: 0% 50%; }
                    50%  { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .name-gradient { animation: none; }
                }
            `}
            </style>

            <section className="hero-poppins bg-no-repeat bg-bottom bg-size-[100%_auto] px-4 pt-5 md:pb-32">

                <div className="flex items-center justify-center gap-2 mt-34 font-mono text-sm text-emerald-400/80">

                    <span className="inline-block w-2 h-4 bg-emerald-400/70 animate-pulse" />
                </div>

                <h1 className="text-4xl md:text-[58px]/19 text-center max-w-4xl mx-auto mt-6 text-white leading-tight font-medium">
                    <span className="name-gradient bg-clip-text text-transparent">
                        Sony Cassungulo
                    </span>
                </h1>

                <div className="flex items-center justify-center gap-2 max-w-2xl mx-auto mt-6 text-sm md:text-base text-slate-400 font-mono h-6">
                    <span className="text-slate-600">$</span>
                    <TypeAnimation
                        sequence={[
                            'programador - full stack',
                            2000,
                            'Cyber Security',
                            2000,
                            'Linux',
                            2000,
                            'freelancer',
                            2000,
                        ]}
                        wrapper="span"
                        speed={40}
                        deletionSpeed={60}
                        repeat={Infinity}
                        cursor={true}
                        className="text-slate-300"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-5 mt-14 justify-center items-center">
                    <Link
                        href="#projectos"
                        className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 px-9 py-4 rounded-full transition-all duration-300 transform hover:scale-[1.03] hover:shadow-[0_0_35px_-8px_rgba(34,211,238,0.6)] font-semibold tracking-wide flex items-center gap-2 group w-full sm:w-64 justify-center cursor-pointer text-lg"
                    >
                        <span>Ver Projetos</span>
                        <ArrowRight
                            size={20}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </Link>

                    <Link
                        href="/midia/cvgreen - PT.pdf"
                        target="_blank"
                        className="bg-white/[0.03] hover:bg-emerald-500/5 border border-white/10 hover:border-emerald-400/40 text-white px-9 py-4 rounded-full transition-all duration-300 backdrop-blur-md font-semibold tracking-wide flex items-center gap-2 group w-full sm:w-64 justify-center cursor-pointer text-lg"
                    >
                        <Download
                            size={20}
                            className="transition-transform duration-300 group-hover:translate-y-0.5"
                        />
                        <span>Baixar CV</span>
                    </Link>
                </div>

            </section>
        </>
    )
}