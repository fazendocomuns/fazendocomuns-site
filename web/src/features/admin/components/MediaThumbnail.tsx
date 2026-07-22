'use client'

type MediaThumbnailProps = {
  url: string
  alt?: string
  /** Lado do quadrado em px. Ignorado se `fill` for true. */
  size?: number
  /** Preenche 100% do container pai (precisa de pai com tamanho definido). */
  fill?: boolean
  /** cover = preenche a caixa; contain = mostra inteira com faixas. */
  fit?: 'cover' | 'contain'
  className?: string
}

/**
 * Miniatura com width/height explícitos para object-fit funcionar.
 */
export function MediaThumbnail({
  url,
  alt = '',
  size = 160,
  fill = false,
  fit = 'cover',
  className,
}: MediaThumbnailProps) {
  const box = fill
    ? ({
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        minWidth: 0,
        minHeight: 0,
      } as const)
    : ({
        width: size,
        height: size,
        maxWidth: size,
        maxHeight: size,
        minWidth: size,
        minHeight: size,
      } as const)

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt={alt}
      width={fill ? undefined : size}
      height={fill ? undefined : size}
      loading="lazy"
      decoding="async"
      className={className}
      style={{
        display: 'block',
        boxSizing: 'border-box',
        ...box,
        objectFit: fit,
        objectPosition: 'center center',
        backgroundColor: '#efe8de',
      }}
    />
  )
}
