'use client'

import type { Category } from '@/types/products'
import { clsx } from 'clsx'

// ============================================================
// CategoryTabs
// Tab navigasi kategori: Semua / iPhone / iPad / Mac / Aksesoris
// ============================================================

interface CategoryTab {
  key: Category | 'semua'
  label: string
}

const TABS: CategoryTab[] = [
  { key: 'semua',     label: 'Semua' },
  { key: 'iphone',   label: 'iPhone' },
  { key: 'ipad',     label: 'iPad' },
  { key: 'macbook',      label: 'Mac' },
  { key: 'accessories', label: 'Aksesoris' },
]

interface CategoryTabsProps {
  activeCategory: Category | 'semua'
  onChange: (category: Category | 'semua') => void
  className?: string
}

export default function CategoryTabs({
  activeCategory,
  onChange,
  className,
}: CategoryTabsProps) {
  return (
    <div className={clsx('relative min-w-0', className)}>
      <div
        className="flex items-center gap-1 overflow-x-auto pb-px pr-8 [scrollbar-width:none] sm:pr-0 [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Kategori produk"
      >
        {TABS.map((tab) => {
          const isActive = tab.key === activeCategory
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.key)}
              className={clsx(
                'whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium',
                'transition-colors duration-150 focus-visible:outline-none',
                'focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2',
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
      {/* Tanda di HP bahwa tab masih bisa digeser ke kanan. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent sm:hidden"
      />
    </div>
  )
}