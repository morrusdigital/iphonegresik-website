import { PRODUCTS } from '@/data/products'
import type { ProductBadge, ProductCommercial, ProductFAQ } from '@/types/products'

export interface ProductMarketingOverride {
  badges?: ProductBadge[]
  commercial?: Partial<ProductCommercial>
  description?: string
  faq?: ProductFAQ[]
  featured?: boolean
  image?: string
  images?: string[]
}

export const PRODUCT_MARKETING_BY_SKU: Record<string, ProductMarketingOverride> =
  Object.fromEntries(
    PRODUCTS.map((product) => [
      product.sku,
      {
        badges: product.badges,
        commercial: product.commercial,
        description: product.description,
        faq: product.faq,
        featured: product.featured,
        image: product.image,
        images: product.images,
      } satisfies ProductMarketingOverride,
    ])
  )

export function getProductMarketingOverride(sku?: string): ProductMarketingOverride | undefined {
  if (!sku) return undefined
  return PRODUCT_MARKETING_BY_SKU[sku]
}
