'use client'

type MediaThumbnailProps = {
  url: string
  alt?: string
  /** Lado do quadrado em px (padrão 160). */
  size?: number
  className?: string
}

/**
 * Foto completa dentro de um quadrado fixo.
 * width+height explícitos no <img> — object-fit:contain funciona de verdade.
 */
export function MediaThumbnail({
  url,
  alt = '',
  size = 160,
  className,
}: MediaThumbnailProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={className}
      style={{
        display: 'block',
        boxSizing: 'border-box',
        width: size,
        height: size,
        maxWidth: size,
        maxHeight: size,
        minWidth: size,
        minHeight: size,
        objectFit: 'contain',
        objectPosition: 'center center',
        backgroundColor: '#efe8de',
        borderRadius: 8,
        flexShrink: 0,
      }}
    />
  )
}
