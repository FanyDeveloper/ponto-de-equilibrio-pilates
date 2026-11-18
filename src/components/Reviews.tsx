import { useRef } from 'react'
import { Quote } from 'lucide-react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { avaliacoes, mapsLink } from '../data/empresa'
import SectionTitle from './SectionTitle'
import GoogleRating from './GoogleRating'
import Stars from './Stars'
import ButtonSecondary from './ui/ButtonSecondary'

/** Avaliações reais do Google, em colunas desalinhadas de propósito. */
export default function Reviews() {
  const ref = useRef<HTMLElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('[data-review]', {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-reviews-grid]', start: 'top 80%', once: true },
      })
    },
    { scope: ref },
  )
  const [destaque, ...resto] = avaliacoes
  return (
    <section ref={ref} aria-labelledby="avaliacoes-titulo" className="py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionTitle id="avaliacoes-titulo" text="O que as alunas dizem do *PEP*" />
          </div>
          <div className="md:col-span-5 md:justify-self-end">
            <GoogleRating />
          </div>
        </div>

        <div data-reviews-grid className="mt-16 grid gap-4 md:mt-24 md:grid-cols-12 md:gap-5">
          <figure data-review className="relative rounded-[22px] bg-pine p-8 text-bone md:col-span-7 md:row-span-2 md:p-12">
            <Quote aria-hidden size={40} strokeWidth={1} className="text-amber" />
            <blockquote className="mt-6 font-display text-[1.3rem] leading-[1.35] md:text-[1.7rem]">“{destaque.texto}”</blockquote>
            <figcaption className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.95rem] text-bone/70">
              <strong className="text-bone">{destaque.nome}</strong>
              {destaque.detalhe && <span>{destaque.detalhe}</span>}
              <Stars n={destaque.nota} />
              <span>Avaliação no Google</span>
            </figcaption>
          </figure>
          {resto.map((a, i) => (
            <figure
              data-review
              key={a.nome}
              className={`rounded-[22px] border border-line bg-paper p-7 md:col-span-5 ${i === 1 ? 'md:ml-10' : ''}`}
            >
              <div className="flex items-center justify-between">
                <Stars n={a.nota} />
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-mist">Avaliação no Google</span>
              </div>
              <blockquote className="mt-4 text-[1.05rem] leading-relaxed text-ink">“{a.texto}”</blockquote>
              <figcaption className="mt-5 font-display text-lg text-pine">{a.nome}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12">
          <ButtonSecondary href={mapsLink}>Ver todas as avaliações no Google</ButtonSecondary>
        </div>
      </div>
    </section>
  )
}
