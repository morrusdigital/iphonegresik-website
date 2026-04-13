import type { Metadata } from 'next'
import HeroBanner from '@/components/home/HeroBanner'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryHighlight from '@/components/home/CategoryHighlight'

// ============================================================
// Metadata
// ============================================================

export const metadata: Metadata = {
  title: 'iPhone Gresik — Authorized Apple Reseller',
  description:
    'Beli iPhone, iPad, Mac, dan Aksesoris Apple original bergaransi resmi. ' +
    'Tersedia di cabang Gresik dan Tuban.',
}

// ============================================================
// Beranda — Server Component
// ============================================================

export default function BerandaPage() {
  return (
    <div className="space-y-12">
      <HeroBanner />
      <FeaturedProducts />
      <CategoryHighlight />
    </div>
  )
}