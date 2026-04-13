'use client'

import { useState, useMemo, useCallback } from 'react'
import { filterProducts, sortProducts, countActiveFilters, hasActiveFilters, SortOption } from '@/lib/filters'
import { getFilterOptions } from '@/data/products'
import { DEFAULT_FILTER_STATE, FilterState, Product } from '@/types/products'

interface UseFiltersOptions {
  initialProducts: Product[]
  initialSort?: SortOption
}

interface UseFiltersReturn {
  // State
  filters: FilterState
  sort: SortOption
  // Hasil
  filteredProducts: Product[]
  totalFiltered: number
  totalAll: number
  // Filter options (untuk populate dropdown)
  filterOptions: ReturnType<typeof getFilterOptions>
  // Actions
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  setSort: (sort: SortOption) => void
  resetFilters: () => void
  // Info
  activeFilterCount: number
  isFiltered: boolean
}

export function useFilters({
  initialProducts,
  initialSort = 'harga-asc',
}: UseFiltersOptions): UseFiltersReturn {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER_STATE)
  const [sort, setSort] = useState<SortOption>(initialSort)

  // Filter options digenerate sekali dari produk awal
  const filterOptions = useMemo(
    () => getFilterOptions(initialProducts),
    [initialProducts]
  )

  // Hasil produk setelah filter + sort — hanya recompute kalau filter/sort berubah
  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(initialProducts, filters)
    return sortProducts(filtered, sort)
  }, [initialProducts, filters, sort])

  // Set satu field filter tanpa reset yang lain
  const setFilter = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  // Reset semua filter ke default
  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTER_STATE)
  }, [])

  return {
    filters,
    sort,
    filteredProducts,
    totalFiltered: filteredProducts.length,
    totalAll: initialProducts.length,
    filterOptions,
    setFilter,
    setSort,
    resetFilters,
    activeFilterCount: countActiveFilters(filters),
    isFiltered: hasActiveFilters(filters),
  }
}