'use client'

import { useState } from 'react'
import { BRANCHES } from '@/data/branches'
import { getBranchWALink, type WAIntent } from '@/lib/whatsapp'
import { useBranch } from '@/hooks/useBranch'
import { clsx } from 'clsx'

const QUICK_INTENTS: { intent: WAIntent; label: string; topic: string }[] = [
  { intent: 'general', label: 'Tanya produk & harga', topic: 'tanya produk dan harga' },
  { intent: 'installment', label: 'Tanya cicilan', topic: 'tanya opsi cicilan' },
  { intent: 'trade-in', label: 'Tukar tambah', topic: 'tanya tukar tambah' },
]

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false)
  const { activeBranchKey, setBranch } = useBranch('gresik')
  const branch = BRANCHES.find((b) => b.key === activeBranchKey) ?? BRANCHES[0]

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-5 sm:right-5">
      {open && (
        <div className="w-[min(280px,calc(100vw-2rem))] rounded-2xl border border-gray-100 bg-white p-4 shadow-2xl space-y-3 animate-in fade-in">
          <p className="text-sm font-bold text-gray-900">Hubungi admin sekarang</p>
          <div className="flex gap-2">
            {BRANCHES.map((b) => (
              <button
                key={b.key}
                type="button"
                onClick={() => setBranch(b.key)}
                className={clsx(
                  'flex-1 rounded-lg py-1.5 text-xs font-bold border transition-colors',
                  activeBranchKey === b.key
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 text-gray-600'
                )}
              >
                {b.city}
              </button>
            ))}
          </div>
          <ul className="space-y-1">
            {QUICK_INTENTS.map((item) => {
              const link = getBranchWALink(activeBranchKey, item.intent, item.topic)
              return (
                <li key={item.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-800 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
          <p className="text-[10px] text-gray-400">{branch.slaResponse}</p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition-colors hover:bg-green-600 sm:h-14 sm:w-14"
        aria-label={open ? 'Tutup menu WhatsApp' : 'Buka menu WhatsApp'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 sm:h-7 sm:w-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>
    </div>
  )
}
