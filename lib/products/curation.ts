import { hasRealPhoto } from '@/lib/products/enrich'
import { getTotalStock } from '@/lib/stock'
import type { Product } from '@/types/products'

/**
 * Pilihan produk untuk beranda.
 *
 * Label manual ("terlaris" / "baru-masuk" lewat data/product-marketing.ts) selalu diutamakan.
 * Kalau label itu belum ada (data POS tidak mengirimkannya), beranda tetap terisi dengan
 * iPhone ready stock yang punya foto asli, supaya tidak menampilkan aksesoris tanpa foto.
 */
export interface HomeCuration {
  hero?: Product
  featured: Product[]
  featuredIsManual: boolean
  newArrivals: Product[]
}

const SECTION_SIZE = 4

function isShowcaseReady(product: Product): boolean {
  return hasRealPhoto(product) && getTotalStock(product.stock) > 0
}

function byNewest(a: Product, b: Product): number {
  return (b.updatedAt ?? '').localeCompare(a.updatedAt ?? '') || b.price - a.price
}

/** Unit baru dulu, lalu harga tertinggi (seri terbaru biasanya paling mahal), lalu yang terbaru di-update. */
function byShowcase(a: Product, b: Product): number {
  const aNew = a.condition === 'baru' ? 0 : 1
  const bNew = b.condition === 'baru' ? 0 : 1
  return aNew - bNew || b.price - a.price || byNewest(a, b)
}

/** Satu produk per model, supaya bagian beranda tidak berisi 4 varian dari HP yang sama. */
function uniqueByModel(products: Product[]): Product[] {
  const seen = new Set<string>()
  return products.filter((product) => {
    const key = product.model.trim().toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export function curateHome(products: Product[]): HomeCuration {
  const manualFeatured = products.filter((p) => p.badges.includes('terlaris')).slice(0, SECTION_SIZE)
  const manualNew = products.filter((p) => p.badges.includes('baru-masuk')).slice(0, SECTION_SIZE)

  const showcase = products.filter(isShowcaseReady)
  const iphones = showcase.filter((p) => p.category === 'iphone')
  const pool = iphones.length > 0 ? iphones : showcase

  const featuredIsManual = manualFeatured.length > 0
  const featured = featuredIsManual
    ? manualFeatured
    : uniqueByModel([...pool].sort(byShowcase)).slice(0, SECTION_SIZE)

  const featuredIds = new Set(featured.map((p) => p.id))
  const newArrivals =
    manualNew.length > 0
      ? manualNew
      : uniqueByModel(
          showcase.filter((p) => !featuredIds.has(p.id) && p.category !== 'accessories').sort(byNewest)
        ).slice(0, SECTION_SIZE)

  const hero = featured[0] ?? [...showcase].sort(byShowcase)[0] ?? products[0]

  return { hero, featured, featuredIsManual, newArrivals }
}
