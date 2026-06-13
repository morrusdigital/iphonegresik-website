import {
  PRODUCTS,
  getFilterOptions,
  getProductBySlug,
  getProductsByCategory,
} from '@/data/products'
import type { Category, FilterOptions, Product } from '@/types/products'

/** Sumber produk — ganti implementasi ini saat API internal siap */
export async function getProducts(): Promise<Product[]> {
  return PRODUCTS
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return getProductBySlug(slug)
}

export async function getProductsForCategory(category: Category): Promise<Product[]> {
  return getProductsByCategory(category)
}

export function getProductsSync(): Product[] {
  return PRODUCTS
}

export function getFilterOptionsSync(products?: Product[]): FilterOptions {
  return getFilterOptions(products)
}

export { getProductBySlug, getProductsByCategory, getFilterOptions }
