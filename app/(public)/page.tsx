import type { Metadata } from 'next'
import HeroBanner from '@/components/home/HeroBanner'
import MarqueeStrip from '@/components/home/Marqueestrip'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import NewArrivals from '@/components/home/NewArrivals'
import CategoryHighlight from '@/components/home/CategoryHighlight'
import TrustSection from '@/components/home/TrustSection'

export const metadata: Metadata = {
  title: 'iPhone Gresik — Produk Apple Original, Harga Jelas, Siap Dibantu Admin',
  description:
    'Temukan iPhone, iPad, Mac, dan aksesoris Apple original dengan harga jelas dan layanan cepat. Pilih produk, cek cabang, lalu lanjut chat admin untuk pemesanan.',
}

export default function BerandaPage() {
  return (
    <div className="home-stack">
      <HeroBanner />
      <MarqueeStrip />
      <FeaturedProducts />
      <NewArrivals />
      <CategoryHighlight />
      <TrustSection />
    </div>
  )
}
