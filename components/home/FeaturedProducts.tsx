import Link from 'next/link'
import { PRODUCTS } from '@/data/products'
import ProductCard from '@/components/catalog/ProductCard'

export default function FeaturedProducts() {
  const featured = PRODUCTS.filter(
    p => p.category === 'iphone' && p.condition === 'baru' && (p.stock.gresik > 0 || p.stock.tuban > 0)
  ).slice(0, 4)

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[.15em] text-blue-500 mb-1">✦ Terlaris minggu ini</p>
          <h2 className="text-[26px] font-black text-gray-950 tracking-tight">Produk Unggulan</h2>
          <p className="text-[13px] text-gray-400 mt-0.5">iPhone terbaru, stok selalu ter-update</p>
        </div>
        <Link href="/katalog"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-gray-200 bg-white text-[12px] font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-all">
          Lihat Semua →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {featured.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}