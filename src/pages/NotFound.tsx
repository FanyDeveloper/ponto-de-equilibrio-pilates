import { useSEO } from '../hooks/useSEO'
import { waLink } from '../lib/whatsapp'
import SplitText from '../components/reactbits/SplitText'
import CenterMotif from '../components/CenterMotif'
import Noise from '../components/reactbits/Noise'
import ButtonPrimary from '../components/ui/ButtonPrimary'
import ButtonSecondary from '../components/ui/ButtonSecondary'

export default function NotFound() {
  useSEO({ title: 'Página não encontrada | Ponto de Equilíbrio Pilates', description: 'Esta página não existe.', path: '/404', noindex: true })
  return (
    <main className="relative flex min-h-[88vh] items-center overflow-hidden pt-28">
      <Noise />
      <CenterMotif scrub={false} className="pointer-events-none absolute -right-32 top-16 w-[520px] text-pine/20 md:right-0 md:w-[680px]" />
      <div className="container-x relative">
        <p className="font-display text-[6rem] leading-none text-amber md:text-[9rem]">404</p>
        <SplitText as="h1" trigger="load" text="Esta página saiu do *ponto de equilíbrio.*" className="mt-4 max-w-3xl font-display text-[2rem] leading-[1.08] md:text-[3.4rem]" />
        <p className="mt-6 max-w-lg text-[1.1rem] text-mist">O endereço pode ter mudado ou foi digitado errado. O estúdio continua no mesmo lugar, na Trindade.</p>
        <div className="mt-10 flex flex-wrap items-center gap-8">
          <ButtonPrimary to="/">Voltar ao início</ButtonPrimary>
          <ButtonSecondary href={waLink()}>Falar no WhatsApp</ButtonSecondary>
        </div>
      </div>
    </main>
  )
}
