import { FilterState, Product } from "@/types/products"


export function filterProducts(
  products: Product[],
  filters: FilterState
): Product[] {
  return products.filter((product) => {
    // Filter model
    if (filters.model && product.model !== filters.model) return false

    // Filter storage
    if (filters.storage && product.storage !== filters.storage) return false

    // Filter warna
    if (filters.color && product.color !== filters.color) return false

    // Filter kondisi
    if (filters.condition && product.condition !== filters.condition) return false

    // Filter harga minimum
    if (filters.priceMin > 0 && product.price < filters.priceMin) return false

    // Filter harga maksimum
    if (filters.priceMax > 0 && product.price > filters.priceMax) return false

    return true
  })
}


export type SortOption =
  | 'harga-asc'
  | 'harga-desc'
  | 'nama-asc'
  | 'nama-desc'

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products] // jangan mutate array asli
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
  if (filters.model)     count++
  if (filters.storage)   count++
  if (filters.color)     count++
  if (filters.condition) count++
  if (filters.priceMin > 0) count++
  if (filters.priceMax > 0) count++
  return count
}

export function hasActiveFilters(filters: FilterState): boolean {
  return countActiveFilters(filters) > 0
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