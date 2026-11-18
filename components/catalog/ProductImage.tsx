import Image from 'next/image'
import { clsx } from 'clsx'
import { hasRealPhoto } from '@/lib/products/enrich'

interface ProductImageProps {
  src: string
  alt: string
  /** `sizes` untuk foto utama (lihat next/image). */
  sizes: string
  priority?: boolean
  /** Class tambahan untuk foto utama, mis. efek hover. */
  className?: string
}

/**
 * Foto produk yang mengisi bingkai tanpa memotong produknya.
 *
 * Foto dari POS ukurannya campur (tegak 9:16, 3:4, dan landscape). Foto utama ditampilkan
 * utuh (`object-contain`), dan sisa ruangnya diisi versi blur dari foto yang sama, sehingga
 * semua kartu terlihat penuh dan seragam. Placeholder "Foto segera tersedia" tampil apa adanya.
 *
 * Harus berada di dalam elemen `relative` yang punya ukuran (mis. `aspect-[4/5]`).
 */
export default function ProductImage({ src, alt, sizes, priority, className }: ProductImageProps) {
  if (!hasRealPhoto({ image: src })) {
    return <Image src={src} alt={alt} fill sizes={sizes} className="object-contain" priority={priority} />
  }

  return (
    <>
      {/* Latar blur: versi sangat kecil dari foto yang sama, jadi unduhannya hanya beberapa KB. */}
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        sizes="48px"
        className="scale-125 object-cover opacity-90 blur-2xl"
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={clsx('object-contain', className)}
      />
    </>
  )
}
