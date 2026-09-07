'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Product, Category, BranchKey, FilterState } from '@/types/products'
import { useFilters } from '@/hooks/useFilters'
import { useBranch } from '@/hooks/useBranch'
import ProductCard from '@/components/catalog/ProductCard'
import FilterPanel from '@/components/catalog/FilterPanel'
import FilterChips from '@/components/catalog/FilterChips'
import CategoryTabs from '@/components/ui/CategoryTabs'
import BranchDropdown from '@/components/ui/BranchDropdown'
import { clsx } from 'clsx'

interface ProductGridProps {
  initialProducts: Product[]
  initialCategory?: Category | 'semua'
  navigateByCategory?: boolean
  initialFilters?: Partial<FilterState>
}

const CATEGORY_ROUTE_MAP: Record<Category, string> = {
  iphone: 'iphone',
  ipad: 'ipad',
  macbook: 'mac',
  accessories: 'aksesoris',
}

export default function ProductGrid({
  initialProducts,
  initialCategory = 'semua',
  navigateByCategory = false,
  initialFilters,
}: ProductGridProps) {
  const router = useRouter()
  const [localCategory, setLocalCategory] = useState<Category | 'semua'>(initialCategory)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  useEffect(() => {
    setLocalCategory(initialCategory)
  }, [initialCategory])

  const activeCategory = navigateByCategory ? initialCategory : localCategory

  const { activeBranchKey, branches, setBranch } = useBranch(
    (initialFilters?.branch as BranchKey) || 'gresik'
  )

  const productsByCategory =
    activeCategory === 'semua'
      ? initialProducts
      : initialProducts.filter((p) => p.category === activeCategory)

  const {
    filters,
    sort,
    filteredProducts,
    totalFiltered,
    totalAll,
    filterOptions,
    activeChips,
    setFilter,
    setSort,
    resetFilters,
    removeFilter,
    activeFilterCount,
  } = useFilters({ initialProducts: productsByCategory, initialFilters })

  // Sinkron cabang dropdown ↔ filter cabang
  useEffect(() => {
    if (filters.branch && filters.branch !== activeBranchKey) {
      setBranch(filters.branch)
    }
  }, [filters.branch, activeBranchKey, setBranch])

  const handleBranchSelect = (key: BranchKey) => {
    setBranch(key)
    setFilter('branch', key)
  }

  const displayBranchKey = filters.branch || activeBranchKey

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CategoryTabs
          activeCategory={activeCategory}
          onChange={(cat) => {
            resetFilters()
            if (navigateByCategory) {
              if (cat === activeCategory) return
              router.push(cat === 'semua' ? '/katalog' : `/kategori/${CATEGORY_ROUTE_MAP[cat]}`)
              return
            }
            setLocalCategory(cat)
          }}
        />
        <BranchDropdown
          branches={branches}
          activeBranchKey={displayBranchKey as BranchKey}
          onSelect={handleBranchSelect}
        />
      </div>

      <FilterChips
        chips={activeChips}
        onRemove={removeFilter}
        onReset={resetFilters}
      />

      <div className="flex gap-8">
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

        <div className="min-w-0 flex-1 space-y-4">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="relative">
              <label htmlFor="catalog-search" className="sr-only">
                Cari produk
              </label>
              <input
                id="catalog-search"
                type="search"
                value={filters.query ?? ''}
                onChange={(e) => setFilter('query', e.target.value)}
                placeholder="Cari iPhone 15, 128GB, warna, SKU..."
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-10 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              />
              {filters.query && (
                <button
                  type="button"
                  onClick={() => setFilter('query', '')}
                  className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                  aria-label="Hapus pencarian"
                >
                  ×
                </button>
              )}
            </div>
            <div className="flex items-center justify-between gap-3 md:justify-end">
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-900">{totalFiltered}</span> dari {totalAll}{' '}
                produk
                {filters.branch && (
                  <span className="text-gray-400">
                    {' '}
                    · cabang {filters.branch === 'gresik' ? 'Gresik' : 'Tuban'}
                  </span>
                )}
              </p>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className={clsx(
                  'flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm lg:hidden',
                  'transition-colors',
                  activeFilterCount > 0
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                )}
              >
                Filter
                {activeFilterCount > 0 && (
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white text-xs text-gray-900">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  activeBranchKey={filters.branch || activeBranchKey}
                />
              ))}
            </div>
          ) : (
            <EmptyState onReset={resetFilters} />
          )}
        </div>
      </div>

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMobileFilterOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white px-5 py-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-semibold text-gray-900">Filter & Urutkan</h2>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
                aria-label="Tutup filter"
              >
                ×
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
              type="button"
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

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 py-16 text-center">
      <p className="text-sm font-medium text-gray-900">Produk tidak ditemukan</p>
      <p className="mt-1 text-xs text-gray-500">Coba ubah kata pencarian atau reset filter yang aktif</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-xs font-medium text-white hover:bg-gray-800 transition-colors"
      >
        Reset filter
      </button>
    </div>
  )
}
