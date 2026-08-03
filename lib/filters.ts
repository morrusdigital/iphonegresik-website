import { FilterState, Product } from '@/types/products'
import { hasStockInBranch } from '@/lib/stock'

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  return products.filter((product) => {
    if (filters.model && product.model !== filters.model) return false
    if (filters.storage && product.storage !== filters.storage) return false
    if (filters.color && product.color !== filters.color) return false
    if (filters.condition && product.condition !== filters.condition) return false
    if (filters.unitType && product.unitType !== filters.unitType) return false
    if (filters.warrantyType && product.warranty.type !== filters.warrantyType) return false
    if (filters.priceMin > 0 && product.price < filters.priceMin) return false
    if (filters.priceMax > 0 && product.price > filters.priceMax) return false

    if (filters.readyOnly) {
      if (filters.branch) {
        if (!hasStockInBranch(product.stock, filters.branch)) return false
      } else if (product.stock.gresik === 0 && product.stock.tuban === 0) {
        return false
      }
    }

    return true
  })
}

function hasAnyStockOther(product: Product, branch: FilterState['branch']): boolean {
  if (!branch) return product.stock.gresik > 0 || product.stock.tuban > 0
  const other = branch === 'gresik' ? 'tuban' : 'gresik'
  return product.stock[other] > 0
}

export type SortOption = 'harga-asc' | 'harga-desc' | 'nama-asc' | 'nama-desc'

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products]
  switch (sort) {
    case 'harga-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'harga-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'nama-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case 'nama-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name))
    default:
      return sorted
  }
}

export function countActiveFilters(filters: FilterState): number {
  let count = 0
  if (filters.model) count++
  if (filters.storage) count++
  if (filters.color) count++
  if (filters.condition) count++
  if (filters.unitType) count++
  if (filters.warrantyType) count++
  if (filters.branch) count++
  if (filters.readyOnly) count++
  if (filters.priceMin > 0) count++
  if (filters.priceMax > 0) count++
  return count
}

export function hasActiveFilters(filters: FilterState): boolean {
  return countActiveFilters(filters) > 0
}

export interface FilterChip {
  key: keyof FilterState
  label: string
  value: string | boolean
}

export function getActiveFilterChips(filters: FilterState): FilterChip[] {
  const chips: FilterChip[] = []
  if (filters.model) chips.push({ key: 'model', label: 'Model', value: filters.model })
  if (filters.storage) chips.push({ key: 'storage', label: 'Storage', value: filters.storage })
  if (filters.color) chips.push({ key: 'color', label: 'Warna', value: filters.color })
  if (filters.condition) chips.push({ key: 'condition', label: 'Kondisi', value: filters.condition })
  if (filters.unitType) chips.push({ key: 'unitType', label: 'Tipe', value: filters.unitType })
  if (filters.warrantyType) chips.push({ key: 'warrantyType', label: 'Garansi', value: filters.warrantyType })
  if (filters.branch) chips.push({ key: 'branch', label: 'Cabang', value: filters.branch === 'gresik' ? 'Gresik' : 'Tuban' })
  if (filters.readyOnly) chips.push({ key: 'readyOnly', label: 'Ready stock', value: true })
  if (filters.priceMin > 0) chips.push({ key: 'priceMin', label: 'Min', value: String(filters.priceMin) })
  if (filters.priceMax > 0) chips.push({ key: 'priceMax', label: 'Max', value: String(filters.priceMax) })
  return chips
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatPriceShort(price: number): string {
  if (price >= 1_000_000) {
    return `${(price / 1_000_000).toFixed(1).replace('.', ',')} Jt`
  }
  if (price >= 1_000) {
    return `${(price / 1_000).toFixed(0)} Rb`
  }
  return formatPrice(price)
}

export function formatDateLabel(value?: string, fallback = 'Menunggu update stok'): string {
  if (!value) return fallback

  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value
  const parsed = new Date(normalized)

  if (Number.isNaN(parsed.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parsed)
}
