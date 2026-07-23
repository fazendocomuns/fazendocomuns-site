import type { TeamMember } from '@/features/projeto/data/equipeContent'

export const colaboradoresContent = {
  title: 'Colaboradores',
  subtitle:
    'Profissionais e parceiros de campo que colaboram com as investigações e produções do projeto Fazendo Comuns.',
  members: [
    {
      id: 'ana-paula-pedro',
      name: 'Ana Paula Pedro',
      image: 'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/equipes/colaboradores/1WXWCHcPGqI6gM_LiL4EctJYvmTZaKnUL.jpg',
      roles: [
        'Psicóloga Clínica',
        'Diretora de projetos (Instituto Superior de Educação Pró-Saber)',
        'Coordenadora de Arte (Projeto Fazendo Comuns)',
      ],
    },
  ] satisfies TeamMember[],
}
