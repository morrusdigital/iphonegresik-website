import Link from 'next/link'
import { BRANCHES } from '@/data/branches'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1 space-y-3">
            <p className="text-sm font-bold text-gray-900">iPhone Gresik</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Authorized reseller produk Apple di Gresik dan Tuban.
              Garansi resmi, produk original.
            </p>
          </div>

          {/* Produk */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Produk</p>
            <ul className="space-y-2">
              {['iPhone', 'iPad', 'Mac', 'Aksesoris'].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/kategori/${cat.toLowerCase()}`}
                    className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cabang */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Cabang</p>
            <ul className="space-y-2">
              {BRANCHES.map((branch) => (
                <li key={branch.key} className="space-y-0.5">
                  <p className="text-xs font-medium text-gray-700">{branch.city}</p>
                  {branch.address && (
                    <p className="text-xs text-gray-500">{branch.address}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Hubungi kami */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Hubungi Kami</p>
            <ul className="space-y-2">
              {BRANCHES.map((branch) => (
                <li key={branch.key}>
                  <a
                    href={`https://wa.me/${branch.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-green-700 hover:text-green-800 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WA {branch.city}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-gray-200 pt-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; {year} iPhone Gresik. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}