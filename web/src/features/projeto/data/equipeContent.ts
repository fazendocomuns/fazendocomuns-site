import luciaRabelloImg from '@/assets/imgs/equipe/lucia-rabello.jpg'
import { assetSrc } from '@/lib/assetSrc'
import adelaideRezendeImg from '@/assets/imgs/equipe/adelaide-rezende.jpg'
import anaLeticiaLimaImg from '@/assets/imgs/equipe/ana-leticia-lima.jpg'
import daviAlvesImg from '@/assets/imgs/equipe/davi-alves.jpg'
import ericaVieiraImg from '@/assets/imgs/equipe/erica-vieira.jpg'
import flaviaChrispinoImg from '@/assets/imgs/equipe/flavia-chrispino.jpg'
import gabrielaCastroImg from '@/assets/imgs/equipe/gabriela-castro.jpg'
import gieselaTalonImg from '@/assets/imgs/equipe/giesela-talon.jpg'
import isysBoosImg from '@/assets/imgs/equipe/isys-boos.jpg'
import juliaJunqueiraImg from '@/assets/imgs/equipe/julia-junqueira-castillo.jpg'
import juliaMoraesImg from '@/assets/imgs/equipe/julia-moraes.jpg'
import laraMoreiraImg from '@/assets/imgs/equipe/lara-moreira.jpg'
import luanGagliardiImg from '@/assets/imgs/equipe/luan-gagliardi.jpg'
import lucasAbreuImg from '@/assets/imgs/equipe/lucas-abreu.jpg'
import mariaClaraCaiaffaImg from '@/assets/imgs/equipe/maria-clara-caiaffa.jpg'
import mariliaCostaImg from '@/assets/imgs/equipe/marilia-costa.jpg'
import michaelPazImg from '@/assets/imgs/equipe/michael-paz.jpg'
import paulaTumoloImg from '@/assets/imgs/equipe/paula-tumolo.jpg'
import pedroQueirozImg from '@/assets/imgs/equipe/pedro-queiroz.jpg'
import renataTavaresImg from '@/assets/imgs/equipe/renata-tavares.jpg'
import sofiaManzattoImg from '@/assets/imgs/equipe/sofia-manzatto.jpg'
import sofiaHengenImg from '@/assets/imgs/equipe/sofia-hengen.jpg'
import sophiaAguiarImg from '@/assets/imgs/equipe/sophia-aguiar.jpg'
import victoriaMaiaImg from '@/assets/imgs/equipe/victoria-maia.jpg'
import viniciusVilaNovaImg from '@/assets/imgs/equipe/vinicius-vila-nova.jpg'

export interface TeamMember {
  id: string
  name: string
  image: string
  roles: string[]
  bio?: string
}

export interface TeamGroup {
  id: string
  title: string
  members: TeamMember[]
}

export const equipeContent = {
  title: 'Equipe',
  subtitle:
    'Coordenação e pesquisadoras(es) do Instituto de Psicologia da UFRJ vinculados ao projeto Fazendo Comuns.',
  groups: [
    {
      id: 'coordenacao',
      title: 'Coordenação-Geral',
      members: [
        {
          id: 'lucia-rabello',
          name: 'Lucia Rabello de Castro',
          image: assetSrc(luciaRabelloImg),
          roles: [],
          bio: 'Professora Titular do Instituto de Psicologia da Universidade Federal do Rio de Janeiro, e do Programa de Pós-graduação em Psicologia desse Instituto. Possui Doutorado (Ph.D., 1988) e Mestrado (M.Sc., 1978) em Psicologia pela Universidade de Londres, Grã-Bretanha. Pesquisadora Senior do CNPQ. Membro Fundador do Núcleo Interdisciplinar de Pesquisa na Infância e Adolescência Contemporâneas - NIPIAC/UFRJ, coordenadora geral desse Núcleo (1995-2011), e atual Coordenadora Científica. Co-fundadora e primeira presidente eleita da Associação Nacional Rede de Pesquisadores e Pesquisadoras da Juventude - REDEJUBRA (2017-2020). É membro de redes nacionais e internacionais na área da infância e juventude. Membro de Conselhos Editoriais de periódicos nacionais e internacionais no campo da infância e juventude, como Childhood, Young e outras. Editora Chefe da Revista Científica da Infância, Adolescência e Juventude - DESIDADES lançada em 2013. Tem sido agraciada como Cientista do Nosso Estado pela Faperj (desde 2002). É Titular da Cátedra Pesquisa, Formação e Intervenção na Infância, Adolescência e Juventude do Colégio Brasileiro de Altos Estudos, UFRJ.',
        },
      ],
    },
    {
      id: 'assistentes',
      title: 'Pesquisadores (as) Assistentes',
      members: [
        {
          id: 'adelaide-rezende',
          name: 'Adelaide Rezende de Souza',
          image: assetSrc(adelaideRezendeImg),
          roles: [
            'Pós-doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
            'Pesquisadora da ONG Redes da Maré',
          ],
        },
        {
          id: 'ana-leticia-lima',
          name: 'Ana Letícia Lima Silva',
          image: assetSrc(anaLeticiaLimaImg),
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'davi-alves',
          name: 'Davi Alves de Abreu',
          image: assetSrc(daviAlvesImg),
          roles: [
            'Graduando de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'erica-vieira',
          name: 'Érica dos Santos Vieira',
          image: assetSrc(ericaVieiraImg),
          roles: [
            'Doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'flavia-chrispino',
          name: 'Flávia Chrispino',
          image: assetSrc(flaviaChrispinoImg),
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'gabriela-castro',
          name: 'Gabriela Fernandes Castro',
          image: assetSrc(gabrielaCastroImg),
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'giesela-talon',
          name: 'Giesela Maria Schöpke Marques Talon',
          image: assetSrc(gieselaTalonImg),
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'isys-boos',
          name: 'Isys Boos Vieira',
          image: assetSrc(isysBoosImg),
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'julia-junqueira',
          name: 'Júlia Junqueira Castillo',
          image: assetSrc(juliaJunqueiraImg),
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'julia-moraes',
          name: 'Julia Moraes',
          image: assetSrc(juliaMoraesImg),
          roles: [
            'Psicóloga formada pelo Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'lara-moreira',
          name: 'Lara de Oliveira Moreira',
          image: assetSrc(laraMoreiraImg),
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'luan-gagliardi',
          name: 'Luan Gall Gagliardi',
          image: assetSrc(luanGagliardiImg),
          roles: [
            'Graduando de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'lucas-abreu',
          name: 'Lucas Araujo de Jesus Meireles de Abreu',
          image: assetSrc(lucasAbreuImg),
          roles: [
            'Graduando de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'maria-clara-caiaffa',
          name: 'Maria Clara de Lima Caiaffa dos Santos',
          image: assetSrc(mariaClaraCaiaffaImg),
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'marilia-costa',
          name: 'Marília Fernanda Garcia Costa',
          image: assetSrc(mariliaCostaImg),
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'michael-paz',
          name: 'Michael Santana da Paz',
          image: assetSrc(michaelPazImg),
          roles: [
            'Graduando de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'paula-tumolo',
          name: 'Paula Pimentel Tumolo',
          image: assetSrc(paulaTumoloImg),
          roles: [
            'Doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
            'Professora Substituta da Faculdade de Educação da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'pedro-queiroz',
          name: 'Pedro Sá Campello Queiroz',
          image: assetSrc(pedroQueirozImg),
          roles: [
            'Graduando de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'renata-tavares',
          name: 'Renata Tavares',
          image: assetSrc(renataTavaresImg),
          roles: [
            'Doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'sofia-manzatto',
          name: 'Sofia Mitie Kanashiro Manzatto',
          image: assetSrc(sofiaManzattoImg),
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'sofia-hengen',
          name: 'Sofía Hengen',
          image: assetSrc(sofiaHengenImg),
          roles: [
            'Doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'sophia-aguiar',
          name: 'Sophia Aguiar Gimenez Corrêa',
          image: assetSrc(sophiaAguiarImg),
          roles: [
            'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'victoria-maia',
          name: 'Victoria Bersan Barbalho Maia',
          image: assetSrc(victoriaMaiaImg),
          roles: [
            'Mestranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
          ],
        },
        {
          id: 'vinicius-vila-nova',
          name: 'Vinícius Vila Nova',
          image: assetSrc(viniciusVilaNovaImg),
          roles: [
            'Bolsista de Apoio à Pesquisa',
            'Graduando de Engenharia de Computação pela Universidade Veiga de Almeida (UVA)',
          ],
        },
      ],
    },
  ] satisfies TeamGroup[],
}
