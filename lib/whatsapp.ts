import { BRANCHES } from '@/data/branches'
import { Branch, WhatsAppConfig, WhatsAppLink } from '@/types/branches'
import { BranchKey, Product } from '@/types/products'

// ============================================================
// FORMAT PESAN WHATSAPP
// Template: "Halo, saya tertarik dengan [Nama] - [Specs].
//            Apakah masih tersedia?"
// ============================================================

export function buildWAMessage(productName: string, specs: string): string {
  return `Halo, saya tertarik dengan ${productName} - ${specs}. Apakah masih tersedia?`
}

/** Build URL wa.me lengkap dengan encoded message */
export function buildWAUrl(whatsappNumber: string, message: string): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${whatsappNumber}?text=${encoded}`
}

/** Build WA link dari config lengkap */
export function buildWALink(config: WhatsAppConfig): WhatsAppLink {
  const message = buildWAMessage(config.productName, config.specs)
  const url = buildWAUrl(config.branch.whatsapp, message)
  return {
    url,
    label: `Chat WA ${config.branch.city}`,
  }
}


export function getProductWALinks(product: Product): WhatsAppLink[] {
  return BRANCHES.map((branch: Branch) => {
    const message = buildWAMessage(product.name, product.specs)
    const url = buildWAUrl(branch.whatsapp, message)
    return {
      url,
      label: `Chat WA ${branch.city}`,
    }
  })
}

/** Ambil WA link untuk satu cabang spesifik */
export function getProductWALinkByBranch(
  product: Product,
  branchKey: BranchKey
): WhatsAppLink {
  const branch = BRANCHES.find((b: Branch) => b.key === branchKey)
  if (!branch) throw new Error(`Branch "${branchKey}" tidak ditemukan`)

  const message = buildWAMessage(product.name, product.specs)
  const url = buildWAUrl(branch.whatsapp, message)
  return {
    url,
    label: `Chat WA ${branch.city}`,
  }
}