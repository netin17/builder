/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['estateon.com'], // Add your local domain here
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'estateon.com',
          },
        ],
      },
}

module.exports = nextConfig
