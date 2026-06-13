import Link from 'next/link'
import type { Category } from '@/types/products'
import { getProductsByCategory } from '@/data/products'

const CATS: { key: Category; label: string; desc: string; href: string }[] = [
  { key: 'iphone', label: 'iPhone', desc: 'Pilihan lengkap untuk upgrade harian, kerja, sampai konten kreatif.', href: '/kategori/iphone' },
  { key: 'ipad', label: 'iPad', desc: 'Ideal untuk belajar, desain, presentasi, dan hiburan premium.', href: '/kategori/ipad' },
  { key: 'macbook', label: 'Mac', desc: 'Performa kencang untuk produktivitas, bisnis, dan pekerjaan profesional.', href: '/kategori/mac' },
  { key: 'accessories', label: 'Aksesoris', desc: 'Lengkapi pengalaman Apple Anda dengan aksesoris original yang tepat.', href: '/kategori/aksesoris' },
]

export default function CategoryHighlight() {
  return (
    <section className="home-section space-y-6 p-6 sm:p-7">
      <div className="max-w-2xl">
        <span className="section-eyebrow">Belanja berdasarkan kategori</span>
        <h2 className="section-title mt-4 text-[2rem] font-bold leading-none sm:text-[2.6rem]">
          Temukan produk yang paling sesuai dengan kebutuhan Anda
        </h2>
        <p className="section-copy mt-3 text-[14px] leading-7 sm:text-[15px]">
          Mulai dari iPhone, iPad, Mac, sampai aksesoris Apple original, semuanya kami susun supaya lebih mudah dipilih.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {CATS.map((cat) => {
          const count = getProductsByCategory(cat.key).length

          return (
            <Link
              key={cat.key}
              href={cat.href}
              className="rounded-[24px] border border-gray-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]"
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                {count} produk
              </p>
              <p className="mt-3 text-[28px] font-semibold tracking-[-0.03em] text-gray-950">
                {cat.label}
              </p>
              <p className="mt-3 text-[14px] leading-6 text-gray-500">{cat.desc}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
