import Link from 'next/link'
import { formatPrice } from '@/lib/filters'
import HeroPhoneVisual from '@/components/home/HeroPhoneVisual'
import type { Product } from '@/types/products'

interface HeroBannerProps {
  product?: Product
  lastUpdate?: string
}

export default function HeroBanner({ product, lastUpdate }: HeroBannerProps) {
  const headingPrimary = product?.model ?? 'Produk Apple original'
  const headingSecondary = product?.color ?? 'siap mengikuti stok dari sistem'

  return (
    <section className="home-section bg-white">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.02fr)_minmax(420px,.98fr)]">
        <div className="flex flex-col justify-center px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
          <span className="section-eyebrow">Pilihan paling dicari</span>
          <h1 className="section-title mt-6 max-w-xl text-[2.7rem] font-bold leading-[0.95] sm:text-[4.2rem]">
            {headingPrimary}
            <span className="block text-gray-500">{headingSecondary}</span>
          </h1>

          <p className="mt-5 max-w-xl text-[15px] leading-8 text-gray-600 sm:text-[17px]">
            {product
              ? 'Produk Apple original dengan harga jelas, pilihan warna favorit, dan bantuan admin yang responsif. Cocok untuk Anda yang ingin belanja cepat tanpa ribet tanya dari awal.'
              : 'Website sudah siap mengikuti data katalog dari sistem internal. Begitu produk aktif di POS, etalase publik akan ikut terbarui otomatis.'}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {product ? (
              <Link
                href={`/produk/${product.slug}`}
                className="hero-cta-primary inline-flex items-center rounded-full bg-[#0071e3] px-6 py-3 text-[13px] font-semibold text-white transition-all hover:-translate-y-0.5"
              >
                Lihat detail produk
              </Link>
            ) : null}
            <Link
              href="/katalog?ready=1"
              className="hero-cta-secondary inline-flex items-center rounded-full border border-gray-300 bg-white px-6 py-3 text-[13px] font-semibold text-gray-900 transition-all hover:-translate-y-0.5"
            >
              {product ? 'Lihat ready stock' : 'Buka katalog'}
            </Link>
          </div>

          <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
            <div className="rounded-[24px] bg-[#f5f5f7] p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">Mulai dari</p>
              <p className="mt-2 text-[18px] font-semibold text-gray-950">
                {product ? formatPrice(product.price) : 'Sinkron dari POS'}
              </p>
            </div>
            <div className="rounded-[24px] bg-[#f5f5f7] p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">Update terakhir</p>
              <p className="mt-2 text-[18px] font-semibold text-gray-950">{lastUpdate || 'Menunggu produk aktif'}</p>
            </div>
            <div className="rounded-[24px] bg-[#f5f5f7] p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">Layanan favorit</p>
              <p className="mt-2 text-[18px] font-semibold text-gray-950">Trade-in & cicilan</p>
            </div>
          </div>
        </div>

        <HeroPhoneVisual product={product} />
      </div>
    </section>
  )
}
