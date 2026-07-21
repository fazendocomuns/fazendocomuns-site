import { jornalzinhoDaEscolaDbBook } from '@/features/livros/data/jornalzinhoDaEscolaDbBook'
import { livretosProjetoCombinacaoBook } from '@/features/livros/data/livretosProjetoCombinacaoBook'
import { manifestoDasProfessorasBook } from '@/features/livros/data/manifestoDasProfessorasBook'
import { recrearMundosOutrosBook } from '@/features/livros/data/recrearMundosOutrosBook'
import type { Livro } from '@/features/livros/types'

export const livros: Livro[] = [
  recrearMundosOutrosBook,
  manifestoDasProfessorasBook,
  jornalzinhoDaEscolaDbBook,
  livretosProjetoCombinacaoBook,
]

export function getLivroBySlug(slug: string): Livro | undefined {
  return livros.find((livro) => livro.slug === slug)
}
