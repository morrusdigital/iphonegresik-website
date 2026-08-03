import 'server-only'

import { PRODUCTS, getProductBySlug, getProductsByCategory } from '@/data/products'
import { getProductMarketingOverride } from '@/data/product-marketing'
import { buildFilterOptions } from '@/lib/products/filter-options'
import { enrichProduct, type ProductSeed } from '@/lib/products/enrich'
import type { Category, FilterOptions, Product } from '@/types/products'
import type {
  StorefrontApiProduct,
  StorefrontApiResponse,
} from '@/types/storefront-api'

const STOREFRONT_REVALIDATE_SECONDS = 60
let hasWarnedMissingConfig = false
let hasWarnedStorefrontUnavailable = false

function hasStorefrontConfig(): boolean {
  return Boolean(process.env.LARAVEL_POS_API_URL && process.env.LARAVEL_POS_API_TOKEN)
}

function warnMissingStorefrontConfig() {
  if (hasWarnedMissingConfig) return
  hasWarnedMissingConfig = true
  console.warn(
    'LARAVEL_POS_API_URL atau LARAVEL_POS_API_TOKEN belum di-set. Katalog masih memakai data fallback statis.'
  )
}

function warnStorefrontUnavailable(error: unknown) {
  if (hasWarnedStorefrontUnavailable) return
  hasWarnedStorefrontUnavailable = true
  console.warn(
    'Storefront API tidak bisa diakses. Katalog sementara memakai data fallback statis.',
    error
  )
}

function getStorefrontBaseUrl(): string {
  return process.env.LARAVEL_POS_API_URL?.replace(/\/$/, '') ?? ''
}

async function fetchStorefront<T>(
  path: string,
  query?: Record<string, string | undefined>
): Promise<T> {
  const url = new URL(`${getStorefrontBaseUrl()}${path}`)

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value)
  })

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.LARAVEL_POS_API_TOKEN}`,
    },
    next: {
      revalidate: STOREFRONT_REVALIDATE_SECONDS,
    },
  })

  if (response.status === 404) {
    throw new Error('NOT_FOUND')
  }

  if (!response.ok) {
    throw new Error(`Storefront API error: ${response.status}`)
  }

  return response.json() as Promise<T>
}

function buildSpecs(raw: StorefrontApiProduct): string {
  const conditionLabel = raw.condition === 'baru' ? 'Baru' : 'Second'

  return [raw.model, raw.storage !== '-' ? raw.storage : null, raw.color !== '-' ? raw.color : null, conditionLabel]
    .filter(Boolean)
    .join(', ')
}

function buildImages(raw: StorefrontApiProduct, fallbackImages: string[]): string[] {
  const candidates = [...(raw.images ?? [])]

  if (raw.image) {
    candidates.unshift(raw.image)
  }

  const normalized = [...new Set(candidates.filter(Boolean))]
  return normalized.length > 0 ? normalized : fallbackImages
}

function mapStorefrontProduct(raw: StorefrontApiProduct): Product {
  const seed: ProductSeed = {
    id: raw.id,
    sku: raw.product_code,
    name: raw.name,
    slug: raw.slug,
    category: raw.category,
    model: raw.model,
    storage: raw.storage,
    color: raw.color,
    condition: raw.condition,
    unitType: raw.unitType,
    price: raw.price,
    specs: buildSpecs(raw),
    stock: raw.stock,
    warranty: raw.warranty,
    region: raw.region ?? undefined,
    batteryHealth: raw.batteryHealth ?? undefined,
    completeness: raw.completeness,
    updatedAt: raw.updatedAt ?? undefined,
  }

  const baseProduct = enrichProduct(seed)
  const marketing = getProductMarketingOverride(raw.product_code)
  const image = marketing?.image ?? raw.image ?? baseProduct.image
  const images = marketing?.images?.length
    ? marketing.images
    : buildImages(raw, image === baseProduct.image ? baseProduct.images : [image])

  return {
    ...baseProduct,
    image,
    images,
    badges: marketing?.badges ?? baseProduct.badges,
    commercial: {
      ...baseProduct.commercial,
      ...marketing?.commercial,
    },
    description: marketing?.description ?? baseProduct.description,
    faq: marketing?.faq ?? baseProduct.faq,
    featured: marketing?.featured ?? baseProduct.featured,
  }
}

async function getProductsFromStorefront(
  query?: Record<string, string | undefined>
): Promise<Product[]> {
  const response = await fetchStorefront<StorefrontApiResponse<StorefrontApiProduct[]>>(
    '/storefront/products',
    query
  )

  return response.data.map(mapStorefrontProduct)
}

export async function getProducts(): Promise<Product[]> {
  if (!hasStorefrontConfig()) {
    warnMissingStorefrontConfig()
    return PRODUCTS
  }

  try {
    return await getProductsFromStorefront()
  } catch (error) {
    warnStorefrontUnavailable(error)
    return PRODUCTS
  }
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  if (!hasStorefrontConfig()) {
    warnMissingStorefrontConfig()
    return getProductBySlug(slug)
  }

  try {
    const response = await fetchStorefront<StorefrontApiResponse<StorefrontApiProduct>>(
      `/storefront/products/${encodeURIComponent(slug)}`
    )

    return mapStorefrontProduct(response.data)
  } catch (error) {
    if (error instanceof Error && error.message === 'NOT_FOUND') {
      return undefined
    }

    warnStorefrontUnavailable(error)
    return getProductBySlug(slug)
  }
}

export async function getProductsForCategory(category: Category): Promise<Product[]> {
  if (!hasStorefrontConfig()) {
    warnMissingStorefrontConfig()
    return getProductsByCategory(category)
  }

  try {
    return await getProductsFromStorefront({ category })
  } catch (error) {
    warnStorefrontUnavailable(error)
    return getProductsByCategory(category)
  }
}

export async function getRelatedProducts(
  currentProduct: Product,
  limit = 4
): Promise<Product[]> {
  const products = await getProductsForCategory(currentProduct.category)

  return products
    .filter(
      (product) =>
        product.slug !== currentProduct.slug &&
        (product.stock.gresik > 0 || product.stock.tuban > 0)
    )
    .slice(0, limit)
}

export function getProductsSync(): Product[] {
  return PRODUCTS
}

export function getFilterOptionsSync(products?: Product[]): FilterOptions {
  return buildFilterOptions(products ?? PRODUCTS)
}

export { getProductBySlug, getProductsByCategory }
