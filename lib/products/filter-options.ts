import type { FilterOptions, Product } from '@/types/products'

export function buildFilterOptions(products: Product[]): FilterOptions {
  return {
    models: [...new Set(products.map((product) => product.model))].sort(),
    storages: [...new Set(products.map((product) => product.storage))].sort(),
    colors: [...new Set(products.map((product) => product.color))].sort(),
    conditions: [...new Set(products.map((product) => product.condition))],
    unitTypes: [...new Set(products.map((product) => product.unitType))],
    warrantyTypes: [...new Set(products.map((product) => product.warranty.type))],
  }
}
