import type { EditorialAuthor } from '@/features/editoriais/data/editoriaisContent'

/** Converte texto de assinatura (blocos separados por linha em branco) em autores. */
export function parseSignaturesText(text: string): EditorialAuthor[] {
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      const lines = block
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
      if (!lines.length) return null
      const [name, ...rest] = lines
      return { name, lines: rest }
    })
    .filter((item): item is EditorialAuthor => Boolean(item?.name))
}

export function formatSignaturesText(authors: EditorialAuthor[]): string {
  return authors
    .map((author) => [author.name, ...author.lines].join('\n'))
    .join('\n\n')
}

export function parseReferencesText(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

export function formatReferencesText(references: string[]): string {
  return references.join('\n')
}
