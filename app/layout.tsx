import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

// ============================================================
// Font
// ============================================================

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

// ============================================================
// Metadata default — bisa di-override per page
// ============================================================

export const metadata: Metadata = {
  title: {
    default: 'iPhone Gresik — Authorized Apple Reseller',
    template: '%s | iPhone Gresik',
  },
  description:
    'Beli iPhone, iPad, Mac, dan Aksesoris Apple original bergaransi resmi. ' +
    'Tersedia di cabang Gresik dan Tuban. Cek stok dan order via WhatsApp.',
  keywords: ['iPhone', 'iPad', 'Mac', 'Apple', 'Gresik', 'Tuban', 'Authorized Reseller'],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'iPhone Gresik',
  },
}

// ============================================================
// Root Layout
// ============================================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={geist.variable}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}