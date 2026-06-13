'use client'

import Image from 'next/image'
import type { Product } from '@/types/products'

interface HeroPhoneVisualProps {
  product: Product
}

export default function HeroPhoneVisual({ product }: HeroPhoneVisualProps) {
  return (
    <div className="relative overflow-hidden bg-[#f5f5f7] px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),transparent_55%)]" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center">
        <div className="rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-gray-600 shadow-sm">
          {product.name} · {product.storage}
        </div>

        <div className="relative mt-8 aspect-square w-full max-w-[420px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 80vw, 420px"
            className="object-contain p-4"
            priority
          />
        </div>

        <div className="mt-6 rounded-[28px] bg-white px-6 py-5 text-center shadow-[0_18px_40px_rgba(0,0,0,0.06)]">
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-gray-400">Siap dibeli</p>
          <p className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-gray-950">
            Gresik dan Tuban
          </p>
          <p className="mt-2 max-w-[320px] text-[14px] leading-6 text-gray-500">
            Pilih cabang yang paling dekat, tanya detail unit, lalu lanjut pesan lewat admin dengan lebih cepat.
          </p>
        </div>
      </div>
    </div>
  )
}
