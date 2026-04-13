import type { Metadata } from 'next'
import { PRODUCTS } from '@/data/products'
import ProductGrid from '@/components/catalog/ProductGrid'

// ============================================================
// Metadata
// ============================================================

export const metadata: Metadata = {
  title: 'Katalog Produk',
  description:
    'Katalog lengkap iPhone, iPad, Mac, dan Aksesoris Apple original. ' +
    'Filter berdasarkan model, storage, warna, kondisi, dan harga.',
}

// ============================================================
// Katalog Page — Server Component
// ProductGrid di dalam adalah Client Component
// ============================================================

export default function KatalogPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Katalog Produk</h1>
        <p className="mt-1 text-sm text-gray-500">
          Semua produk Apple original bergaransi resmi
        </p>
      </div>

      {/* Grid dengan filter — Client Component */}
      <ProductGrid initialProducts={PRODUCTS} />
    </div>
  )
}