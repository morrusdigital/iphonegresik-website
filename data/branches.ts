import { Branch } from "@/types/branches"


export const BRANCHES: Branch[] = [
  {
    key: 'gresik',
    name: 'iPhone Gresik',
    city: 'Gresik',
    whatsapp: process.env.NEXT_PUBLIC_WA_GRESIK ?? '',
    address: 'Jl. Dr. Wahidin Sudiro Husodo, Gresik, Jawa Timur',
  },
  {
    key: 'tuban',
    name: 'iPhone Tuban',
    city: 'Tuban',
    whatsapp: process.env.NEXT_PUBLIC_WA_TUBAN ?? '',
    address: 'Jl. Basuki Rahmat, Tuban, Jawa Timur',
  },
]

// Helper: ambil satu branch by key
export function getBranch(key: 'gresik' | 'tuban'): Branch {
  const branch = BRANCHES.find((b) => b.key === key)
  if (!branch) throw new Error(`Branch "${key}" tidak ditemukan`)
  return branch
}