import Link from 'next/link'
import type { Category } from '@/types/products'
import { getProductsByCategory } from '@/data/products'

const CATS: { key: Category; label: string; desc: string; href: string; color: string; icon: string }[] = [
  { key: 'iphone',      label: 'iPhone',    desc: 'Series terbaru, ready stock',     href: '/kategori/iphone',    color: 'bg-[#0d0d0d]',  icon: '📱' },
  { key: 'ipad',        label: 'iPad',      desc: 'Air, Pro, dan Gen 10',            href: '/kategori/ipad',      color: 'bg-violet-600', icon: '🖥️' },
  { key: 'macbook',     label: 'Mac',       desc: 'MacBook Air & Pro M3',            href: '/kategori/mac',       color: 'bg-sky-500',    icon: '💻' },
  { key: 'accessories', label: 'Aksesoris', desc: 'AirPods, Watch & more',           href: '/kategori/aksesoris', color: 'bg-emerald-500', icon: '🎧' },
]

export default function CategoryHighlight() {
  return (
    <section className="space-y-5">
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-[.15em] text-blue-500 mb-1">✦ Jelajahi semua</p>
        <h2 className="text-[26px] font-black text-gray-950 tracking-tight">Kategori Produk</h2>
        <p className="text-[13px] text-gray-400 mt-0.5">Dari iPhone sampai aksesoris, semuanya ada</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CATS.map(cat => {
          const count = getProductsByCategory(cat.key).length
          return (
            <Link key={cat.key} href={cat.href}
              className={`group relative flex flex-col justify-between rounded-[22px] ${cat.color} p-5.5 min-h-45 overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl`}>
              {/* top shimmer */}
              <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent" />
              {/* blobs */}
              <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full bg-white/13 pointer-events-none" />

              {/* icon */}
              <div className="relative z-10 w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center text-[20px]">
                {cat.icon}
              </div>

              {/* text */}
              <div className="relative z-10">
                <p className="text-[18px] font-black text-white tracking-tight">{cat.label}</p>
                <p className="text-[11px] text-white/60 font-semibold mt-0.5">{cat.desc}</p>
              </div>

              {/* footer */}
              <div className="relative z-10 flex items-center justify-between mt-4">
                <span className="text-[10px] font-extrabold text-white/80 bg-white/20 rounded-full px-3 py-1">
                  {count} produk
                </span>
                <span className="text-white/70 text-base font-black transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}