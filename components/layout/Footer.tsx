import Link from 'next/link'
import { BRANCHES } from '@/data/branches'
import SiteLogo from '@/components/layout/SiteLogo'
import { SITE_NAME } from '@/lib/brand'
import { getBranchWALink } from '@/lib/whatsapp'

const PRODUCT_LINKS = [
  { label: 'iPhone', href: '/kategori/iphone' },
  { label: 'iPad', href: '/kategori/ipad' },
  { label: 'Mac', href: '/kategori/mac' },
  { label: 'Aksesoris', href: '/kategori/aksesoris' },
]

const SERVICE_LINKS = [
  { label: 'Ready Stock', href: '/katalog?ready=1' },
  { label: 'Semua Produk', href: '/katalog' },
  { label: 'Cabang Gresik', href: getBranchWALink('gresik', 'general').url, external: true },
  { label: 'Cabang Tuban', href: getBranchWALink('tuban', 'general').url, external: true },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-12 border-t border-gray-200 bg-[#f5f5f7]">
      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,.62fr))]">
          <div className="space-y-4">
            <SiteLogo linked={false} />
            <p className="max-w-md text-[13px] leading-7 text-gray-500">
              Tempat belanja iPhone, iPad, Mac, dan aksesoris Apple original dengan harga jelas, pilihan lengkap, dan layanan admin yang cepat membantu.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-[12px] font-semibold tracking-[-0.01em] text-gray-900">Produk</p>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[13px] text-gray-500 transition-colors hover:text-gray-900">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-[12px] font-semibold tracking-[-0.01em] text-gray-900">Layanan</p>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] text-gray-500 transition-colors hover:text-gray-900"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-[13px] text-gray-500 transition-colors hover:text-gray-900">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-[12px] font-semibold tracking-[-0.01em] text-gray-900">Cabang</p>
            <ul className="space-y-4">
              {BRANCHES.map((branch) => (
                <li key={branch.key} className="space-y-1">
                  <p className="text-[13px] font-medium text-gray-900">{branch.city}</p>
                  {branch.address && <p className="text-[12px] leading-6 text-gray-500">{branch.address}</p>}
                  {branch.hours && <p className="text-[12px] text-gray-500">{branch.hours}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-5 text-[12px] text-gray-500 sm:flex sm:items-center sm:justify-between">
          <p>&copy; {year} {SITE_NAME}. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Belanja lebih tenang dengan produk Apple original dan layanan yang jelas.</p>
        </div>
      </div>
    </footer>
  )
}
