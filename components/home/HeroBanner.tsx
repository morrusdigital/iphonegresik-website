import Link from 'next/link'


export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gray-900 px-8 py-16 text-white sm:px-12 sm:py-20">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/5" />
      </div>

      <div className="relative max-w-lg space-y-6">
        {/* Label */}
        <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
          Authorized Reseller · Gresik & Tuban
        </span>

        {/* Heading */}
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          iPhone, iPad, Mac &{' '}
          <span className="text-gray-300">Aksesoris</span>{' '}
          Original
        </h1>

        {/* Sub */}
        <p className="text-base text-gray-400 sm:text-lg">
          Produk Apple original bergaransi resmi. Stok tersedia di cabang
          Gresik dan Tuban. Cek ketersediaan dan tanya langsung via WhatsApp.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
          >
            Lihat Katalog
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
          <Link
            href="/katalog?category=iphone"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
          >
            iPhone Series
          </Link>
        </div>
      </div>
    </section>
  )
}