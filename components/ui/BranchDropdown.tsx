'use client'

import type { Branch } from '@/types/branches'
import type { BranchKey } from '@/types/products'
import { clsx } from 'clsx'

// ============================================================
// BranchDropdown
// Toggle untuk pilih cabang aktif ('' = semua cabang)
// ============================================================

interface BranchDropdownProps {
  branches: Branch[]
  activeBranchKey: '' | BranchKey
  onSelect: (key: '' | BranchKey) => void
  /** Tampilkan opsi "Semua cabang" di depan. */
  includeAll?: boolean
  className?: string
}

export default function BranchDropdown({
  branches,
  activeBranchKey,
  onSelect,
  includeAll = false,
  className,
}: BranchDropdownProps) {
  const options: { key: '' | BranchKey; label: string }[] = [
    ...(includeAll ? [{ key: '' as const, label: 'Semua cabang' }] : []),
    ...branches.map((branch) => ({ key: branch.key, label: branch.city })),
  ]

  return (
    <div
      className={clsx(
        'inline-flex shrink-0 items-center gap-1 self-start rounded-lg border border-gray-200 bg-white p-1',
        className
      )}
      role="group"
      aria-label="Pilih cabang"
    >
      {options.map((option) => {
        const isActive = option.key === activeBranchKey
        return (
          <button
            key={option.key || 'semua'}
            type="button"
            onClick={() => onSelect(option.key)}
            className={clsx(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150',
              isActive
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            )}
            aria-pressed={isActive}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}