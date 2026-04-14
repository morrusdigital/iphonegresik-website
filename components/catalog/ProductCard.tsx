import Image from 'next/image'
import { getStockStatus } from '@/lib/stock'
import { getProductWALinkByBranch } from '@/lib/whatsapp'
import { formatPrice } from '@/lib/filters'
import StockBadge from '@/components/catalog/StockBadge'
import { clsx } from 'clsx'
import { BranchKey, Product } from '@/types/products'
import WhatsAppButton from '../ui/WhatsAppButton'

interface ProductCardProps {
  product: Product
  activeBranchKey?: BranchKey
}

export default function ProductCard({ product, activeBranchKey }: ProductCardProps) {
  const branches: BranchKey[] = activeBranchKey ? [activeBranchKey] : ['gresik', 'tuban']
  const branchLabels: Record<BranchKey, string> = { gresik: 'Gresik', tuban: 'Tuban' }

  return (
    <article className={clsx(
      'group flex flex-col bg-white rounded-[20px] border-[1.5px] border-gray-100 overflow-hidden',
      'transition-all duration-250 hover:border-blue-200 hover:-translate-y-1',
      'hover:shadow-[0_16px_40px_rgba(59,130,246,0.1)]'
    )}>
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#f8faff] to-[#f0f4ff]">
        <Image
          src={product.image} alt={product.name} fill
          sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
          className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        />
        <span className={clsx(
          'absolute top-2.5 left-2.5 rounded-[7px] px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[.08em]',
          product.condition === 'baru' ? 'bg-blue-600 text-white' : 'bg-amber-500 text-white'
        )}>
          {product.condition === 'baru' ? 'Baru' : 'Second'}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-[14px] gap-2.5">
        <div>
          <h3 className="text-[13px] font-extrabold text-gray-900 leading-tight">{product.name}</h3>
          <p className="text-[10px] font-semibold text-gray-400 mt-0.5">
            {product.storage !== '-' ? `${product.storage} · ` : ''}{product.color}
          </p>
        </div>

        <p className="text-[16px] font-black text-gray-950 tracking-[-0.5px]">
          {formatPrice(product.price)}
        </p>

        <div className="flex flex-col gap-1">
          {branches.map(branchKey => (
            <div key={branchKey} className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400">{branchLabels[branchKey]}</span>
              <StockBadge status={getStockStatus(product.stock[branchKey])} qty={product.stock[branchKey]} size="sm" />
            </div>
          ))}
        </div>

        <div className="flex-1" />

        <div className="flex flex-col gap-1.5 mt-1">
          {branches.map(branchKey => {
            const waLink = getProductWALinkByBranch(product, branchKey)
            const status = getStockStatus(product.stock[branchKey])
            return (
              <WhatsAppButton key={branchKey} link={waLink} size="sm"
                variant={status === 'indent' ? 'outline' : 'solid'} className="w-full" />
            )
          })}
        </div>
      </div>
    </article>
  )
}