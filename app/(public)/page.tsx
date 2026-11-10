import type { Metadata } from 'next'
import HeroBanner from '@/components/home/HeroBanner'
import MarqueeStrip from '@/components/home/Marqueestrip'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import NewArrivals from '@/components/home/NewArrivals'
import TrustSection from '@/components/home/TrustSection'
import { getProducts } from '@/lib/products/source'
import { curateHome } from '@/lib/products/curation'

export const metadata: Metadata = {
  title: 'iPhone Gresik — Produk Apple Original, Harga Jelas, Siap Dibantu Admin',
  description:
    'Temukan iPhone, iPad, Mac, dan aksesoris Apple original dengan harga jelas dan layanan cepat. Pilih produk, cek cabang, lalu lanjut chat admin untuk pemesanan.',
}

export default async function BerandaPage() {
  const products = await getProducts()
  const { hero: heroProduct, featured: featuredProducts, featuredIsManual, newArrivals: newArrivalProducts } =
    curateHome(products)
  const lastUpdate = products.reduce(
    (latest, product) => (product.updatedAt > latest ? product.updatedAt : latest),
    products[0]?.updatedAt ?? ''
  )

  return (
    <div className="home-stack">
      <HeroBanner product={heroProduct} lastUpdate={lastUpdate} isManualPick={featuredIsManual} />
      <MarqueeStrip products={products} />
      <FeaturedProducts products={featuredProducts} isManualPick={featuredIsManual} />
      <NewArrivals products={newArrivalProducts} />
      <TrustSection />
    </div>
  )
}
