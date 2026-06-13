import { getStockBadgeVariant, getStockLabel, getStockStatus } from '@/lib/stock'
import { clsx } from 'clsx'

interface StockBadgeProps {
  qty: number
  size?: 'sm' | 'md'
}

const variantStyles = {
  success: 'bg-green-100 text-green-800 border border-green-200',
  warning: 'bg-amber-100 text-amber-800 border border-amber-200',
  danger: 'bg-red-100 text-red-700 border border-red-200',
  muted: 'bg-gray-100 text-gray-500 border border-gray-200',
}

const dotStyles = {
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-400',
  muted: 'bg-gray-400',
}

export default function StockBadge({ qty, size = 'md' }: StockBadgeProps) {
  const label = getStockLabel(qty)
  const variant = getStockBadgeVariant(getStockStatus(qty))

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full font-semibold',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs',
        variantStyles[variant]
      )}
    >
      <span className={clsx('h-1.5 w-1.5 rounded-full', dotStyles[variant])} />
      {label}
    </span>
  )
}
