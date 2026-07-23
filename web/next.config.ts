import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR ?? '.next',
  allowedDevOrigins: ['127.0.0.1'],
  compress: true,
  poweredByHeader: false,
  reactCompiler: true,
  images: {
    formats: ['image/webp'],
    qualities: [60, 75],
    minimumCacheTTL: 604_800,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'yvrgrtntodxcxicocggm.supabase.co',
        pathname: '/storage/v1/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/vi_webp/**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/editorial-01-2024', destination: '/editoriais/editorial-01-2024', permanent: true },
      { source: '/editorial-02-2024', destination: '/editoriais/editorial-02-2024', permanent: true },
      { source: '/editorial-03-2025', destination: '/editoriais/editorial-03-2025', permanent: true },
      { source: '/produções-nacionais', destination: '/projeto/producoes/artigos', permanent: true },
      { source: '/producoes-nacionais', destination: '/projeto/producoes/artigos', permanent: true },
      {
        source: '/editoriais/as-criancas-sao-sujeitos-politicos',
        destination: '/editoriais/editorial-02-2024',
        permanent: true,
      },
      {
        source: '/editoriais/as-professoras-discutem-o-recreio',
        destination: '/editoriais/editorial-03-2025',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
