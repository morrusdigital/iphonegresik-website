'use client'

import type { Branch } from '@/types/branches'
import type { BranchKey } from '@/types/products'
import { clsx } from 'clsx'

// ============================================================
// BranchDropdown
// Dropdown / toggle untuk pilih cabang aktif
// ============================================================

interface BranchDropdownProps {
  branches: Branch[]
  activeBranchKey: BranchKey
  onSelect: (key: BranchKey) => void
  className?: string
}

export default function BranchDropdown({
  branches,
  activeBranchKey,
  onSelect,
  className,
}: BranchDropdownProps) {
  return (
    <div
      className={clsx(
        'inline-flex items-center rounded-lg border border-gray-200 bg-white p-1 gap-1',
        className
      )}
      role="group"
      aria-label="Pilih cabang"
    >
      {branches.map((branch) => {
        const isActive = branch.key === activeBranchKey
        return (
          <button
            key={branch.key}
            onClick={() => onSelect(branch.key)}
            className={clsx(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150',
              isActive
                ? 'bg-gray-900 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            )}
            aria-pressed={isActive}
          >
            {branch.city}
          </button>
        )
      })}
    </div>
  )
}