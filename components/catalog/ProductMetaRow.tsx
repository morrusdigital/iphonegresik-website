import { getProductMetaLines } from '@/lib/product-meta'
import type { Product } from '@/types/products'

interface ProductMetaRowProps {
  product: Product
  compact?: boolean
}

export default function ProductMetaRow({ product, compact }: ProductMetaRowProps) {
  const lines = getProductMetaLines(product)

  return (
    <ul className={compact ? 'space-y-0.5' : 'space-y-1'}>
      {lines.map((line) => (
        <li
          key={line}
          className="flex items-start gap-1.5 text-[10px] font-medium text-gray-500 leading-snug"
        >
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gray-300" aria-hidden />
          {line}
        </li>
      ))}
    </ul>
  )
}
