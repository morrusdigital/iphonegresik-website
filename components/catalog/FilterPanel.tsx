'use client'

import type { SortOption } from '@/lib/filters'
import PriceRangeSlider from '@/components/ui/PriceRangeSlider'
import { clsx } from 'clsx'
import { FilterOptions, FilterState } from '@/types/products'

// ============================================================
// FilterPanel
// Panel filter lengkap: model, storage, warna, kondisi, harga
// ============================================================

interface FilterPanelProps {
  filters: FilterState
  filterOptions: FilterOptions
  sort: SortOption
  activeFilterCount: number
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  onSortChange: (sort: SortOption) => void
  onReset: () => void
  className?: string
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'harga-asc',  label: 'Harga: Termurah' },
  { value: 'harga-desc', label: 'Harga: Termahal' },
  { value: 'nama-asc',   label: 'Nama: A–Z' },
  { value: 'nama-desc',  label: 'Nama: Z–A' },
]

const PRICE_MIN = 0
const PRICE_MAX = 35_000_000

// ── Sub-component: Select dropdown ──────────────────────────
function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (val: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          'w-full rounded-lg border border-gray-200 bg-white px-3 py-2',
          'text-sm text-gray-900 focus:border-gray-400 focus:outline-none',
          'focus:ring-1 focus:ring-gray-400 transition-colors',
          !value && 'text-gray-400'
        )}
      >
        <option value="">Semua {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────
export default function FilterPanel({
  filters,
  filterOptions,
  sort,
  activeFilterCount,
  onFilterChange,
  onSortChange,
  onReset,
  className,
}: FilterPanelProps) {
  return (
    <aside className={clsx('space-y-6', className)}>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">
          Filter
          {activeFilterCount > 0 && (
            <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs text-white">
              {activeFilterCount}
            </span>
          )}
        </h2>
        {activeFilterCount > 0 && (
          <button
            onClick={onReset}
            className="text-xs text-gray-500 underline hover:text-gray-800 transition-colors"
          >
            Reset semua
          </button>
        )}
      </div>

      {/* Urutkan */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-700">Urutkan</label>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-colors"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <hr className="border-gray-100" />

      {/* Model */}
      <FilterSelect
        label="Model"
        value={filters.model}
        options={filterOptions.models}
        onChange={(val) => onFilterChange('model', val)}
      />

      {/* Storage */}
      <FilterSelect
        label="Storage"
        value={filters.storage}
        options={filterOptions.storages}
        onChange={(val) => onFilterChange('storage', val)}
      />

      {/* Warna */}
      <FilterSelect
        label="Warna"
        value={filters.color}
        options={filterOptions.colors}
        onChange={(val) => onFilterChange('color', val)}
      />

      {/* Kondisi */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-700">Kondisi</label>
        <div className="flex gap-2">
          {(['', 'baru', 'second'] as const).map((val) => (
            <button
              key={val}
              onClick={() => onFilterChange('condition', val)}
              className={clsx(
                'flex-1 rounded-lg border py-1.5 text-xs font-medium transition-colors',
                filters.condition === val
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              )}
            >
              {val === '' ? 'Semua' : val === 'baru' ? 'Baru' : 'Second'}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Harga */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-700">Rentang Harga</label>
        <PriceRangeSlider
          min={PRICE_MIN}
          max={PRICE_MAX}
          valueMin={filters.priceMin}
          valueMax={filters.priceMax}
          onChangeMin={(val) => onFilterChange('priceMin', val)}
          onChangeMax={(val) => onFilterChange('priceMax', val)}
        />
      </div>

    </aside>
  )
}