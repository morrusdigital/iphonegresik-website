import Link from 'next/link'
import { formatPrice } from '@/lib/filters'
import type { Category, Product } from '@/types/products'

const CATEGORY_CARDS: { key: Category; label: string; href: string }[] = [
  { key: 'macbook', label: 'Mac', href: '/kategori/mac' },
  { key: 'iphone', label: 'iPhone', href: '/kategori/iphone' },
  { key: 'ipad', label: 'iPad', href: '/kategori/ipad' },
  { key: 'accessories', label: 'Aksesoris', href: '/kategori/aksesoris' },
]

interface MarqueeStripProps {
  products: Product[]
}

export default function MarqueeStrip({ products }: MarqueeStripProps) {
  return (
    <section className="home-section p-6 sm:p-7">
      <h2 className="section-title text-[2rem] font-bold tracking-[-0.05em] sm:text-[2.5rem]">
        Pilih produk Apple yang Anda cari.
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {CATEGORY_CARDS.map((item) => {
          const categoryProducts = products.filter((product) => product.category === item.key)
          const minPrice = categoryProducts.reduce(
            (lowest, product) => (product.price < lowest ? product.price : lowest),
            categoryProducts[0]?.price ?? 0
          )

          return (
            <Link
              key={item.key}
              href={item.href}
              className="rounded-[24px] bg-[#f5f5f7] px-5 py-6 transition-all hover:-translate-y-0.5 hover:bg-[#ededf0]"
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                {item.label}
              </p>
              <p className="mt-3 text-[26px] font-semibold tracking-[-0.03em] text-gray-950">
                {categoryProducts.length > 0 ? `Mulai ${formatPrice(minPrice)}` : 'Segera hadir'}
              </p>
              <p className="mt-2 text-[13px] leading-6 text-gray-500">
                Lihat pilihan {item.label} original dengan harga terbaik sesuai kebutuhan Anda.
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
