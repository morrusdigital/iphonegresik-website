import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Domain eksternal untuk image source (Unsplash)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Format modern untuk performa lebih baik
    formats: ['image/avif', 'image/webp'],
  },
  // Aktifkan Server Fast Refresh untuk Turbopack (Next.js 16.x)
  experimental: {
    turbopackServerFastRefresh: true,
  },
}

export default nextConfig