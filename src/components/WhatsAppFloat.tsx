import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { servicos } from '../data/empresa'
import { waLink, waServico } from '../lib/whatsapp'
import { WaIcon } from './Header'

/** Botão flutuante de WhatsApp com mensagem que muda conforme a página. */
export default function WhatsAppFloat() {
  const ref = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const servico = servicos.find((s) => pathname === `/modalidades/${s.slug}`)
  const msg = servico
    ? waServico(servico.nome)
    : pathname === '/contato'
      ? waLink('Olá! Gostaria de agendar uma aula experimental. Quais horários vocês têm?')
      : pathname === '/planos-e-horarios'
        ? waLink('Olá! Vi os planos no site e gostaria de saber valores e horários.')
        : waLink()

  useGSAP(() => {
    if (prefersReducedMotion()) return
    // A entrada anima só o invólucro; o hover (CSS) fica no link. Assim os dois não disputam o transform.
    gsap.fromTo(
      ref.current,
      { scale: 0.4, autoAlpha: 0, y: 20 },
      { scale: 1, autoAlpha: 1, y: 0, duration: 0.8, delay: 1.6, ease: 'expo.out', clearProps: 'transform' },
    )
  })

  return (
    <div ref={ref} className="fixed bottom-4 right-4 z-30 md:bottom-6 md:right-6" style={{ marginBottom: 'env(safe-area-inset-bottom)' }}>
    <a
      href={msg}
      target="_blank"
      rel="noopener"
      aria-label="Conversar no WhatsApp"
      className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#1f7a4d] text-white shadow-[0_14px_30px_-12px_rgba(20,39,41,0.6)] transition-transform duration-300 hover:scale-105"
    >
      <WaIcon size={26} />
      <span className="pointer-events-none absolute right-[calc(100%+12px)] hidden whitespace-nowrap rounded-full bg-ink px-4 py-2 text-sm text-bone opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
        Agende pelo WhatsApp
      </span>
    </a>
    </div>
  )
}
