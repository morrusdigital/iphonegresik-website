'use client' // Error boundary harus Client Component

import { useEffect } from 'react'
import { BRANCHES } from '@/data/branches'
import { getBranchWALink } from '@/lib/whatsapp'

// Tampil bila halaman gagal dimuat, terutama saat Storefront API (POS) sedang gangguan.
// Pengganti fallback data contoh: pelanggan tidak pernah melihat produk/harga palsu.
export default function PublicError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="mx-auto flex max-w-xl flex-col items-center rounded-[28px] border border-gray-200 bg-white px-6 py-14 text-center sm:px-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-400">
        Katalog sedang diperbarui
      </p>
      <h1 className="mt-3 text-[26px] font-semibold leading-tight tracking-[-0.03em] text-gray-950 sm:text-[32px]">
        Data stok sedang dimuat ulang
      </h1>
      <p className="mt-3 text-[14px] leading-7 text-gray-500">
        Mohon coba lagi sebentar lagi. Kalau butuh cepat, admin kami siap bantu cek stok dan harga
        langsung lewat WhatsApp.
      </p>

      <div className="mt-6 flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="rounded-full bg-[#0071e3] px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#005ecb]"
        >
          Coba lagi
        </button>
        {BRANCHES.map((branch) => (
          <a
            key={branch.key}
            href={getBranchWALink(branch.key, 'general').url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gray-300 px-6 py-3 text-[13px] font-semibold text-gray-900 transition-colors hover:bg-gray-50"
          >
            Chat admin {branch.city}
          </a>
        ))}
      </div>
    </section>
  )
}
