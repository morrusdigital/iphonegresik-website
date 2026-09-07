export type Category = 'iphone' | 'ipad' | 'macbook' | 'accessories'
export type StockStatus = 'ready-sekarang' | 'tersisa-2' | 'tersisa-1' | 'kosong'
export type Condition = 'baru' | 'second'
export type BranchKey = 'gresik' | 'tuban'

export type UnitType = 'baru' | 'like-new' | 'second' | 'ex-inter' | 'ibox'
export type WarrantyType = 'resmi' | 'toko' | 'none'
export type CompletenessType = 'fullset' | 'box' | 'unit-only'
export type ProductBadge = 'terlaris' | 'baru-masuk' | 'promo' | 'stok-menipis'

export interface ProductWarranty {
  type: WarrantyType
  until?: string
  note?: string
}

export interface ProductCompleteness {
  type: CompletenessType
  minusNote?: string
}

export interface ProductCommercial {
  tradeInAvailable: boolean
  installmentAvailable: boolean
  promoLabel?: string
}

export interface ProductFAQ {
  q: string
  a: string
}

export interface StockPerBranch {
  gresik: number
  tuban: number
}

export interface Product {
  id: string
  sku: string
  name: string
  slug: string
  category: Category
  model: string
  storage: string
  color: string
  condition: Condition
  unitType: UnitType
  price: number
  image: string
  images: string[]
  specs: string
  description?: string
  stock: StockPerBranch
  warranty: ProductWarranty
  region?: string
  batteryHealth?: number
  completeness: ProductCompleteness
  badges: ProductBadge[]
  commercial: ProductCommercial
  faq: ProductFAQ[]
  updatedAt: string
  featured?: boolean
}

export interface FilterState {
  query: string
  model: string
  storage: string
  color: string
  condition: string
  unitType: string
  warrantyType: string
  branch: '' | BranchKey
  readyOnly: boolean
  priceMin: number
  priceMax: number
}

export const DEFAULT_FILTER_STATE: FilterState = {
  query: '',
  model: '',
  storage: '',
  color: '',
  condition: '',
  unitType: '',
  warrantyType: '',
  branch: '',
  readyOnly: false,
  priceMin: 0,
  priceMax: 0,
}

export interface FilterOptions {
  models: string[]
  storages: string[]
  colors: string[]
  conditions: Condition[]
  unitTypes: UnitType[]
  warrantyTypes: WarrantyType[]
}
