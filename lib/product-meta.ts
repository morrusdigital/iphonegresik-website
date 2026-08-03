import type {
  CompletenessType,
  Product,
  ProductBadge,
  UnitType,
  WarrantyType,
} from '@/types/products'
import { getTotalStock } from '@/lib/stock'

export const UNIT_TYPE_LABELS: Record<UnitType, string> = {
  baru: 'Baru',
  'like-new': 'Like New',
  second: 'Second',
  'ex-inter': 'Ex-Inter',
  ibox: 'iBox',
}

export const WARRANTY_LABELS: Record<WarrantyType, string> = {
  resmi: 'Garansi resmi Apple',
  toko: 'Garansi toko',
  none: 'Tanpa garansi',
}

export const COMPLETENESS_LABELS: Record<CompletenessType, string> = {
  fullset: 'Fullset (box + charger + kabel)',
  box: 'Box ori + unit',
  'unit-only': 'Unit saja',
}

export const BADGE_LABELS: Record<ProductBadge, string> = {
  terlaris: 'Terlaris',
  'baru-masuk': 'Baru masuk',
  promo: 'Promo',
  'stok-menipis': 'Stok menipis',
}

export function formatWarrantyShort(product: Product): string {
  const w = product.warranty
  if (w.type === 'resmi') return w.until ? `Garansi resmi s/d ${w.until}` : 'Garansi resmi Apple Indonesia'
  if (w.type === 'toko') return w.note ?? 'Garansi toko'
  return 'Tanpa garansi'
}

export function formatCompletenessShort(product: Product): string {
  const label = COMPLETENESS_LABELS[product.completeness.type]
  if (product.completeness.minusNote) return `${label} · ${product.completeness.minusNote}`
  return label
}

export function getProductMetaLines(product: Product): string[] {
  const lines: string[] = [
    formatWarrantyShort(product),
    UNIT_TYPE_LABELS[product.unitType],
    formatCompletenessShort(product),
  ]
  if (product.batteryHealth != null) lines.push(`Battery health ${product.batteryHealth}%`)
  return lines
}

export function inferBadgesFromStock(product: Product, extra: ProductBadge[] = []): ProductBadge[] {
  const badges = new Set<ProductBadge>([...product.badges, ...extra])
  const total = getTotalStock(product.stock)
  if (total > 0 && total <= 3 && !badges.has('stok-menipis')) {
    badges.add('stok-menipis')
  }
  return [...badges]
}

export function slugToSku(slug: string): string {
  return slug
    .toUpperCase()
    .replace(/GB/g, 'G')
    .replace(/-/g, '-')
    .slice(0, 24)
}
