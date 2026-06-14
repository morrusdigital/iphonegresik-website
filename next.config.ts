import type { NextConfig } from 'next'

const remotePatterns: NonNullable<NextConfig['images']>['remotePatterns'] = [
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
  },
]

const laravelApiUrl = process.env.LARAVEL_POS_API_URL

if (laravelApiUrl) {
  try {
    const parsedUrl = new URL(laravelApiUrl)

    remotePatterns.push({
      protocol: parsedUrl.protocol.replace(':', '') as 'http' | 'https',
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
    })
  } catch {
    // Abaikan env URL yang belum valid agar dev server tetap bisa boot.
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    turbopackServerFastRefresh: true,
  },
}

export default nextConfig
