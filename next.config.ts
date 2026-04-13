import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Tambahkan domain eksternal jika foto produk dari CDN/CMS
    remotePatterns: [],
    // Format modern untuk performa lebih baik
    formats: ['image/avif', 'image/webp'],
  },
  // Aktifkan Server Fast Refresh untuk Turbopack (Next.js 16.x)
  experimental: {
    turbopackServerFastRefresh: true,
  },
}

export default nextConfig