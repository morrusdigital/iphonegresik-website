import Link from 'next/link'

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-[28px] min-h-[460px] grid grid-cols-1 lg:grid-cols-[1fr_360px] items-end bg-[#0d0d0d]">

      {/* Ambient glows */}
      <div className="absolute top-0 right-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)' }} />

      {/* Left: Content */}
      <div className="relative z-10 px-12 pt-12 pb-12 lg:pb-12">

        {/* Chip */}
        <div className="inline-flex items-center gap-2.5 rounded-full px-3 py-1.5 mb-7 border border-white/10"
          style={{ background: 'rgba(255,255,255,0.07)' }}>
          <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="white">
              <path fillRule="evenodd" d="M10.354 2.354a.5.5 0 010 .707L5 8.414 2.646 6.061a.5.5 0 11.707-.707L5 7l4.646-4.646a.5.5 0 01.708 0z"/>
            </svg>
          </div>
          <span className="text-[11px] font-bold tracking-[.08em] uppercase text-white/60">
            Authorized Reseller · Gresik &amp; Tuban
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[52px] font-black leading-[1.03] tracking-[-2px] text-white mb-5">
          Apple.<br />
          <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            Ori. Garansi.
          </span><br />
          Gresik.
        </h1>

        <p className="text-[15px] text-white/40 leading-[1.75] mb-9 max-w-[380px]">
          iPhone, iPad, Mac &amp; Aksesoris 100% original bergaransi resmi Apple.
          Stok live, harga transparan, order via WhatsApp kapan saja.
        </p>

        {/* CTA */}
        <div className="flex gap-3 flex-wrap mb-10">
          <Link href="/katalog"
            className="inline-flex items-center gap-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-[14px] px-6 py-3.5 text-[13px] font-extrabold transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-blue-500/25">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            Lihat Katalog
          </Link>
          <Link href="/kategori/iphone"
            className="inline-flex items-center gap-2 rounded-[14px] px-6 py-3.5 text-[13px] font-bold text-white/70 hover:text-white hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200">
            iPhone Series
          </Link>
        </div>

        {/* Trust */}
        <div className="flex gap-5 flex-wrap">
          {['Garansi Apple Resmi', '2 Cabang Siap Melayani', 'WA Fast Response'].map(t => (
            <div key={t} className="flex items-center gap-2">
              <div className="w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)' }}>
                <svg width="9" height="9" viewBox="0 0 12 12" fill="#22c55e" aria-hidden="true">
                  <path fillRule="evenodd" d="M10.354 2.354a.5.5 0 010 .707L5 8.414 2.646 6.061a.5.5 0 11.707-.707L5 7l4.646-4.646a.5.5 0 01.708 0z"/>
                </svg>
              </div>
              <span className="text-[11px] font-semibold text-white/40">{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Phone mockup */}
      <div className="hidden lg:flex items-end justify-center relative z-10 pb-0 pr-8">
        <div className="relative">
          {/* Phone */}
          <div className="w-[180px] h-[340px] rounded-[44px] bg-[#1a1a2e] border-[6px] border-[#2a2a3e] relative overflow-hidden shadow-2xl"
            style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] via-[#0f172a] to-[#1a1a2e]" />
            <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-14 h-5 bg-[#0d0d0d] rounded-full z-10" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-[2]">
              <span className="text-[32px]">🍎</span>
              <span className="text-[10px] font-black text-white tracking-widest uppercase">iPhone 16 Pro</span>
              <span className="text-[9px] font-semibold text-white/40">Natural Titanium</span>
            </div>
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full" />
          </div>

          {/* Floating badges */}
          <div className="absolute top-6 -right-5 bg-white rounded-2xl px-3 py-2 flex items-center gap-2 shadow-lg shadow-black/10">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-[10px] font-black text-gray-800 whitespace-nowrap">Ready Stock</span>
          </div>
          <div className="absolute bottom-16 -left-7 rounded-2xl px-3 py-2 shadow-lg"
            style={{ background: '#3b82f6', boxShadow: '0 8px 24px rgba(59,130,246,0.4)' }}>
            <span className="text-[13px] font-black text-white whitespace-nowrap">Rp 21.999.000</span>
          </div>
        </div>
      </div>
    </section>
  )
}