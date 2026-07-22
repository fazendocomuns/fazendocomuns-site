'use client'

import styles from './MediaThumbnail.module.css'

type MediaThumbnailProps = {
  url: string
  alt?: string
  /** Lado do quadrado em px (padrão 160). */
  size?: number
  /** Se false, usa retângulo 4:3 com a mesma largura. */
  square?: boolean
  className?: string
}

/**
 * Mostra a imagem INTEIRA dentro de uma caixa de tamanho fixo
 * (nem cortada, nem esticada). Isolado via CSS module.
 */
export function MediaThumbnail({
  url,
  alt = '',
  size = 160,
  square = true,
  className,
}: MediaThumbnailProps) {
  const height = square ? size : Math.round((size * 3) / 4)

  return (
    <div
      className={[styles.frame, className].filter(Boolean).join(' ')}
      style={{
        width: size,
        height,
        minWidth: size,
        minHeight: height,
        maxWidth: size,
        maxHeight: height,
        flexShrink: 0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt={alt} className={styles.image} loading="lazy" decoding="async" />
    </div>
  )
}
