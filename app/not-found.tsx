import Link from 'next/link'

// ============================================================
// Not Found — 404 page
// ============================================================

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-6xl font-bold text-gray-200">404</p>
      <h1 className="mt-4 text-xl font-semibold text-gray-900">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Halaman yang kamu cari tidak ada atau sudah dipindahkan.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/"
          className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/katalog"
          className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Lihat Katalog
        </Link>
      </div>
    </div>
  )
}