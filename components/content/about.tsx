import Image from 'next/image';

export default function About() {
    const focusAreas = ['Full Stack', 'Alto Desempenho', 'Segurança Cibernética'];

    return (
        <section
            id="about"
            className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 max-md:px-4 md:h-screen"
        >
            <div className="relative w-75 md:w-100 h-75 md:h-120 shrink-0">
                {/* Anel com o mesmo par de cores do glow de fundo */}
                <div className="absolute -inset-1 rounded-full md:rounded-lg bg-gradient-to-br from-cyan-500/40 via-transparent to-emerald-500/40 blur-sm" />

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
                <div className="hidden md:block absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-emerald-400/60 rounded-tl-md" />
                <div className="hidden md:block absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-emerald-400/60 rounded-br-md" />
            </div>

            <div className="text-white max-w-lg">
                <p className="font-mono text-xs uppercase tracking-widest text-emerald-400/80">
                    $ whoami
                </p>
                <h1 className="mt-2 text-2xl md:text-3xl font-semibold text-white">
                    Sobre Mim
                </h1>
                <div className="w-24 h-0.5 rounded-full mt-4 bg-gradient-to-r from-cyan-500 to-emerald-500" />

                <p className="mt-8 text-sm md:text-base text-white/80 leading-relaxed">
                    Sou um desenvolvedor de softwere com mais de 2 anos de experiência
                    criando soluções digitais inovadoras para empresas de diversos segmentos.
                </p>
                <p className="mt-4 text-sm md:text-base text-white/80 leading-relaxed">
                    Tenho habilidades fortes em criar aplicações web responsivas e de alto
                    desempenho, utilizando as mais recentes tecnologias e frameworks, e estou
                    sempre em busca de novos desafios para aprimorar minhas habilidades.

                    Tenho um forte conhecimento em segurança cibernética e melhores práticas de
                    desenvolvimento, pentests.
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                    {focusAreas.map((area) => (
                        <li
                            key={area}
                            className="text-xs font-mono px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/5 text-emerald-300"
                        >
                            {area}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}