// components/home/WhyUs.tsx — section baru, tambahkan di page.tsx setelah CategoryHighlight

const ITEMS = [
  {
    icon: '🛡️',
    iconBg: 'bg-blue-50',
    title: 'Garansi Resmi Apple',
    desc: 'Semua produk bergaransi resmi Apple Indonesia — bukan garansi distributor. Klaim langsung di Apple Service Center.',
  },
  {
    icon: '💬',
    iconBg: 'bg-emerald-50',
    title: 'Konsultasi via WhatsApp',
    desc: 'Tim kami bantu pilih produk sesuai kebutuhan dan budget. Respon cepat, tidak perlu antri, langsung terhubung.',
  },
  {
    icon: '📦',
    iconBg: 'bg-amber-50',
    title: 'Stok Live & Transparan',
    desc: 'Stok selalu diperbarui real-time. Tidak ada drama pesan tapi barang kosong. Harga sudah all-in tanpa biaya tersembunyi.',
  },
]

export default function WhyUs() {
  return (
    <section className="rounded-3xl bg-white border border-gray-100 p-9">
      <div className="mb-6">
        <p className="text-[11px] font-extrabold uppercase tracking-[.15em] text-blue-500 mb-1">✦ Kenapa pilih kami</p>
        <h2 className="text-[26px] font-black text-gray-950 tracking-tight">Belanja Tenang, Barang Terjamin</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {ITEMS.map(item => (
          <div key={item.title} className="bg-[#f8f9ff] rounded-2xl p-5 flex flex-col gap-3">
            <div className={`w-11 h-11 ${item.iconBg} rounded-xl flex items-center justify-center text-[20px]`}>
              {item.icon}
            </div>
            <div>
              <p className="text-[14px] font-extrabold text-gray-900">{item.title}</p>
              <p className="text-[12px] text-gray-400 leading-[1.65] font-medium mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}