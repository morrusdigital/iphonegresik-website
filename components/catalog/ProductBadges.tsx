import { BADGE_LABELS } from '@/lib/product-meta'
import type { ProductBadge } from '@/types/products'
import { clsx } from 'clsx'

const BADGE_STYLES: Record<ProductBadge, string> = {
  terlaris: 'bg-gray-900 text-white',
  'baru-masuk': 'bg-blue-600 text-white',
  promo: 'bg-red-500 text-white',
  'stok-menipis': 'bg-amber-500 text-white',
}

interface ProductBadgesProps {
  badges: ProductBadge[]
  className?: string
}

export default function ProductBadges({ badges, className }: ProductBadgesProps) {
  if (badges.length === 0) return null

  return (
    <div className={clsx('flex flex-wrap gap-1', className)}>
      {badges.slice(0, 2).map((badge) => (
        <span
          key={badge}
          className={clsx(
            'rounded-[6px] px-2 py-0.5 text-[9px] font-black uppercase tracking-[.06em]',
            BADGE_STYLES[badge]
          )}
        >
          {BADGE_LABELS[badge]}
        </span>
      ))}
    </div>
  )
}
