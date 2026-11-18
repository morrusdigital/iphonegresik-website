import type { Category } from '@/types/products'

/**
 * Kategori yang TIDAK ditampilkan di website publik.
 *
 * "accessories" di POS saat ini masih bercampur dengan sparepart internal
 * (tag on, backglass, LCD, baterai), jadi disembunyikan dulu agar pelanggan
 * hanya melihat produk Apple. Hapus dari daftar ini setelah sparepart
 * dipisah ke kategori sendiri di POS.
 */
export const HIDDEN_CATEGORIES: readonly Category[] = ['accessories']

export function isCategoryVisible(category: Category): boolean {
  return !HIDDEN_CATEGORIES.includes(category)
}
