'use client'

import { FilterChip, formatPrice } from '@/lib/filters'
import { FilterState } from '@/types/products'
import { clsx } from 'clsx'

interface FilterChipsProps {
  chips: FilterChip[]
  onRemove: (key: keyof FilterState) => void
  onReset: () => void
  className?: string
}

function chipDisplay(chip: FilterChip): string {
  if (chip.key === 'priceMin') return `Min ${formatPrice(Number(chip.value))}`
  if (chip.key === 'priceMax') return `Max ${formatPrice(Number(chip.value))}`
  if (chip.key === 'readyOnly') return 'Ready stock'
  if (chip.key === 'warrantyType') {
    const v = String(chip.value)
    return v === 'resmi' ? 'Garansi resmi' : v === 'toko' ? 'Garansi toko' : v
  }
  return `${chip.label}: ${chip.value}`
}

export default function FilterChips({ chips, onRemove, onReset, className }: FilterChipsProps) {
  if (chips.length === 0) return null

  return (
    <div className={clsx('flex flex-wrap items-center gap-2', className)}>
      {chips.map((chip) => (
        <button
          key={`${chip.key}-${String(chip.value)}`}
          type="button"
          onClick={() => onRemove(chip.key)}
          className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:border-gray-400 transition-colors"
        >
          {chipDisplay(chip)}
          <span className="text-gray-400" aria-hidden>×</span>
        </button>
      ))}
      <button
        type="button"
        onClick={onReset}
        className="text-xs font-medium text-blue-600 hover:underline"
      >
        Reset semua
      </button>
    </div>
  )
}
