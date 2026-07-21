import type { Metadata } from 'next'
import { EditoriaisListView } from '@/features/editoriais/components/EditoriaisListView'
import {
  editoriaisHubIntro,
  getPublicEditoriais,
} from '@/lib/content/editoriais.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: editoriaisHubIntro.title,
  description: editoriaisHubIntro.subtitle,
  path: '/editoriais',
})

export default async function EditoriaisPage() {
  const editoriais = await getPublicEditoriais()

  return (
    <EditoriaisListView
      title={editoriaisHubIntro.title}
      subtitle={editoriaisHubIntro.subtitle}
      editoriais={editoriais}
    />
  )
}
