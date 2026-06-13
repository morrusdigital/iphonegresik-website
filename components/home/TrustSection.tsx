import Link from 'next/link'
import { BRANCHES } from '@/data/branches'
import { getBranchWALink } from '@/lib/whatsapp'

const SERVICE_CARDS = [
  {
    title: 'Pesan online, ambil di toko',
    text: 'Pilih produk lebih dulu, lalu ambil di cabang Gresik atau Tuban sesuai cabang yang Anda inginkan.',
  },
  {
    title: 'Pengiriman lebih praktis',
    text: 'Untuk Anda yang di luar kota, admin siap bantu proses pemesanan sampai pengiriman dengan lebih tenang.',
  },
  {
    title: 'Pembayaran lebih fleksibel',
    text: 'Tersedia pilihan cicilan dan trade-in untuk produk tertentu agar belanja terasa lebih ringan.',
  },
]

export default function TrustSection() {
  return (
    <section className="home-section space-y-6 p-6 sm:p-7">
      <div className="max-w-2xl">
        <span className="section-eyebrow">Kenapa belanja di sini</span>
        <h2 className="section-title mt-4 text-[2rem] font-bold leading-none sm:text-[2.6rem]">
          Belanja Apple original dengan proses yang lebih jelas dan nyaman
        </h2>
        <p className="section-copy mt-3 text-[14px] leading-7 sm:text-[15px]">
          Dari pilih produk, cek cabang, sampai lanjut ke admin, semuanya dibuat supaya Anda bisa belanja lebih cepat tanpa bingung.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {SERVICE_CARDS.map((card) => (
          <div key={card.title} className="rounded-[24px] bg-[#f5f5f7] p-5">
            <p className="text-[22px] font-semibold tracking-[-0.03em] text-gray-950">{card.title}</p>
            <p className="mt-3 text-[14px] leading-7 text-gray-500">{card.text}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {BRANCHES.map((branch) => (
          <div key={branch.key} className="rounded-[24px] border border-gray-200 bg-white p-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-gray-400">
              Cabang {branch.city}
            </p>
            <p className="mt-3 text-[28px] font-semibold tracking-[-0.03em] text-gray-950">
              {branch.name}
            </p>
            {branch.address && <p className="mt-3 text-[14px] leading-7 text-gray-500">{branch.address}</p>}
            {branch.hours && <p className="mt-2 text-[14px] leading-7 text-gray-500">{branch.hours}</p>}

            <div className="mt-5 flex flex-wrap gap-3">
              {branch.mapsUrl && (
                <a
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-gray-300 px-4 py-2 text-[13px] font-semibold text-gray-900 transition-colors hover:bg-gray-50"
                >
                  Buka Maps
                </a>
              )}
              <a
                href={getBranchWALink(branch.key, 'general').url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full bg-[#0071e3] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#005ecb]"
              >
                Chat WA {branch.city}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[24px] bg-[#f5f5f7] px-6 py-6 text-center">
        <p className="text-[28px] font-semibold tracking-[-0.03em] text-gray-950">
          Sudah tahu produk yang Anda cari?
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-7 text-gray-500">
          Lanjutkan ke katalog untuk lihat pilihan produk, harga, dan cabang yang paling pas untuk Anda.
        </p>
        <Link
          href="/katalog?ready=1"
          className="mt-5 inline-flex rounded-full bg-[#0071e3] px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#005ecb]"
        >
          Buka katalog sekarang
        </Link>
      </div>
    </section>
  )
}
