import Image from 'next/image'
import { getStockStatus } from '@/lib/stock'
import { getProductWALinkByBranch } from '@/lib/whatsapp'
import { formatPrice } from '@/lib/filters'
import StockBadge from '@/components/catalog/StockBadge'
import { clsx } from 'clsx'
import { BranchKey, Product } from '@/types/products'
import WhatsAppButton from '../ui/WhatsAppButton'

// ============================================================
// ProductCard
// Kartu produk lengkap: foto, nama, spek, stok, WA CTA
// ============================================================

interface ProductCardProps {
  product: Product
  activeBranchKey?: BranchKey  // kalau undefined, tampilkan semua cabang
}

export default function ProductCard({
  product,
  activeBranchKey,
}: ProductCardProps) {
  const branches: BranchKey[] = activeBranchKey
    ? [activeBranchKey]
    : ['gresik', 'tuban']

  const branchLabels: Record<BranchKey, string> = {
    gresik: 'Gresik',
    tuban: 'Tuban',
  }

  return (
    <article className={clsx(
      'group flex flex-col rounded-2xl border border-gray-200 bg-white',
      'overflow-hidden transition-shadow duration-200 hover:shadow-md'
    )}>
      {/* Foto produk */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        />

        {/* Badge kondisi */}
        <span className={clsx(
          'absolute left-2 top-2 rounded-full px-2 py-0.5 text-xs font-medium',
          product.condition === 'baru'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-orange-100 text-orange-800'
        )}>
          {product.condition === 'baru' ? 'Baru' : 'Second'}
        </span>
      </div>

      {/* Konten */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Nama + storage */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 leading-snug">
            {product.name}
          </h3>
          <p className="mt-0.5 text-xs text-gray-500">
            {product.storage !== '-' ? `${product.storage} · ` : ''}{product.color}
          </p>
        </div>

        {/* Harga */}
        <p className="text-base font-bold text-gray-900">
          {formatPrice(product.price)}
        </p>

        {/* Status stok per cabang */}
        <div className="flex flex-col gap-1.5">
          {branches.map((branchKey) => (
            <div key={branchKey} className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{branchLabels[branchKey]}</span>
              <StockBadge
                status={getStockStatus(product.stock[branchKey])}
                qty={product.stock[branchKey]}
                size="sm"
              />
            </div>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* WhatsApp CTA buttons */}
        <div className="flex flex-col gap-2">
          {branches.map((branchKey) => {
            const waLink = getProductWALinkByBranch(product, branchKey)
            const stockStatus = getStockStatus(product.stock[branchKey])
            return (
              <WhatsAppButton
                key={branchKey}
                link={waLink}
                size="sm"
                variant={stockStatus === 'indent' ? 'outline' : 'solid'}
                className="w-full"
              />
            )
          })}
        </div>
      </div>
    </article>
  )
}