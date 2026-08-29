/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    assetPrefix: './', // <-- Essencial para o Electron encontrar os estilos e scripts em modo local
    images: {
        unoptimized: true,
    },
};

export default nextConfig;