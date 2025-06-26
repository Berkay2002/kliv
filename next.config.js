/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove appDir as it's now the default in Next.js 13+
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
