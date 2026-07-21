import type { StaticImageData } from 'next/image'

export function assetSrc(source: string | StaticImageData): string {
  return typeof source === 'string' ? source : source.src
}
