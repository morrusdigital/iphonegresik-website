import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductsForCategory } from '@/lib/products/source'
import type { Category } from '@/types/products'
import ProductGrid from '@/components/catalog/ProductGrid'

// ============================================================
// Config kategori
// ============================================================

const CATEGORY_CONFIG: Record<
  Category,
  { label: string; description: string }
> = {
  iphone: {
    label: 'iPhone',
    description:
      'Semua model iPhone terbaru original bergaransi resmi, tersedia baru dan second.',
  },
  ipad: {
    label: 'iPad',
    description:
      'iPad Gen, iPad Air, dan iPad Pro original. Stok tersedia di Gresik dan Tuban.',
  },
  macbook: {
    label: 'Mac',
    description:
      'MacBook Air dan MacBook Pro dengan chip Apple Silicon terbaru.',
  },
  accessories: {
    label: 'Aksesoris',
    description:
      'AirPods, Apple Watch, MagSafe, dan aksesoris Apple original lainnya.',
  },
}

const SLUG_TO_CATEGORY: Record<string, Category> = {
  iphone: 'iphone',
  ipad: 'ipad',
  mac: 'macbook',
  macbook: 'macbook',
  aksesoris: 'accessories',
  accessories: 'accessories',
}

function resolveCategoryFromSlug(slug: string): Category | null {
  return SLUG_TO_CATEGORY[slug] ?? null
}

// ============================================================
// generateMetadata — dynamic metadata per kategori
// ============================================================

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = resolveCategoryFromSlug(slug)

  if (!category) {
    return { title: 'Kategori tidak ditemukan' }
  }

  const config = CATEGORY_CONFIG[category]
  return {
    title: config.label,
    description: config.description,
  }
}

// ============================================================
// Kategori Page — Server Component
// ============================================================

export default async function KategoriPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = resolveCategoryFromSlug(slug)

  // Validasi slug
  if (!category) {
    notFound()
  }

  const config = CATEGORY_CONFIG[category]
  const products = await getProductsForCategory(category)

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{config.label}</h1>
        <p className="mt-1 text-sm text-gray-500">{config.description}</p>
      </div>

      {/* Grid dengan filter — Client Component */}
      <ProductGrid
        initialProducts={products}
        initialCategory={category}
        navigateByCategory
      />
    </div>
  )
}
