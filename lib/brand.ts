/** Pengaturan brand — ganti logo & nama di satu tempat */

export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'iPhone Gresik'

/** Taruh file di `public/images/brand/logo-wordmark.png` (atau .svg / .webp) */
export const SITE_LOGO_SRC =
  process.env.NEXT_PUBLIC_SITE_LOGO ?? '/images/brand/logo-wordmark.png'

export const SITE_LOGO_ALT = `${SITE_NAME} logo`

/** true jika ingin pakai logo mark + nama teks terpisah */
export const SITE_LOGO_SHOW_NAME =
  process.env.NEXT_PUBLIC_SITE_LOGO_SHOW_NAME === 'true'
