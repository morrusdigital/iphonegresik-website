const remotePatterns = [
  {
    protocol: 'https',
    hostname: 'images.unsplash.com',
  },
]

const laravelApiUrl = process.env.LARAVEL_POS_API_URL
let allowLocalLaravelImages = false

if (laravelApiUrl) {
  try {
    const parsedUrl = new URL(laravelApiUrl)

    remotePatterns.push({
      protocol: parsedUrl.protocol === 'http:' ? 'http' : 'https',
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
    })

    if (parsedUrl.hostname === '127.0.0.1' || parsedUrl.hostname === 'localhost') {
      allowLocalLaravelImages = true

      const alternateHostname =
        parsedUrl.hostname === '127.0.0.1' ? 'localhost' : '127.0.0.1'

      remotePatterns.push({
        protocol: parsedUrl.protocol === 'http:' ? 'http' : 'https',
        hostname: alternateHostname,
        port: parsedUrl.port,
      })
    }
  } catch {
    // Abaikan env URL yang belum valid agar dev server tetap bisa boot.
  }
}

const nextConfig = {
  images: {
    remotePatterns,
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowLocalIP: allowLocalLaravelImages,
  },
  experimental: {
    turbopackServerFastRefresh: true,
  },
}

export default nextConfig
