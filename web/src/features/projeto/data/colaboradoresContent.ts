import anaPaulaPedroImg from '@/assets/imgs/colaboradores/ana-paula-pedro.jpg'
import { assetSrc } from '@/lib/assetSrc'
import type { TeamMember } from '@/features/projeto/data/equipeContent'

export const colaboradoresContent = {
  title: 'Colaboradores',
  subtitle:
    'Profissionais e parceiros de campo que colaboram com as investigações e produções do projeto Fazendo Comuns.',
  members: [
    {
      id: 'ana-paula-pedro',
      name: 'Ana Paula Pedro',
      image: assetSrc(anaPaulaPedroImg),
      roles: [
        'Psicóloga Clínica',
        'Diretora de projetos (Instituto Superior de Educação Pró-Saber)',
        'Coordenadora de Arte (Projeto Fazendo Comuns)',
      ],
    },
  ] satisfies TeamMember[],
}
