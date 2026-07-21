import type { Metadata } from 'next'
import { DM_Sans, Fredoka, Patrick_Hand, Source_Serif_4 } from 'next/font/google'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { AppProviders } from '@/components/providers/AppProviders'
import { buildPageMetadata } from '@/lib/seo/metadata'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
})

const patrickHand = Patrick_Hand({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-patrick-hand',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
  display: 'swap',
})

export const metadata: Metadata = buildPageMetadata({
  title: 'Fazendo Comuns',
  description:
    'Fazendo Comuns — pesquisa sobre recreio nas escolas públicas, coordenado pela UFRJ.',
  path: '/',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${dmSans.variable} ${fredoka.variable} ${patrickHand.variable} ${sourceSerif.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('fazendo-comuns-ui');var t=s?JSON.parse(s).state.theme:null;if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <AppProviders>
          <SiteLayout>{children}</SiteLayout>
        </AppProviders>
      </body>
    </html>
  )
}
