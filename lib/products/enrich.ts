import { formatVariant, slugToSku } from '@/lib/product-meta'
import { getTotalStock } from '@/lib/stock'
import type {
  Category,
  Condition,
  Product,
  ProductBadge,
  ProductCommercial,
  ProductCompleteness,
  ProductFAQ,
  ProductWarranty,
  StockPerBranch,
  UnitType,
} from '@/types/products'

/** Dipakai bila produk belum punya foto asli dari POS. */
export const PLACEHOLDER_IMAGE = '/images/product-placeholder.svg'

/** Harga minimum (Rupiah) agar label "Cicilan tersedia" ditampilkan. */
export const INSTALLMENT_MIN_PRICE = 500_000

export function hasRealPhoto(product: Pick<Product, 'image'>): boolean {
  return Boolean(product.image) && product.image !== PLACEHOLDER_IMAGE
}

export type ProductSeed = {
  id: string
  name: string
  slug: string
  category: Category
  model: string
  storage: string
  color: string
  condition: Condition
  price: number
  specs: string
  stock: StockPerBranch
  sku?: string
  unitType?: UnitType
  region?: string
  batteryHealth?: number
  warranty?: ProductWarranty
  completeness?: ProductCompleteness
  badges?: ProductBadge[]
  commercial?: Partial<ProductCommercial>
  description?: string
  faq?: ProductFAQ[]
  featured?: boolean
  updatedAt?: string
}

const DEFAULT_FAQ: ProductFAQ[] = [
  {
    q: 'Apakah harga di website sama dengan di toko?',
    a: 'Ya. Harga di website adalah acuan resmi. Jika ada perbedaan, admin akan konfirmasi sebelum transaksi.',
  },
  {
    q: 'Bisa pickup di toko atau dikirim?',
    a: 'Bisa pickup di cabang Gresik atau Tuban. Pengiriman luar kota juga tersedia — tanya admin untuk ongkir.',
  },
]

function defaultWarranty(condition: Condition, unitType: UnitType): ProductWarranty {
  if (condition === 'baru' || unitType === 'ibox') {
    return { type: 'resmi', note: 'Garansi resmi Apple Indonesia' }
  }
  return { type: 'toko', note: 'Garansi toko 3 bulan' }
}

function defaultCompleteness(condition: Condition, unitType: UnitType): ProductCompleteness {
  if (condition === 'baru' || unitType === 'ibox') {
    return { type: 'fullset' }
  }
  if (unitType === 'like-new') {
    return { type: 'fullset', minusNote: 'No minus' }
  }
  return { type: 'box', minusNote: 'Cek kelengkapan saat chat' }
}

function defaultCommercial(
  category: Category,
  condition: Condition,
  price: number
): ProductCommercial {
  return {
    // Trade-in hanya untuk perangkat (iPhone/iPad/Mac) baru, bukan aksesoris.
    tradeInAvailable: condition === 'baru' && category !== 'accessories',
    installmentAvailable: price >= INSTALLMENT_MIN_PRICE,
    promoLabel: undefined,
  }
}

export function enrichProduct(seed: ProductSeed): Product {
  const unitType: UnitType =
    seed.unitType ?? (seed.condition === 'baru' ? 'baru' : 'second')
  const image = PLACEHOLDER_IMAGE
  const totalStock = getTotalStock(seed.stock)
  const badges: ProductBadge[] = [...(seed.badges ?? [])]
  // Unit second memang selalu 1 unit, jadi label "stok menipis" hanya bermakna untuk unit baru.
  if (
    seed.condition === 'baru' &&
    totalStock > 0 &&
    totalStock <= 3 &&
    !badges.includes('stok-menipis')
  ) {
    badges.push('stok-menipis')
  }

  const commercial: ProductCommercial = {
    ...defaultCommercial(seed.category, seed.condition, seed.price),
    ...seed.commercial,
  }

  return {
    id: seed.id,
    sku: seed.sku ?? slugToSku(seed.slug),
    name: seed.name,
    slug: seed.slug,
    category: seed.category,
    model: seed.model,
    storage: seed.storage,
    color: seed.color,
    condition: seed.condition,
    unitType,
    price: seed.price,
    image,
    images: [image],
    specs: seed.specs,
    description:
      seed.description ??
      `${[seed.name, formatVariant(seed, ' ')].filter(Boolean).join(' ')} original dengan harga jelas dan layanan admin yang siap membantu pemesanan.`,
    stock: seed.stock,
    warranty: seed.warranty ?? defaultWarranty(seed.condition, unitType),
    region: seed.region ?? (seed.condition === 'baru' ? 'Indonesia (LL/A)' : undefined),
    batteryHealth: seed.batteryHealth,
    completeness: seed.completeness ?? defaultCompleteness(seed.condition, unitType),
    badges,
    commercial,
    faq: seed.faq ?? DEFAULT_FAQ,
    updatedAt: seed.updatedAt ?? new Date().toISOString().slice(0, 10),
    featured: seed.featured,
  }
}

