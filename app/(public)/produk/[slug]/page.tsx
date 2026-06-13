import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PRODUCTS, getProductBySlug } from '@/data/products'
import ProductDetail from '@/components/catalog/ProductDetail'
import { formatPrice } from '@/lib/filters'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Produk tidak ditemukan' }

  return {
    title: `${product.name} ${product.storage !== '-' ? product.storage : ''} — ${formatPrice(product.price)}`,
    description: `${product.name} ${product.color}. ${product.specs}. Stok Gresik & Tuban. Garansi jelas, chat admin untuk closing.`,
  }
}

export default async function ProdukDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  return <ProductDetail product={product} />
}
