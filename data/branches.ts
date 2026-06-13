import { Branch } from '@/types/branches'

export const BRANCHES: Branch[] = [
  {
    key: 'gresik',
    name: 'iPhone Gresik',
    city: 'Gresik',
    whatsapp: process.env.NEXT_PUBLIC_WA_GRESIK ?? '6281234567890',
    address: 'Jl. Dr. Wahidin Sudiro Husodo, Gresik, Jawa Timur',
    mapsUrl: 'https://maps.google.com/?q=iPhone+Gresik',
    hours: 'Senin–Sabtu 09.00–20.00',
    slaResponse: 'Respon admin rata-rata < 15 menit',
  },
  {
    key: 'tuban',
    name: 'iPhone Tuban',
    city: 'Tuban',
    whatsapp: process.env.NEXT_PUBLIC_WA_TUBAN ?? '6281234567891',
    address: 'Jl. Basuki Rahmat, Tuban, Jawa Timur',
    mapsUrl: 'https://maps.google.com/?q=iPhone+Tuban',
    hours: 'Senin–Sabtu 09.00–20.00',
    slaResponse: 'Respon admin rata-rata < 15 menit',
  },
]

export function getBranch(key: 'gresik' | 'tuban'): Branch {
  const branch = BRANCHES.find((b) => b.key === key)
  if (!branch) throw new Error(`Branch "${key}" tidak ditemukan`)
  return branch
}
