import Link from 'next/link'
import ProductCard from '@/components/catalog/ProductCard'
import type { Product } from '@/types/products'

interface FeaturedProductsProps {
  products: Product[]
  /** true bila produk dipilih manual (label "terlaris"); false bila dipilih otomatis dari stok. */
  isManualPick?: boolean
}

export default function FeaturedProducts({ products, isManualPick = true }: FeaturedProductsProps) {
  if (products.length === 0) return null

  return (
    <section className="home-section h-full space-y-6 p-6 sm:p-7" id="ready-stock">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="section-eyebrow">Siap dipesan sekarang</span>
          <h2 className="section-title mt-4 text-[2rem] font-bold leading-none sm:text-[2.5rem]">
            {isManualPick ? 'Produk favorit pilihan customer' : 'iPhone ready stock pilihan'}
          </h2>
          <p className="section-copy mt-3 max-w-2xl text-[14px] leading-7">
            {isManualPick
              ? 'Unit yang paling sering ditanyakan dan paling cepat dibeli. Cocok untuk Anda yang ingin langsung fokus ke produk paling laris.'
              : 'Unit yang ready di cabang dengan foto unit asli. Cek detailnya, lalu pesan langsung lewat admin cabang terdekat.'}
          </p>
        </div>
        <Link
          href="/katalog?ready=1"
          className="inline-flex items-center gap-2 self-start rounded-full border border-black/8 bg-white px-4 py-2.5 text-[12px] font-bold text-gray-700 transition-all hover:-translate-y-0.5 hover:text-gray-950"
        >
          Lihat semua ready stock
          <span aria-hidden="true">{'->'}</span>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
