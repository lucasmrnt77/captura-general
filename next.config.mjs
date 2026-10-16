/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
    ],
  },
  // Geo sem código no servidor: as capturas são páginas fixas (cache). Quem não é de AR/UY/CL
  // recebe a versão internacional pelo país que a Vercel informa no cabeçalho.
  // ?pais=XX força o país (testes). Sem país conhecido, fica a versão local (como antes).
  // Nomenclatura única /v1, /v2… (igual na Trader e no painel). Endereços antigos continuam funcionando.
  async redirects() {
    return [
      { source: '/gracias-a', destination: '/gracias-v1', permanent: false },
      { source: '/gracias-b', destination: '/gracias-v2', permanent: false },
      { source: '/gracias-c', destination: '/gracias-v3', permanent: false },
    ]
  },
  async rewrites() {
    const naoLocal = '(?!(?:AR|UY|CL|ar|uy|cl)$).+'
    const geo = (source, destination) => [
      { source, has: [{ type: 'query', key: 'pais', value: naoLocal }], destination },
      {
        source,
        missing: [{ type: 'query', key: 'pais' }],
        has: [{ type: 'header', key: 'x-vercel-ip-country', value: naoLocal }],
        destination,
      },
    ]
    return {
      beforeFiles: [...geo('/', '/intl'), ...geo('/v1', '/v1-intl'), ...geo('/v2', '/v2-intl'), ...geo('/v3', '/v3-intl')],
    }
  },
}

export default nextConfig
