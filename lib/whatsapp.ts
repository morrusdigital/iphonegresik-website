import { BRANCHES } from '@/data/branches'
import { Branch, WhatsAppConfig, WhatsAppLink } from '@/types/branches'
import { BranchKey, Product } from '@/types/products'

export type WAIntent = 'buy' | 'trade-in' | 'video' | 'installment' | 'general'

const INTENT_LABELS: Record<WAIntent, string> = {
  buy: 'Pesan sekarang',
  'trade-in': 'Tanya trade-in',
  video: 'Minta video unit',
  installment: 'Tanya cicilan',
  general: 'Chat admin',
}

export function buildWAMessage(
  product: Product,
  branchCity: string,
  intent: WAIntent
): string {
  const skuPart = product.sku ? ` (SKU: ${product.sku})` : ''
  const base = `${product.name}${product.storage !== '-' ? ` ${product.storage}` : ''} ${product.color}${skuPart}`

  switch (intent) {
    case 'buy':
      return `Halo kak, saya tertarik ${base} ready di cabang ${branchCity}. Masih available? Kalau ada, saya mau lihat detail unit dan opsi pembayarannya.`
    case 'trade-in':
      return `Halo kak, saya tertarik ${base} di cabang ${branchCity} dan ingin tanya opsi tukar tambah. Unit lama saya [tulis model/kondisi]. Bisa dibantu hitung?`
    case 'video':
      return `Halo kak, saya mau minta video kondisi unit ${base} di cabang ${branchCity} (fisik, layar, baterai, kelengkapan). Bisa dikirim?`
    case 'installment':
      return `Halo kak, saya tertarik ${base} di cabang ${branchCity}. Bisa info opsi cicilan / paylater yang tersedia?`
    case 'general':
      return `Halo kak, saya mau tanya stok dan harga ${base} di cabang ${branchCity}.`
  }
}

export function buildGeneralWAMessage(branchCity: string, topic?: string): string {
  if (topic) {
    return `Halo kak, saya dari website iPhone Gresik. Saya mau ${topic} di cabang ${branchCity}. Bisa dibantu?`
  }
  return `Halo kak, saya dari website iPhone Gresik. Saya mau cek stok dan harga produk Apple di cabang ${branchCity}. Bisa dibantu?`
}

export function buildWAUrl(whatsappNumber: string, message: string): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${whatsappNumber}?text=${encoded}`
}

export function buildWALink(config: WhatsAppConfig): WhatsAppLink {
  const message = `Halo, saya tertarik dengan ${config.productName} - ${config.specs}. Apakah masih tersedia?`
  const url = buildWAUrl(config.branch.whatsapp, message)
  return {
    url,
    label: `Chat WA ${config.branch.city}`,
  }
}

export function getProductWALink(
  product: Product,
  branchKey: BranchKey,
  intent: WAIntent = 'buy'
): WhatsAppLink {
  const branch = BRANCHES.find((b: Branch) => b.key === branchKey)
  if (!branch) throw new Error(`Branch "${branchKey}" tidak ditemukan`)

  const message = buildWAMessage(product, branch.city, intent)
  const url = buildWAUrl(branch.whatsapp, message)
  return {
    url,
    label: INTENT_LABELS[intent],
  }
}

export function getProductWALinkByBranch(
  product: Product,
  branchKey: BranchKey
): WhatsAppLink {
  return getProductWALink(product, branchKey, 'buy')
}

export function getProductWALinks(product: Product): WhatsAppLink[] {
  return BRANCHES.map((branch: Branch) => getProductWALink(product, branch.key, 'buy'))
}

export function getBranchWALink(branchKey: BranchKey, intent: WAIntent = 'general', topic?: string): WhatsAppLink {
  const branch = BRANCHES.find((b) => b.key === branchKey)
  if (!branch) throw new Error(`Branch "${branchKey}" tidak ditemukan`)
  const message = buildGeneralWAMessage(branch.city, topic)
  return {
    url: buildWAUrl(branch.whatsapp, message),
    label: `Chat WA ${branch.city}`,
  }
}

export { INTENT_LABELS }
