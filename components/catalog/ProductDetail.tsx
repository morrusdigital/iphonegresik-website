'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { BRANCHES } from '@/data/branches'
import { formatDateLabel, formatPrice } from '@/lib/filters'
import { formatWarrantyShort, formatCompletenessShort, UNIT_TYPE_LABELS } from '@/lib/product-meta'
import { getStockLabel, hasStockInBranch } from '@/lib/stock'
import { getProductWALink } from '@/lib/whatsapp'
import ProductBadges from '@/components/catalog/ProductBadges'
import ProductCard from '@/components/catalog/ProductCard'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import type { BranchKey, Product } from '@/types/products'
import { clsx } from 'clsx'

interface ProductDetailProps {
  product: Product
  similarProducts?: Product[]
}

export default function ProductDetail({
  product,
  similarProducts = [],
}: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [branchKey, setBranchKey] = useState<BranchKey>('gresik')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)

  const activeImageSrc = product.images[activeImage] ?? product.image

  const showVideo =
    product.condition === 'second' ||
    product.unitType === 'second' ||
    product.unitType === 'like-new'

  useEffect(() => {
    if (!isZoomOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsZoomOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isZoomOpen])

  const openZoom = () => {
    setZoomLevel(1)
    setIsZoomOpen(true)
  }

  return (
    <div className="space-y-10">
      <nav className="text-sm text-gray-500">
        <Link href="/katalog" className="hover:text-gray-900">
          Katalog
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="space-y-3">
          <button
            type="button"
            onClick={openZoom}
            className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#f8faff] to-[#f0f4ff] text-left"
            aria-label={`Perbesar gambar ${product.name}`}
          >
            <Image
              src={activeImageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-8 transition-transform duration-300 group-hover:scale-[1.03]"
              priority
            />
            <span className="absolute bottom-4 right-4 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-bold text-gray-800 shadow-sm ring-1 ring-gray-200 backdrop-blur">
              Klik untuk zoom
            </span>
          </button>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={clsx(
                    'relative h-16 w-16 rounded-lg overflow-hidden border-2',
                    activeImage === i ? 'border-blue-500' : 'border-gray-100'
                  )}
                >
                  <Image src={img} alt="" fill className="object-contain p-1" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-5">
          <ProductBadges badges={product.badges} />
          <div>
            <h1 className="text-2xl font-black text-gray-950 tracking-tight">{product.name}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {product.storage !== '-' ? `${product.storage} · ` : ''}
              {product.color} · SKU {product.sku}
            </p>
          </div>

          <p className="text-3xl font-black text-gray-950">{formatPrice(product.price)}</p>
          {product.commercial.promoLabel && (
            <p className="text-sm font-bold text-red-600">{product.commercial.promoLabel}</p>
          )}

          <dl className="grid grid-cols-1 gap-2 text-sm">
            <DetailRow label="Tipe unit" value={UNIT_TYPE_LABELS[product.unitType]} />
            <DetailRow label="Garansi" value={formatWarrantyShort(product)} />
            <DetailRow label="Kelengkapan" value={formatCompletenessShort(product)} />
            {product.batteryHealth != null && (
              <DetailRow label="Battery health" value={`${product.batteryHealth}%`} />
            )}
            <DetailRow label="Update stok" value={formatDateLabel(product.updatedAt)} />
          </dl>

          {product.description && (
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          )}

          <div className="rounded-xl border border-gray-100 p-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Stok per cabang</p>
            {BRANCHES.map((branch) => {
              const qty = product.stock[branch.key]
              return (
                <div key={branch.key} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{branch.city}</span>
                  <span
                    className={clsx(
                      'text-sm font-bold',
                      qty > 0 ? 'text-green-700' : 'text-gray-400'
                    )}
                  >
                    {qty > 0 ? getStockLabel(qty) : 'Kosong'}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-gray-500">Pilih cabang untuk chat</p>
            <div className="flex gap-2">
              {BRANCHES.map((b) => (
                <button
                  key={b.key}
                  type="button"
                  onClick={() => setBranchKey(b.key)}
                  className={clsx(
                    'flex-1 rounded-lg border py-2 text-sm font-bold transition-colors',
                    branchKey === b.key
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  )}
                >
                  {b.city}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {hasStockInBranch(product.stock, branchKey) ? (
              <>
                <WhatsAppButton
                  link={getProductWALink(product, branchKey, 'buy')}
                  size="lg"
                  variant="solid"
                  className="w-full"
                />
                {product.commercial.tradeInAvailable && (
                  <WhatsAppButton
                    link={getProductWALink(product, branchKey, 'trade-in')}
                    size="md"
                    variant="outline"
                    className="w-full"
                  />
                )}
                {product.commercial.installmentAvailable && (
                  <WhatsAppButton
                    link={getProductWALink(product, branchKey, 'installment')}
                    size="md"
                    variant="outline"
                    className="w-full"
                  />
                )}
                {showVideo && (
                  <WhatsAppButton
                    link={getProductWALink(product, branchKey, 'video')}
                    size="md"
                    variant="outline"
                    className="w-full"
                  />
                )}
              </>
            ) : (
              <WhatsAppButton
                link={getProductWALink(product, branchKey, 'general')}
                size="lg"
                variant="outline"
                className="w-full"
              />
            )}
          </div>
        </div>
      </div>

      {product.faq.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">Pertanyaan umum</h2>
          {product.faq.map((item, i) => (
            <div key={item.q} className="rounded-xl border border-gray-100 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-bold text-gray-900 hover:bg-gray-50"
              >
                {item.q}
                <span className="text-gray-400">{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && (
                <p className="px-4 pb-3 text-sm text-gray-600 leading-relaxed">{item.a}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {similarProducts.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Produk serupa</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} activeBranchKey={branchKey} />
            ))}
          </div>
        </section>
      )}

      {isZoomOpen && (
        <ProductImageZoom
          productName={product.name}
          images={product.images.length > 0 ? product.images : [product.image]}
          activeImage={activeImage}
          zoomLevel={zoomLevel}
          onClose={() => setIsZoomOpen(false)}
          onImageChange={(index) => {
            setActiveImage(index)
            setZoomLevel(1)
          }}
          onZoomIn={() => setZoomLevel((current) => Math.min(current + 0.25, 3))}
          onZoomOut={() => setZoomLevel((current) => Math.max(current - 0.25, 1))}
          onResetZoom={() => setZoomLevel(1)}
        />
      )}
    </div>
  )
}

interface ProductImageZoomProps {
  productName: string
  images: string[]
  activeImage: number
  zoomLevel: number
  onClose: () => void
  onImageChange: (index: number) => void
  onZoomIn: () => void
  onZoomOut: () => void
  onResetZoom: () => void
}

function ProductImageZoom({
  productName,
  images,
  activeImage,
  zoomLevel,
  onClose,
  onImageChange,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}: ProductImageZoomProps) {
  const imageSrc = images[activeImage] ?? images[0]

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/95 px-4 py-4 text-white sm:px-6">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out"
        aria-label="Tutup zoom gambar"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <p className="min-w-0 truncate text-sm font-semibold">{productName}</p>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={onZoomOut}
              disabled={zoomLevel <= 1}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-lg font-bold transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Perkecil gambar"
            >
              -
            </button>
            <button
              type="button"
              onClick={onResetZoom}
              className="h-9 rounded-lg bg-white/10 px-3 text-xs font-bold transition-colors hover:bg-white/20"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              type="button"
              onClick={onZoomIn}
              disabled={zoomLevel >= 3}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-lg font-bold transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Perbesar gambar"
            >
              +
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-xl font-bold text-gray-950 transition-colors hover:bg-gray-200"
              aria-label="Tutup zoom gambar"
            >
              ×
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto rounded-xl bg-white/5">
          <div className="flex min-h-full min-w-full items-center justify-center p-4 sm:p-8">
            <div
              className="relative aspect-square shrink-0 transition-[width] duration-200"
              style={{ width: `${zoomLevel * 100}%` }}
            >
              <Image
                src={imageSrc}
                alt={productName}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, index) => (
              <button
                key={`${index}-${img}`}
                type="button"
                onClick={() => onImageChange(index)}
                className={clsx(
                  'relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-white/10',
                  activeImage === index ? 'border-white' : 'border-transparent opacity-70'
                )}
                aria-label={`Lihat gambar ${index + 1}`}
              >
                <Image src={img} alt="" fill sizes="64px" className="object-contain p-1" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-1 border-b border-gray-50">
      <dt className="text-gray-500 shrink-0">{label}</dt>
      <dd className="font-medium text-gray-900 text-right">{value}</dd>
    </div>
  )
}
