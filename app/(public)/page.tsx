// app/(public)/page.tsx — update ini untuk pakai semua komponen baru

import type { Metadata } from 'next'
import HeroBanner from '@/components/home/HeroBanner'
import MarqueeStrip from '@/components/home/Marqueestrip'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryHighlight from '@/components/home/CategoryHighlight'
import WhyUs from '@/components/home/whyus'

export const metadata: Metadata = {
  title: 'iPhone Gresik — Authorized Apple Reseller',
  description: 'Beli iPhone, iPad, Mac, dan Aksesoris Apple original bergaransi resmi. Tersedia di cabang Gresik dan Tuban.',
}

export default function BerandaPage() {
  return (
    <div className="space-y-8">
      <HeroBanner />
      <MarqueeStrip />
      <FeaturedProducts />
      <CategoryHighlight />
      <WhyUs />
    </div>
  )
}