'use client'

import { useState, useMemo, useCallback } from 'react'
import {
  filterProducts,
  sortProducts,
  countActiveFilters,
  hasActiveFilters,
  getActiveFilterChips,
  SortOption,
} from '@/lib/filters'
import { buildFilterOptions } from '@/lib/products/filter-options'
import { DEFAULT_FILTER_STATE, FilterState, Product } from '@/types/products'

interface UseFiltersOptions {
  initialProducts: Product[]
  initialSort?: SortOption
  initialFilters?: Partial<FilterState>
}

interface UseFiltersReturn {
  filters: FilterState
  sort: SortOption
  filteredProducts: Product[]
  totalFiltered: number
  totalAll: number
  filterOptions: ReturnType<typeof buildFilterOptions>
  activeChips: ReturnType<typeof getActiveFilterChips>
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  setSort: (sort: SortOption) => void
  resetFilters: () => void
  removeFilter: (key: keyof FilterState) => void
  activeFilterCount: number
  isFiltered: boolean
}

export function useFilters({
  initialProducts,
  initialSort = 'harga-asc',
  initialFilters,
}: UseFiltersOptions): UseFiltersReturn {
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTER_STATE,
    ...initialFilters,
  })
  const [sort, setSort] = useState<SortOption>(initialSort)

  const filterOptions = useMemo(
    () => buildFilterOptions(initialProducts),
    [initialProducts]
  )

  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(initialProducts, filters)
    return sortProducts(filtered, sort)
  }, [initialProducts, filters, sort])

  const setFilter = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const removeFilter = useCallback((key: keyof FilterState) => {
    setFilters((prev) => {
      const next = { ...prev }
      if (key === 'readyOnly') next.readyOnly = false
      else if (key === 'priceMin') next.priceMin = 0
      else if (key === 'priceMax') next.priceMax = 0
      else (next[key] as string) = ''
      return next
    })
  }, [])

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
    activeChips: getActiveFilterChips(filters),
    setFilter,
    setSort,
    resetFilters,
    removeFilter,
    activeFilterCount: countActiveFilters(filters),
    isFiltered: hasActiveFilters(filters),
  }
}
