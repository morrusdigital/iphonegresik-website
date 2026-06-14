import type {
  BranchKey,
  Category,
  CompletenessType,
  Condition,
  UnitType,
  WarrantyType,
} from '@/types/products'

export interface StorefrontApiWarranty {
  type: WarrantyType
  until?: string
  note?: string
}

export interface StorefrontApiCompleteness {
  type: CompletenessType
  minusNote?: string
}

export interface StorefrontApiProduct {
  id: string
  product_code: string
  slug: string
  name: string
  category: Category
  model: string
  storage: string
  color: string
  condition: Condition
  unitType: UnitType
  price: number
  image?: string | null
  images?: string[]
  stock: Record<BranchKey, number>
  warranty: StorefrontApiWarranty
  batteryHealth?: number | null
  region?: string | null
  completeness: StorefrontApiCompleteness
  updatedAt?: string | null
}

export interface StorefrontApiResponse<T> {
  data: T
}
