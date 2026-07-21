import { describe, expect, it } from 'vitest'
import {
  formatSignaturesText,
  parseReferencesText,
  parseSignaturesText,
} from '@/features/admin/lib/editorialFields'

describe('editorialFields', () => {
  it('parseia múltiplos autores em blocos', () => {
    const text = [
      'Lara de Oliveira Moreira',
      'Graduanda de Psicologia no Instituto de Psicologia da UFRJ',
      '',
      'Lucia Rabello de Castro',
      'Professora Titular da UFRJ',
      'Coordenadora Geral do Projeto “Fazendo Comuns”',
    ].join('\n')

    expect(parseSignaturesText(text)).toEqual([
      {
        name: 'Lara de Oliveira Moreira',
        lines: ['Graduanda de Psicologia no Instituto de Psicologia da UFRJ'],
      },
      {
        name: 'Lucia Rabello de Castro',
        lines: [
          'Professora Titular da UFRJ',
          'Coordenadora Geral do Projeto “Fazendo Comuns”',
        ],
      },
    ])
  })

  it('round-trip de assinaturas', () => {
    const authors = [
      { name: 'A', lines: ['X'] },
      { name: 'B', lines: ['Y', 'Z'] },
    ]
    expect(parseSignaturesText(formatSignaturesText(authors))).toEqual(authors)
  })

  it('parseia referências uma por linha', () => {
    expect(parseReferencesText('uma\n\nduas\n  tres  ')).toEqual(['uma', 'duas', 'tres'])
  })
})
