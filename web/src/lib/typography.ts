/** Classes tipográficas para textos longos (artigos, páginas de conteúdo). */

/** Parágrafo justificado com recuo de primeira linha. */
export const proseParagraph =
  'font-body text-base leading-relaxed text-justify text-foreground indent-[1.5em] md:text-lg md:leading-loose'

/** Variante menor (notas, legendas longas). */
export const proseParagraphSm =
  'font-body text-sm leading-relaxed text-justify text-foreground indent-[1.25em] md:text-base md:leading-loose'

/** Mesmo estilo, sem recuo (listas, assinaturas, datas). */
export const proseParagraphFlush =
  'font-body text-base leading-relaxed text-justify text-foreground md:text-lg md:leading-loose'

/** Empilhamento de parágrafos. */
export const proseStack = 'space-y-6'
