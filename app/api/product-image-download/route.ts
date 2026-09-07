import type { NextRequest } from 'next/server'

const UNSPLASH_ORIGIN = 'https://images.unsplash.com'

function getAllowedRemoteOrigins(): Set<string> {
  const origins = new Set<string>([UNSPLASH_ORIGIN])
  const laravelApiUrl = process.env.LARAVEL_POS_API_URL

  if (!laravelApiUrl) return origins

  try {
    const parsedUrl = new URL(laravelApiUrl)
    origins.add(parsedUrl.origin)

    if (parsedUrl.hostname === '127.0.0.1' || parsedUrl.hostname === 'localhost') {
      const alternateHostname =
        parsedUrl.hostname === '127.0.0.1' ? 'localhost' : '127.0.0.1'
      const alternateUrl = new URL(parsedUrl.toString())

      alternateUrl.hostname = alternateHostname
      origins.add(alternateUrl.origin)
    }
  } catch {
    // Abaikan env URL yang belum valid agar endpoint download tetap tersedia.
  }

  return origins
}

function sanitizeFileName(value: string): string {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'product-image'
  )
}

function getExtension(contentType: string, sourcePath: string): string {
  if (contentType.includes('png')) return '.png'
  if (contentType.includes('webp')) return '.webp'
  if (contentType.includes('avif')) return '.avif'
  if (contentType.includes('gif')) return '.gif'
  if (contentType.includes('svg')) return '.svg'
  if (contentType.includes('jpeg') || contentType.includes('jpg')) return '.jpg'

  const sourceExtension = sourcePath.match(/\.(png|webp|avif|gif|svg|jpe?g)$/i)?.[0]
  return sourceExtension?.toLowerCase().replace('.jpeg', '.jpg') ?? '.jpg'
}

function isImagePath(pathname: string): boolean {
  return /\.(png|webp|avif|gif|svg|jpe?g)$/i.test(pathname)
}

export async function GET(request: NextRequest) {
  const src = request.nextUrl.searchParams.get('src')
  const name = request.nextUrl.searchParams.get('name') ?? 'product-image'

  if (!src) {
    return new Response('Missing image source', { status: 400 })
  }

  let imageUrl: URL

  try {
    imageUrl = new URL(src, request.nextUrl.origin)
  } catch {
    return new Response('Invalid image source', { status: 400 })
  }

  const isSameOrigin = src.startsWith('/') && !src.startsWith('//')
  const isAllowedRemoteOrigin = getAllowedRemoteOrigins().has(imageUrl.origin)

  if (
    !['http:', 'https:'].includes(imageUrl.protocol) ||
    (isSameOrigin && !isImagePath(imageUrl.pathname)) ||
    (!isSameOrigin && !isAllowedRemoteOrigin)
  ) {
    return new Response('Image source is not allowed', { status: 400 })
  }

  const imageResponse = await fetch(imageUrl, { cache: 'no-store' })

  if (!imageResponse.ok) {
    return new Response('Image could not be downloaded', { status: imageResponse.status })
  }

  const contentType = imageResponse.headers.get('content-type') ?? 'application/octet-stream'

  if (!contentType.startsWith('image/')) {
    return new Response('Source is not an image', { status: 415 })
  }

  const extension = getExtension(contentType, imageUrl.pathname)
  const fileName = `${sanitizeFileName(name)}${extension}`

  return new Response(await imageResponse.arrayBuffer(), {
    headers: {
      'Cache-Control': 'no-store',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Type': contentType,
    },
  })
}
