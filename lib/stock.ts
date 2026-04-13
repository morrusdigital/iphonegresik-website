import { BranchKey, StockPerBranch, StockStatus } from "@/types/products"

export function getStockStatus(qty: number): StockStatus {
  if (qty >= 3) return 'Ready'
  if (qty >= 1) return 'terbatas'
  return 'indent'
}

/** Ambil status stok untuk cabang tertentu */
export function getStockStatusByBranch(
  stock: StockPerBranch,
  branch: BranchKey
): StockStatus {
  return getStockStatus(stock[branch])
}

/** Ambil status stok semua cabang sekaligus */
export function getAllStockStatuses(stock: StockPerBranch): Record<BranchKey, StockStatus> {
  return {
    gresik: getStockStatus(stock.gresik),
    tuban: getStockStatus(stock.tuban),
  }
}


export type StockBadgeVariant = 'success' | 'warning' | 'danger'

export function getStockBadgeVariant(status: StockStatus): StockBadgeVariant {
  switch (status) {
    case 'Ready':    return 'success'
    case 'terbatas': return 'warning'
    case 'indent':   return 'danger'
  }
}

/** Helper gabungan — langsung dari qty ke variant badge */
export function getStockBadgeVariantFromQty(qty: number): StockBadgeVariant {
  return getStockBadgeVariant(getStockStatus(qty))
}