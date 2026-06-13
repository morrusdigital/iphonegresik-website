import type { Metadata } from 'next'
import { Geist, Space_Grotesk } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'iPhone Gresik — iPhone, iPad, Mac & Aksesoris Apple',
    template: '%s | iPhone Gresik',
  },
  description:
    'Beli iPhone, iPad, Mac, dan aksesoris Apple original dengan harga jelas, pilihan lengkap, dan layanan cepat. Tersedia untuk Gresik, Tuban, dan pengiriman luar kota.',
  keywords: ['iPhone', 'iPad', 'Mac', 'Apple', 'Gresik', 'Tuban', 'Ready Stock'],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'iPhone Gresik',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={`${geist.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen antialiased">
        <Navbar />
        <main className="mx-auto max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  )
}
