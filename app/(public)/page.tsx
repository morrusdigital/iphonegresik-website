import type { Metadata } from 'next'
import HeroBanner from '@/components/home/HeroBanner'
import MarqueeStrip from '@/components/home/Marqueestrip'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import NewArrivals from '@/components/home/NewArrivals'
import CategoryHighlight from '@/components/home/CategoryHighlight'
import TrustSection from '@/components/home/TrustSection'
import { getProducts } from '@/lib/products/source'

export const metadata: Metadata = {
  title: 'iPhone Gresik — Produk Apple Original, Harga Jelas, Siap Dibantu Admin',
  description:
    'Temukan iPhone, iPad, Mac, dan aksesoris Apple original dengan harga jelas dan layanan cepat. Pilih produk, cek cabang, lalu lanjut chat admin untuk pemesanan.',
}

export default async function BerandaPage() {
  const products = await getProducts()
  const featuredProducts = products.filter((product) => product.badges.includes('terlaris')).slice(0, 4)
  const newArrivalProducts = products.filter((product) => product.badges.includes('baru-masuk')).slice(0, 4)
  const heroProduct = featuredProducts[0] ?? products[0]
  const lastUpdate = products.reduce(
    (latest, product) => (product.updatedAt > latest ? product.updatedAt : latest),
    products[0]?.updatedAt ?? ''
  )

  return (
    <div className="home-stack">
      <HeroBanner product={heroProduct} lastUpdate={lastUpdate} />
      <MarqueeStrip products={products} />
      <FeaturedProducts products={featuredProducts} />
      <NewArrivals products={newArrivalProducts} />
      <CategoryHighlight products={products} />
      <TrustSection />
    </div>
  )
}
