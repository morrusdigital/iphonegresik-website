import Link from 'next/link'
import type { Category } from '@/types/products'
import { getProductsByCategory } from '@/data/products'

// ============================================================
// CategoryHighlight
// Grid 4 kategori di beranda — Server Component
// ============================================================

const CATEGORIES: {
  key: Category
  label: string
  description: string
  href: string
  bg: string
}[] = [
  {
    key: 'iphone',
    label: 'iPhone',
    description: 'Series terbaru, ready stock',
    href: '/kategori/iphone',
    bg: 'bg-blue-50 hover:bg-blue-100',
  },
  {
    key: 'ipad',
    label: 'iPad',
    description: 'Air, Pro, dan Gen 10',
    href: '/kategori/ipad',
    bg: 'bg-purple-50 hover:bg-purple-100',
  },
  {
    key: 'macbook',
    label: 'Mac',
    description: 'MacBook Air & Pro M3',
    href: '/kategori/mac',
    bg: 'bg-gray-100 hover:bg-gray-200',
  },
  {
    key: 'accessories',
    label: 'Aksesoris',
    description: 'AirPods, Apple Watch & more',
    href: '/kategori/aksesoris',
    bg: 'bg-green-50 hover:bg-green-100',
  },
]

export default function CategoryHighlight() {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Kategori</h2>
        <p className="mt-0.5 text-sm text-gray-500">Temukan produk yang kamu butuhkan</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CATEGORIES.map((cat) => {
          const products = getProductsByCategory(cat.key)
          const count = products.length

          return (
            <Link
              key={cat.key}
              href={cat.href}
              className={`group rounded-2xl p-5 transition-colors ${cat.bg}`}
            >
              <div className="space-y-1">
                <p className="text-base font-bold text-gray-900">{cat.label}</p>
                <p className="text-xs text-gray-500">{cat.description}</p>
                <p className="text-xs font-medium text-gray-400">
                  {count} produk
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                Lihat semua
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3" aria-hidden="true">
                  <path fillRule="evenodd" d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.25a.75.75 0 010 1.06l-4.5 4.25a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}