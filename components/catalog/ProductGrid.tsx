'use client'

import { useState } from 'react'
import type { Product, Category, BranchKey } from '@/types/products'
import { useFilters } from '@/hooks/useFilters'
import { useBranch } from '@/hooks/useBranch'
import ProductCard from '@/components/catalog/ProductCard'
import FilterPanel from '@/components/catalog/FilterPanel'
import CategoryTabs from '@/components/ui/CategoryTabs'
import BranchDropdown from '@/components/ui/BranchDropdown'
import { clsx } from 'clsx'

// ============================================================
// ProductGrid
// Komponen utama katalog: filter + sort + grid produk
// Client component karena butuh interaktivitas filter
// ============================================================

interface ProductGridProps {
  initialProducts: Product[]
}

export default function ProductGrid({ initialProducts }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<Category | 'semua'>('semua')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Hook cabang
  const { activeBranchKey, branches, setBranch } = useBranch('gresik')

  // Filter berdasarkan kategori dulu sebelum masuk useFilters
  const productsByCategory = activeCategory === 'semua'
    ? initialProducts
    : initialProducts.filter((p) => p.category === activeCategory)

  // Hook filter + sort
  const {
    filters,
    sort,
    filteredProducts,
    totalFiltered,
    totalAll,
    filterOptions,
    setFilter,
    setSort,
    resetFilters,
    activeFilterCount,
  } = useFilters({ initialProducts: productsByCategory })

  return (
    <div className="space-y-6">

      {/* ── Top bar: Category + Branch ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CategoryTabs
          activeCategory={activeCategory}
          onChange={(cat) => { setActiveCategory(cat); resetFilters() }}
        />
        <BranchDropdown
          branches={branches}
          activeBranchKey={activeBranchKey}
          onSelect={(key: BranchKey) => setBranch(key)}
        />
      </div>

      <div className="flex gap-8">

        {/* ── Sidebar filter (desktop) ── */}
        <div className="hidden w-56 shrink-0 lg:block">
          <FilterPanel
            filters={filters}
            filterOptions={filterOptions}
            sort={sort}
            activeFilterCount={activeFilterCount}
            onFilterChange={setFilter}
            onSortChange={setSort}
            onReset={resetFilters}
          />
        </div>

        {/* ── Konten utama ── */}
        <div className="min-w-0 flex-1 space-y-4">

          {/* Toolbar mobile: filter toggle + result count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-900">{totalFiltered}</span>
              {' '}dari {totalAll} produk
            </p>
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className={clsx(
                'flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm lg:hidden',
                'transition-colors',
                activeFilterCount > 0
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path fillRule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clipRule="evenodd" />
              </svg>
              Filter
              {activeFilterCount > 0 && (
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs text-gray-900">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Product grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  activeBranchKey={activeBranchKey}
                />
              ))}
            </div>
          ) : (
            <EmptyState onReset={resetFilters} />
          )}
        </div>
      </div>

      {/* ── Mobile filter drawer ── */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMobileFilterOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white px-5 py-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">Filter & Urutkan</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
                aria-label="Tutup filter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
            <FilterPanel
              filters={filters}
              filterOptions={filterOptions}
              sort={sort}
              activeFilterCount={activeFilterCount}
              onFilterChange={setFilter}
              onSortChange={setSort}
              onReset={resetFilters}
            />
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="mt-6 w-full rounded-xl bg-gray-900 py-3 text-sm font-medium text-white"
            >
              Tampilkan {totalFiltered} produk
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Empty state ───────────────────────────────────────────────
function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 py-16 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="mb-3 h-10 w-10 text-gray-300" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 15.803m10.607 0A7.5 7.5 0 0 1 5.196 15.803" />
      </svg>
      <p className="text-sm font-medium text-gray-900">Produk tidak ditemukan</p>
      <p className="mt-1 text-xs text-gray-500">Coba ubah atau reset filter yang aktif</p>
      <button
        onClick={onReset}
        className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-xs font-medium text-white hover:bg-gray-800 transition-colors"
      >
        Reset filter
      </button>
    </div>
  )
}