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
  // Geo sem código no servidor: a /v1 é uma página fixa (cache); quem não é de AR/UY/CL
  // recebe a versão internacional (/v1-intl) pelo país que a Vercel informa no cabeçalho.
  // ?pais=XX força o país (testes). Sem país conhecido, fica a versão local (como antes).
  async rewrites() {
    const naoLocal = '(?!(?:AR|UY|CL|ar|uy|cl)$).+'
    return {
      beforeFiles: [
        { source: '/v1', has: [{ type: 'query', key: 'pais', value: naoLocal }], destination: '/v1-intl' },
        {
          source: '/v1',
          missing: [{ type: 'query', key: 'pais' }],
          has: [{ type: 'header', key: 'x-vercel-ip-country', value: naoLocal }],
          destination: '/v1-intl',
        },
      ],
    }
  },
}

export default nextConfig
