import type { FotosGallery, FotosGalleryColor } from '@/features/multimidia/data/fotosContent'
import type { VideoItem } from '@/features/multimidia/data/videosContent'
import type { Database } from '@/types/database'

type GaleriaRow = Database['public']['Tables']['galerias']['Row']
type VideoRow = Database['public']['Tables']['videos']['Row']
type PodcastRow = Database['public']['Tables']['podcast_episodios']['Row']

export function mapGaleria(
  row: GaleriaRow,
  images: string[],
): FotosGallery {
  return {
    id: row.slug,
    title: row.title,
    href: `/multimidia/fotos/${row.slug}`,
    color: row.color as FotosGalleryColor,
    cover: row.cover_url,
    images,
  }
}

export function mapVideo(row: VideoRow): VideoItem {
  return {
    id: row.slug,
    slug: row.slug,
    title: row.title,
    description: row.description ?? undefined,
    videoUrl: row.video_url,
    thumbnail: row.thumbnail_url,
    thumbnailAlt: row.thumbnail_alt ?? row.title,
    color: row.color as VideoItem['color'],
  }
}

export interface PodcastContent {
  title: string
  heading: string
  episode: {
    title: string
    audioUrl: string
    duration: string
  }
}

export function mapPodcastContent(rows: PodcastRow[]): PodcastContent | null {
  if (!rows.length) return null
  const episode = rows[0]
  return {
    title: 'Podcast',
    heading: episode.description ?? episode.title,
    episode: {
      title: episode.title,
      audioUrl: episode.audio_url,
      duration: episode.duration ?? '',
    },
  }
}
