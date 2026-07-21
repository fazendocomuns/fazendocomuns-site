import { z } from 'zod'

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Informe seu nome')
    .max(80, 'Nome muito longo'),
  lastName: z
    .string()
    .min(2, 'Informe seu sobrenome')
    .max(80, 'Sobrenome muito longo'),
  email: z.email('Informe um e-mail válido'),
  message: z
    .string()
    .min(10, 'A mensagem deve ter pelo menos 10 caracteres')
    .max(2000, 'Mensagem muito longa'),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export const contactInfo = {
  organization:
    'Núcleo Interdisciplinar de Estudos da Infância, Adolescência e Juventude (NIAJ)',
  institution:
    'Universidade Federal do Rio de Janeiro — Campus da Praia Vermelha',
  address: {
    street: 'Av. Pasteur, 250 – Urca',
    building: 'Prédio da Decania do CFCH — sala 5',
    city: 'Rio de Janeiro — RJ, Brasil',
    cep: 'CEP 22.290-902',
  },
  email: 'comunicacao.fazendocomuns@gmail.com',
  instagram: 'https://www.instagram.com/fazendocomuns',
  successMessage: 'Obrigadx por entrar em contato conosco!',
}
