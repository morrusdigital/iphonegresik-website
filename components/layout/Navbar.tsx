'use client'

import Link from 'next/link'
import { useState } from 'react'
import SiteLogo from '@/components/layout/SiteLogo'
import { clsx } from 'clsx'

const NAV_LINKS = [
  { href: '/katalog', label: 'Semua Produk' },
  { href: '/kategori/iphone', label: 'iPhone' },
  { href: '/kategori/ipad', label: 'iPad' },
  { href: '/kategori/mac', label: 'Mac' },
  { href: '/katalog?ready=1', label: 'Ready Stock' },
  { href: '/kategori/aksesoris', label: 'Aksesoris' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="bg-[#0b5cab] px-4 py-2 text-center text-[11px] font-medium text-white sm:px-6">
        Belanja lebih aman dan lebih cepat. Gunakan tombol WhatsApp resmi di website untuk tanya stok, harga, dan pemesanan.
      </div>

      <div className="border-b border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 sm:px-6">
        <div className="mx-auto flex max-w-[1280px] items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4 text-gray-500" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5h18M5.25 7.5V18a.75.75 0 00.75.75h12a.75.75 0 00.75-.75V7.5M9 7.5V6a3 3 0 116 0v1.5" />
          </svg>
          <span>Pilih cabang terdekat: Gresik atau Tuban</span>
        </div>
      </div>

      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-[44px] md:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-gray-700"
              aria-expanded={mobileOpen}
              aria-label="Buka menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="h-5 w-5" aria-hidden="true">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-1 justify-center md:flex-none">
            <SiteLogo />
          </div>

          <div className="flex min-w-[44px] justify-end md:min-w-[180px] md:items-center md:gap-3">
            <Link
              href="/kategori/iphone"
              className="hidden text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 lg:inline-flex"
            >
              Best Seller
            </Link>
            <Link
              href="/katalog?ready=1"
              className="hidden rounded-full bg-[#0071e3] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#005ecb] md:inline-flex"
            >
              Ready Stock
            </Link>
            <Link
              href="/katalog"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-gray-700 transition-colors hover:bg-gray-50"
              aria-label="Buka katalog"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="h-5 w-5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386a1.5 1.5 0 011.415 1.03L5.4 5.25m0 0h13.65a.75.75 0 01.73.917l-1.2 5.25a.75.75 0 01-.73.583H7.11a.75.75 0 01-.73-.583L5.4 5.25zM5.4 5.25L4.2 15a1.5 1.5 0 001.49 1.683h10.62M8.25 20.25a.75.75 0 100-1.5.75.75 0 000 1.5zm8.25 0a.75.75 0 100-1.5.75.75 0 000 1.5z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="border-b border-gray-200 bg-white px-4 py-3 md:hidden"
          aria-label="Navigasi mobile"
        >
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    'block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700',
                    'hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
