import { getStockBadgeVariant } from '@/lib/stock'
import { StockStatus } from '@/types/products'
import { clsx } from 'clsx'

// ============================================================
// StockBadge
// Menampilkan status stok: Ready / Terbatas / Indent
// ============================================================

interface StockBadgeProps {
  status: StockStatus
  qty?: number       // opsional, tampilkan angka stok
  size?: 'sm' | 'md'
}

const variantStyles: Record<ReturnType<typeof getStockBadgeVariant>, string> = {
  success: 'bg-green-100 text-green-800 border border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  danger:  'bg-red-100   text-red-700   border border-red-200',
}

const dotStyles: Record<ReturnType<typeof getStockBadgeVariant>, string> = {
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger:  'bg-red-400',
}

export default function StockBadge({ status, qty, size = 'md' }: StockBadgeProps) {
  const variant = getStockBadgeVariant(status)

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs',
        variantStyles[variant]
      )}
    >
      <span className={clsx('h-1.5 w-1.5 rounded-full', dotStyles[variant])} />
      {status}
      {qty !== undefined && (
        <span className="opacity-60">({qty})</span>
      )}
    </span>
  )
}