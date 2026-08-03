import { Branch } from '@/types/branches'

export const BRANCHES: Branch[] = [
  {
    key: 'gresik',
    name: 'iPhone Gresik',
    city: 'Gresik',
    whatsapp: process.env.NEXT_PUBLIC_WA_GRESIK ?? '6281234567890',
    address: 'Jl. Dr. Soetomo No.30, Ngipik, Karangpoh, Kec. Gresik, Kabupaten Gresik, Jawa Timur 61121',
    mapsUrl:
      'https://maps.google.com/?q=Jl.+Dr.+Soetomo+No.30,+Ngipik,+Karangpoh,+Kec.+Gresik,+Kabupaten+Gresik,+Jawa+Timur+61121',
    hours: 'Senin–Sabtu 09.00–20.00',
    slaResponse: 'Respon admin rata-rata < 15 menit',
  },
  {
    key: 'tuban',
    name: 'iPhone Tuban',
    city: 'Tuban',
    whatsapp: process.env.NEXT_PUBLIC_WA_TUBAN ?? '6281234567891',
    address: 'Jl. Basuki Rachmad No.29, Kebonsari, Kec. Tuban, Kabupaten Tuban, Jawa Timur 62316',
    mapsUrl:
      'https://maps.google.com/?q=Jl.+Basuki+Rachmad+No.29,+Kebonsari,+Kec.+Tuban,+Kabupaten+Tuban,+Jawa+Timur+62316',
    hours: 'Senin–Sabtu 09.00–20.00',
    slaResponse: 'Respon admin rata-rata < 15 menit',
  },
]

export function getBranch(key: 'gresik' | 'tuban'): Branch {
  const branch = BRANCHES.find((b) => b.key === key)
  if (!branch) throw new Error(`Branch "${key}" tidak ditemukan`)
  return branch
}
