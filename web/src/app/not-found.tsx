import { AppLink as Link } from '@/components/shared/AppLink'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container-app flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-ui text-sm uppercase tracking-widest text-brand-red">404</p>
      <h1 className="mt-4 font-heading text-4xl font-bold">Página não encontrada</h1>
      <p className="mt-4 max-w-lg font-body text-muted-foreground">
        O endereço acessado não existe ou foi movido.
      </p>
      <Button className="mt-8" asChild>
        <Link href="/">Voltar ao início</Link>
      </Button>
    </div>
  )
}
