import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetail from '@/components/catalog/ProductDetail'
import { formatPrice } from '@/lib/filters'
import { getProduct, getRelatedProducts } from '@/lib/products/source'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return { title: 'Produk tidak ditemukan' }

  return {
    title: `${product.name} ${product.storage !== '-' ? product.storage : ''} — ${formatPrice(product.price)}`,
    description: `${product.name} ${product.color}. ${product.specs}. Stok Gresik & Tuban. Garansi jelas, chat admin untuk closing.`,
  }
}

export default async function ProdukDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const similarProducts = await getRelatedProducts(product)

  return <ProductDetail product={product} similarProducts={similarProducts} />
}
