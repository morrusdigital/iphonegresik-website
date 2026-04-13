'use client'

import { formatPrice } from '@/lib/filters'
import { clsx } from 'clsx'

// ============================================================
// PriceRangeSlider
// Input min-max harga untuk FilterPanel
// ============================================================

interface PriceRangeSliderProps {
  min: number
  max: number
  valueMin: number
  valueMax: number
  onChangeMin: (val: number) => void
  onChangeMax: (val: number) => void
  step?: number
  className?: string
}

export default function PriceRangeSlider({
  min,
  max,
  valueMin,
  valueMax,
  onChangeMin,
  onChangeMax,
  step = 500000,
  className,
}: PriceRangeSliderProps) {
  const displayMin = valueMin > 0 ? formatPrice(valueMin) : 'Semua'
  const displayMax = valueMax > 0 ? formatPrice(valueMax) : 'Semua'

  return (
    <div className={clsx('space-y-3', className)}>
      <div className="flex justify-between text-xs text-gray-500">
        <span>{displayMin}</span>
        <span>{displayMax}</span>
      </div>

      {/* Harga Minimum */}
      <div className="space-y-1">
        <label className="text-xs text-gray-500">Harga minimum</label>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMin}
          onChange={(e) => onChangeMin(Number(e.target.value))}
          className="w-full accent-gray-900"
          aria-label="Harga minimum"
        />
      </div>

      {/* Harga Maksimum */}
      <div className="space-y-1">
        <label className="text-xs text-gray-500">Harga maksimum</label>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMax === 0 ? max : valueMax}
          onChange={(e) => onChangeMax(Number(e.target.value))}
          className="w-full accent-gray-900"
          aria-label="Harga maksimum"
        />
      </div>

      {/* Reset harga */}
      {(valueMin > 0 || valueMax > 0) && (
        <button
          onClick={() => { onChangeMin(0); onChangeMax(0) }}
          className="text-xs text-gray-500 underline hover:text-gray-800 transition-colors"
        >
          Reset harga
        </button>
      )}
    </div>
  )
}