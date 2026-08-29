// app/projects/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
    Github,
    ExternalLink,
    Star,
    GitFork,
    Folder,
    AlertCircle,
    RefreshCw,
    Globe
} from 'lucide-react'

interface LanguageColors {
    [key: string]: string
}

interface Repo {
    id: number
    name: string
    description: string | null
    html_url: string
    homepage: string | null
    stargazers_count: number
    forks_count: number
    updated_at: string
    fork: boolean
    language: string | null
    languages_url: string
    owner: {
        login: string
    }
    topics?: string[]
}

interface Languages {
    [key: string]: number
}

interface RepoWithDetails extends Repo {
    languages?: Languages
    mainLanguage?: string | null
    previewExists?: boolean
    allTechnologies?: string[]
}

const languageColors: LanguageColors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'Python': '#3572A5',
    'Java': '#b07219',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'C++': '#f34b7d',
    'C#': '#178600',
    'Vue': '#41b883',
    'React': '#61dafb',
    'Angular': '#dd0031',
    'Next.js': '#000000',
    'Node.js': '#339933',
    'Shell': '#89e051',
    'Dockerfile': '#384d54',
    'Jupyter Notebook': '#DA5B0B',
    'SCSS': '#c6538c',
    'Sass': '#c6538c',
    'Less': '#1d365d',
    'JSON': '#292929',
    'Markdown': '#083fa1',
    'YAML': '#cb171e',
    'XML': '#0060ac',
    'SQL': '#e38c00',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Kotlin': '#A97BFF',
    'Swift': '#ffac45',
    'Objective-C': '#438eff',
    'Flutter': '#02569B',
    'Dart': '#00B4AB',
    'TailwindCSS': '#38B2AC',
    'Bootstrap': '#7952B3',
    'Express': '#000000',
    'MongoDB': '#47A248',
    'PostgreSQL': '#336791',
    'MySQL': '#4479A1',
    'Redis': '#DC382D',
    'GraphQL': '#E10098',
    'Apollo': '#311C87',
    'Prisma': '#2D3748',
    'Jest': '#C21325',
    'Cypress': '#17202C',
    'Figma': '#F24E1E',
    'Adobe XD': '#FF61F6'
}

const techStackImages: { [key: string]: string } = {
    // Frontend
    'React': 'https://raw.githubusercontent.com/github/explore/main/topics/react/react.png',
    'Vue': 'https://raw.githubusercontent.com/github/explore/main/topics/vue/vue.png',
    'Angular': 'https://raw.githubusercontent.com/github/explore/main/topics/angular/angular.png',
    'Next.js': 'https://raw.githubusercontent.com/github/explore/main/topics/nextjs/nextjs.png',
    'TypeScript': 'https://raw.githubusercontent.com/github/explore/main/topics/typescript/typescript.png',
    'JavaScript': 'https://raw.githubusercontent.com/github/explore/main/topics/javascript/javascript.png',
    'HTML': 'https://raw.githubusercontent.com/github/explore/main/topics/html/html.png',
    'CSS': 'https://raw.githubusercontent.com/github/explore/main/topics/css/css.png',
    'TailwindCSS': 'https://raw.githubusercontent.com/github/explore/main/topics/tailwind/tailwind.png',
    'Bootstrap': 'https://raw.githubusercontent.com/github/explore/main/topics/bootstrap/bootstrap.png',

    // Backend
    'Node.js': 'https://raw.githubusercontent.com/github/explore/main/topics/nodejs/nodejs.png',
    'Python': 'https://raw.githubusercontent.com/github/explore/main/topics/python/python.png',
    'Java': 'https://raw.githubusercontent.com/github/explore/main/topics/java/java.png',
    'PHP': 'https://raw.githubusercontent.com/github/explore/main/topics/php/php.png',
    'Ruby': 'https://raw.githubusercontent.com/github/explore/main/topics/ruby/ruby.png',
    'Go': 'https://raw.githubusercontent.com/github/explore/main/topics/go/go.png',
    'Rust': 'https://raw.githubusercontent.com/github/explore/main/topics/rust/rust.png',
    'Express': 'https://raw.githubusercontent.com/github/explore/main/topics/express/express.png',
    'Django': 'https://raw.githubusercontent.com/github/explore/main/topics/django/django.png',
    'Flask': 'https://raw.githubusercontent.com/github/explore/main/topics/flask/flask.png',

    // Database
    'MongoDB': 'https://raw.githubusercontent.com/github/explore/main/topics/mongodb/mongodb.png',
    'PostgreSQL': 'https://raw.githubusercontent.com/github/explore/main/topics/postgresql/postgresql.png',
    'MySQL': 'https://raw.githubusercontent.com/github/explore/main/topics/mysql/mysql.png',
    'Redis': 'https://raw.githubusercontent.com/github/explore/main/topics/redis/redis.png',
    'SQLite': 'https://raw.githubusercontent.com/github/explore/main/topics/sqlite/sqlite.png',

    // Mobile
    'Flutter': 'https://raw.githubusercontent.com/github/explore/main/topics/flutter/flutter.png',
    'Dart': 'https://raw.githubusercontent.com/github/explore/main/topics/dart/dart.png',
    'Kotlin': 'https://raw.githubusercontent.com/github/explore/main/topics/kotlin/kotlin.png',
    'Swift': 'https://raw.githubusercontent.com/github/explore/main/topics/swift/swift.png',
    'React Native': 'https://raw.githubusercontent.com/github/explore/main/topics/react-native/react-native.png',

    // DevOps & Tools
    'Docker': 'https://raw.githubusercontent.com/github/explore/main/topics/docker/docker.png',
    'Kubernetes': 'https://raw.githubusercontent.com/github/explore/main/topics/kubernetes/kubernetes.png',
    'Git': 'https://raw.githubusercontent.com/github/explore/main/topics/git/git.png',
    'GitHub': 'https://raw.githubusercontent.com/github/explore/main/topics/github/github.png',
    'AWS': 'https://raw.githubusercontent.com/github/explore/main/topics/aws/aws.png',
    'Azure': 'https://raw.githubusercontent.com/github/explore/main/topics/azure/azure.png',
    'Google Cloud': 'https://raw.githubusercontent.com/github/explore/main/topics/google-cloud/google-cloud.png',

    // Testing
    'Jest': 'https://raw.githubusercontent.com/github/explore/main/topics/jest/jest.png',
    'Cypress': 'https://raw.githubusercontent.com/github/explore/main/topics/cypress/cypress.png',

    // Design
    'Figma': 'https://raw.githubusercontent.com/github/explore/main/topics/figma/figma.png',

    'default': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop'
}

export default function Projects() {
    const [repos, setRepos] = useState<RepoWithDetails[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
    const [activeCard, setActiveCard] = useState<number | null>(null)

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out',
        })
    }, [])

    useEffect(() => {
        fetchRepos()
    }, [])

    const fetchRepos = async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await fetch('https://api.github.com/users/SonySilva015/repos')

            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`)
            }

            const data: Repo[] = await response.json()

            // Filtrar forks e ordenar por atualização
            const filtered = data
                .filter(repo => !repo.fork)
                .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())

            // Buscar linguagens e verificar preview para cada repo
            const reposWithDetails = await Promise.all(
                filtered.map(async (repo) => {
                    const languages = await fetchLanguages(repo.languages_url)
                    const mainLanguage = getMainLanguage(languages)
                    const previewExists = await checkPreviewImage(repo.owner.login, repo.name)

                    // Extrair tecnologias principais
                    const allTechnologies = extractTechnologies(repo, languages)

                    return {
                        ...repo,
                        languages,
                        mainLanguage,
                        previewExists,
                        allTechnologies
                    }
                })
            )

            setRepos(reposWithDetails)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar projetos')
            console.error('Erro:', err)
        } finally {
            setLoading(false)
        }
    }

    const fetchLanguages = async (url: string): Promise<Languages> => {
        try {
            const response = await fetch(url)
            if (!response.ok) return {}
            return await response.json()
        } catch {
            return {}
        }
    }

    const checkPreviewImage = async (owner: string, repo: string): Promise<boolean> => {
        const previewUrls = [
            `https://raw.githubusercontent.com/${owner}/${repo}/main/preview.png`,
            `https://raw.githubusercontent.com/${owner}/${repo}/main/preview.jpg`,
            `https://raw.githubusercontent.com/${owner}/${repo}/main/preview.jpeg`,
            `https://raw.githubusercontent.com/${owner}/${repo}/main/preview.webp`,
            `https://raw.githubusercontent.com/${owner}/${repo}/main/screenshot.png`,
            `https://raw.githubusercontent.com/${owner}/${repo}/main/screenshot.jpg`,
            `https://raw.githubusercontent.com/${owner}/${repo}/main/thumbnail.png`,
            `https://raw.githubusercontent.com/${owner}/${repo}/main/cover.png`,
            `https://raw.githubusercontent.com/${owner}/${repo}/main/banner.png`,
            `https://raw.githubusercontent.com/${owner}/${repo}/main/demo.png`,
            `https://raw.githubusercontent.com/${owner}/${repo}/main/og-image.png`,
        ]

        for (const url of previewUrls) {
            try {
                const response = await fetch(url, { method: 'HEAD' })
                if (response.ok) return true
            } catch {
                continue
            }
        }
        return false
    }

    const getMainLanguage = (languages: Languages): string | null => {
        const entries = Object.entries(languages)
        if (entries.length === 0) return null
        return entries.reduce((a, b) => a[1] > b[1] ? a : b)[0]
    }

    const extractTechnologies = (repo: Repo, languages: Languages | null): string[] => {
        const technologies: string[] = []

        // Adicionar linguagens do repositório
        if (languages && Object.keys(languages).length > 0) {
            technologies.push(...Object.keys(languages).slice(0, 3))
        } else if (repo.language) {
            technologies.push(repo.language)
        }

        // Detectar frameworks baseado no nome do repo e descrição
        const repoName = repo.name.toLowerCase()
        const repoDesc = (repo.description || '').toLowerCase()

        const frameworkPatterns = [
            { name: 'React', patterns: ['react', 'jsx'] },
            { name: 'Vue', patterns: ['vue', 'vuejs', 'vuetify'] },
            { name: 'Angular', patterns: ['angular', 'ng-'] },
            { name: 'Next.js', patterns: ['next', 'nextjs'] },
            { name: 'Node.js', patterns: ['node', 'nodejs', 'express'] },
            { name: 'Django', patterns: ['django'] },
            { name: 'Flask', patterns: ['flask'] },
            { name: 'Flutter', patterns: ['flutter'] },
            { name: 'TailwindCSS', patterns: ['tailwind'] },
            { name: 'Bootstrap', patterns: ['bootstrap'] },
            { name: 'Docker', patterns: ['docker'] },
            { name: 'GraphQL', patterns: ['graphql', 'apollo'] },
            { name: 'Prisma', patterns: ['prisma'] },
            { name: 'Jest', patterns: ['jest', 'test'] },
        ]

        frameworkPatterns.forEach(({ name, patterns }) => {
            if (patterns.some(pattern => repoName.includes(pattern) || repoDesc.includes(pattern))) {
                if (!technologies.includes(name)) {
                    technologies.push(name)
                }
            }
        })

        return technologies.slice(0, 4) // Máximo 4 tecnologias
    }

    const getImageSrc = (repo: RepoWithDetails): string => {
        // Se tiver preview, usar a imagem do repositório
        if (repo.previewExists) {
            return `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/main/preview.png`
        }

        // Se não tiver preview, usar imagem baseada na tecnologia principal
        if (repo.mainLanguage && techStackImages[repo.mainLanguage]) {
            return techStackImages[repo.mainLanguage]
        }

        // Se tiver tecnologias detectadas, usar a primeira
        if (repo.allTechnologies && repo.allTechnologies.length > 0) {
            for (const tech of repo.allTechnologies) {
                if (techStackImages[tech]) {
                    return techStackImages[tech]
                }
            }
        }

        // Fallback para imagem padrão
        return techStackImages.default
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        })
    }

    if (loading) {
        return (
            <section className="min-h-screen py-20 px-4 ">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white via-purple-200 to-blue-200 text-transparent bg-clip-text">
                            Projetos
                        </h2>
                        <div className="w-24 h-1 bg-linear-to-r from-purple-600 to-blue-600 mx-auto mt-4 rounded-full" />
                    </div>

                    <div className="flex flex-col items-center justify-center py-20">
                        <RefreshCw className="w-12 h-12 text-purple-500 animate-spin mb-4" />
                        <p className="text-gray-300">Carregando projetos...</p>
                    </div>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="min-h-screen py-20 px-4 bg-linear-to-br ">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16" data-aos="fade-up">
                        <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white via-purple-200 to-blue-200 text-transparent bg-clip-text">
                            Projetos
                        </h2>
                        <div className="w-24 h-1 bg-linear-to-r from-purple-600 to-blue-600 mx-auto mt-4 rounded-full" />
                    </div>

                    <div className="flex flex-col items-center justify-center py-20">
                        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Erro ao carregar projetos</h3>
                        <p className="text-gray-300 mb-6">{error}</p>
                        <button
                            onClick={fetchRepos}
                            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
                        >
                            <RefreshCw size={18} />
                            Tentar novamente
                        </button>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-20 px-4 min-h-screen">
            {/* Elementos de fundo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-64 h-64 bg-purple-600/5 rounded-full filter blur-3xl" />
                <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-600/5 rounded-full filter blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Cabeçalho */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white via-purple-200 to-blue-200 text-transparent bg-clip-text mb-4">
                        Projetos
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Conheça alguns dos meus projetos no GitHub
                    </p>
                    <div className="w-24 h-1 bg-linear-to-r from-purple-600 to-blue-600 mx-auto mt-4 rounded-full" />
                </div>

                {/* Grid de projetos */}
                {repos.length === 0 ? (
                    <div className="text-center py-20" data-aos="fade-up">
                        <Folder className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Nenhum projeto encontrado</h3>
                        <p className="text-gray-300">Não há repositórios públicos no momento.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {repos.map((repo, index) => {
                            const imageSrc = getImageSrc(repo)

                            return (
                                <div
                                    key={repo.id}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                    className="group relative"
                                    onMouseMove={(e) => handleMouseMove(e)}
                                    onMouseEnter={() => setActiveCard(repo.id)}
                                    onMouseLeave={() => setActiveCard(null)}
                                >
                                    {/* Efeito de luz seguindo o mouse */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
                                        style={{
                                            background: activeCard === repo.id
                                                ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 70%)`
                                                : 'none'
                                        }}
                                    />

                                    {/* Card */}
                                    <div className="relative h-full bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                                        {/* Imagem */}
                                        <div className="relative h-40 w-full overflow-hidden bg-gray-900">
                                            <img
                                                src={imageSrc}
                                                alt={repo.name}
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement
                                                    target.src = techStackImages.default
                                                }}
                                            />

                                            {/* Badge de preview */}
                                            {repo.previewExists && (
                                                <div className="absolute top-2 right-2 bg-purple-600/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                                    <Globe size={12} />
                                                    Preview
                                                </div>
                                            )}
                                        </div>

                                        {/* Conteúdo */}
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                                                    {repo.name}
                                                </h3>
                                                <Folder className="w-5 h-5 text-gray-400" />
                                            </div>

                                            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                                                {repo.description || 'Sem descrição disponível'}
                                            </p>

                                            {/* Tecnologias principais */}
                                            {repo.allTechnologies && repo.allTechnologies.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {repo.allTechnologies.map((tech, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600/50"
                                                            style={{
                                                                borderColor: languageColors[tech] ? `${languageColors[tech]}40` : undefined
                                                            }}
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Ações */}
                                            <div className="flex items-center gap-3">
                                                {repo.homepage && (
                                                    <Link
                                                        href={repo.homepage}
                                                        target="_blank"
                                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                                                    >
                                                        <ExternalLink size={16} />
                                                        view
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* Badge com total */}
                {repos.length > 0 && (
                    <div className="mt-12 text-center" data-aos="fade-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/30 backdrop-blur-sm border border-gray-700/50">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="text-sm text-gray-300">
                                <span className="font-bold text-white">{repos.length}</span> projetos públicos
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}