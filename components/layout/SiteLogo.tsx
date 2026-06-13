'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {
  SITE_LOGO_ALT,
  SITE_LOGO_SHOW_NAME,
  SITE_LOGO_SRC,
  SITE_NAME,
} from '@/lib/brand'
import { clsx } from 'clsx'

interface SiteLogoProps {
  /** Tampilkan teks di samping logo */
  showName?: boolean
  className?: string
  /** Bungkus dengan link ke beranda */
  linked?: boolean
}

function LogoMark({ showName, className }: { showName: boolean; className?: string }) {
  const [useFallback, setUseFallback] = useState(false)
  const logoShellClass = showName
    ? 'relative block h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-white ring-1 ring-gray-100'
    : 'relative block h-10 w-[117px] shrink-0 overflow-hidden'
  const logoImageClass = showName ? 'object-contain p-0.5' : 'object-contain'

  return (
    <span className={clsx('inline-flex items-center gap-2', className)}>
      {useFallback ? (
        showName ? (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
          </div>
        ) : (
          <span className="text-lg font-bold tracking-tight text-gray-900">{SITE_NAME}</span>
        )
      ) : (
        <span className={logoShellClass}>
          <Image
            src={SITE_LOGO_SRC}
            alt={SITE_LOGO_ALT}
            fill
            className={logoImageClass}
            sizes={showName ? '32px' : '117px'}
            priority
            onError={() => setUseFallback(true)}
          />
        </span>
      )}
      {showName && <span className="text-sm font-bold text-gray-900">{SITE_NAME}</span>}
    </span>
  )
}

export default function SiteLogo({
  showName = SITE_LOGO_SHOW_NAME,
  className,
  linked = true,
}: SiteLogoProps) {
  const content = <LogoMark showName={showName} className={className} />

  if (!linked) return content

  return (
    <Link href="/" className={clsx('inline-flex', className)}>
      {content}
    </Link>
  )
}
