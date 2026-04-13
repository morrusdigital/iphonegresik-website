import Link from 'next/link'
import { PRODUCTS } from '@/data/products'
import ProductCard from '@/components/catalog/ProductCard'

// ============================================================
// FeaturedProducts
// Produk unggulan di beranda — Server Component
// Ambil 4 produk iPhone baru dengan stok > 0
// ============================================================

export default function FeaturedProducts() {
  const featured = PRODUCTS.filter(
    (p) => p.category === 'iphone' &&
           p.condition === 'baru' &&
           (p.stock.gresik > 0 || p.stock.tuban > 0)
  ).slice(0, 4)

  return (
    <section className="space-y-5">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Produk Unggulan</h2>
          <p className="mt-0.5 text-sm text-gray-500">iPhone terbaru, stok tersedia</p>
        </div>
        <Link
          href="/katalog"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Lihat semua →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}