import { BranchKey, StockPerBranch, StockStatus } from '@/types/products'

export const STOCK_STATUS_LABELS: Record<StockStatus, string> = {
  'ready-sekarang': 'Ready sekarang',
  'tersisa-2': 'Tersisa 2',
  'tersisa-1': 'Tersisa 1',
  kosong: 'Kosong',
}

export function getStockStatus(qty: number): StockStatus {
  if (qty >= 3) return 'ready-sekarang'
  if (qty === 2) return 'tersisa-2'
  if (qty === 1) return 'tersisa-1'
  return 'kosong'
}

export function getStockLabel(qty: number): string {
  return STOCK_STATUS_LABELS[getStockStatus(qty)]
}

export function getStockStatusByBranch(
  stock: StockPerBranch,
  branch: BranchKey
): StockStatus {
  return getStockStatus(stock[branch])
}

export function getAllStockStatuses(stock: StockPerBranch): Record<BranchKey, StockStatus> {
  return {
    gresik: getStockStatus(stock.gresik),
    tuban: getStockStatus(stock.tuban),
  }
}

export function hasStockInBranch(stock: StockPerBranch, branch: BranchKey): boolean {
  return stock[branch] > 0
}

export function hasAnyStock(stock: StockPerBranch): boolean {
  return stock.gresik > 0 || stock.tuban > 0
}

export function getTotalStock(stock: StockPerBranch): number {
  return stock.gresik + stock.tuban
}

export type StockBadgeVariant = 'success' | 'warning' | 'danger' | 'muted'

export function getStockBadgeVariant(status: StockStatus): StockBadgeVariant {
  switch (status) {
    case 'ready-sekarang':
      return 'success'
    case 'tersisa-2':
      return 'warning'
    case 'tersisa-1':
      return 'warning'
    case 'kosong':
      return 'muted'
  }
}

export function getStockBadgeVariantFromQty(qty: number): StockBadgeVariant {
  return getStockBadgeVariant(getStockStatus(qty))
}
