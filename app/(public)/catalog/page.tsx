import type { Metadata } from 'next'
import { PRODUCTS } from '@/data/products'
import ProductGrid from '@/components/catalog/ProductGrid'

export const metadata: Metadata = {
  title: 'Katalog Produk',
  description:
    'Katalog lengkap iPhone, iPad, Mac, dan Aksesoris Apple original. Filter cabang, ready stock, garansi, dan harga.',
}

export default async function KatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ ready?: string }>
}) {
  const params = await searchParams
  const initialFilters =
    params.ready === '1' ? { readyOnly: true as const } : undefined

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Katalog Produk</h1>
        <p className="mt-1 text-sm text-gray-500">
          Stok ter-update dari sistem internal · Gresik & Tuban
        </p>
      </div>
      <ProductGrid initialProducts={PRODUCTS} initialFilters={initialFilters} />
    </div>
  )
}
