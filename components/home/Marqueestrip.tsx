// components/home/MarqueeStrip.tsx
// Tambahkan komponen ini di app/(public)/page.tsx antara HeroBanner dan FeaturedProducts

export default function MarqueeStrip() {
  const items = [
    'iPhone 16 Series', 'iPad Pro M4', 'MacBook Air M3',
    'AirPods Pro 2', 'Apple Watch S10', 'Garansi Resmi Apple',
  ]
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden rounded-2xl bg-blue-500 py-3">
      <div className="flex gap-8 whitespace-nowrap animate-[marquee_22s_linear_infinite]">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.06em] text-white shrink-0">
            <span className="text-white/40">✦</span>
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}