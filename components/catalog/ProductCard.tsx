'use client'

import Image from 'next/image'
import Link from 'next/link'
import { getProductWALink } from '@/lib/whatsapp'
import { formatPrice } from '@/lib/filters'
import { hasStockInBranch } from '@/lib/stock'
import ProductBadges from '@/components/catalog/ProductBadges'
import ProductMetaRow from '@/components/catalog/ProductMetaRow'
import { formatVariant } from '@/lib/product-meta'
import { clsx } from 'clsx'
import { BranchKey, Product } from '@/types/products'

interface ProductCardProps {
  product: Product
  activeBranchKey?: BranchKey
}

const branchLabels: Record<BranchKey, string> = { gresik: 'Gresik', tuban: 'Tuban' }

export default function ProductCard({ product, activeBranchKey }: ProductCardProps) {
  const branches: BranchKey[] = activeBranchKey ? [activeBranchKey] : ['gresik', 'tuban']
  const availableBranches = branches.filter((branchKey) => hasStockInBranch(product.stock, branchKey))
  const primaryBranch = availableBranches[0]

  return (
    <article
      className={clsx(
        'group flex h-full flex-col overflow-hidden rounded-[24px] border border-gray-200 bg-white',
        'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(0,0,0,0.06)]'
      )}
    >
      <Link
        href={`/produk/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-[#f5f5f7]"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        />
        <div className="absolute left-4 top-4 right-4 flex items-start justify-between gap-2">
          <ProductBadges badges={product.badges} />
          {product.commercial.promoLabel && (
            <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em] text-[#0071e3] shadow-sm">
              Promo
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <Link href={`/produk/${product.slug}`} className="block">
          {product.model.trim().toLowerCase() !== product.name.trim().toLowerCase() && (
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
              {product.model}
            </p>
          )}
          <h3 className="text-[17px] sm:text-[20px] font-semibold leading-tight tracking-[-0.03em] text-gray-950">
            {product.name}
          </h3>
          {formatVariant(product) && (
            <p className="mt-2 text-[13px] leading-6 text-gray-500">{formatVariant(product)}</p>
          )}
        </Link>

        <div className="mt-4">
          <p className="whitespace-nowrap text-[17px] font-semibold tracking-[-0.03em] text-gray-950 sm:text-[24px]">
            {formatPrice(product.price)}
          </p>
          {(product.commercial.installmentAvailable || product.commercial.tradeInAvailable) && (
            <p className="mt-2 text-[11px] leading-5 text-gray-500 sm:text-[12px]">
              {product.commercial.installmentAvailable ? 'Cicilan tersedia' : ' '}
              {product.commercial.installmentAvailable && product.commercial.tradeInAvailable ? ' · ' : ''}
              {product.commercial.tradeInAvailable ? 'Trade-in tersedia' : ''}
            </p>
          )}
        </div>

        <div className="mt-3 rounded-[20px] bg-[#f5f5f7] p-2.5 sm:mt-4 sm:p-3">
          <div className="flex flex-wrap gap-2">
            {branches.map((branchKey) => {
              const qty = product.stock[branchKey]
              const inStock = qty > 0

              return (
                <span
                  key={branchKey}
                  className={clsx(
                    'inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold sm:px-3 sm:text-[11px]',
                    inStock ? 'bg-white text-gray-900' : 'bg-gray-200 text-gray-500'
                  )}
                >
                  {branchLabels[branchKey]} {inStock ? `· ${qty} unit` : '· kosong'}
                </span>
              )
            })}
          </div>

          {/* Detail garansi & kelengkapan disembunyikan di HP agar kartu tidak terlalu panjang; tetap ada di halaman detail. */}
          <div className="mt-3 hidden sm:block">
            <ProductMetaRow product={product} compact />
          </div>
        </div>

        <div className="flex-1" />

        <div className="mt-4 flex flex-col gap-2 sm:mt-5">
          <Link
            href={`/produk/${product.slug}`}
            className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full bg-[#0071e3] px-3 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#005ecb] sm:px-4 sm:py-3 sm:text-[13px]"
          >
            <span className="sm:hidden">Lihat detail</span>
            <span className="hidden sm:inline">Cek detail produk</span>
          </Link>

          <div className="grid gap-2">
            {availableBranches.length > 0 ? (
              availableBranches.map((branchKey) => {
                const link = getProductWALink(product, branchKey, 'buy')
                return (
                  <a
                    key={branchKey}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-gray-300 px-3 py-2 text-[11px] font-semibold text-gray-900 transition-colors hover:bg-gray-50 sm:px-4 sm:py-2.5 sm:text-[12px]"
                  >
                    Pesan via {branchLabels[branchKey]}
                  </a>
                )
              })
            ) : (
              <a
                href={getProductWALink(product, primaryBranch ?? 'gresik', 'general').url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-gray-300 px-3 py-2 text-[11px] font-semibold text-gray-900 transition-colors hover:bg-gray-50 sm:px-4 sm:py-2.5 sm:text-[12px]"
              >
                Tanya ketersediaan
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
