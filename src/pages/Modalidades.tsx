import { Link } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import { useSEO } from '../hooks/useSEO'
import { servicos } from '../data/empresa'
import { waLink } from '../lib/whatsapp'
import PageHero from '../components/PageHero'
import RevealImage from '../components/RevealImage'
import SectionTitle from '../components/SectionTitle'
import ButtonPrimary from '../components/ui/ButtonPrimary'
import FinalCTA from '../components/FinalCTA'
import { WaIcon } from '../components/Header'

export default function Modalidades() {
  useSEO({
    title: 'Modalidades de Pilates na Trindade, Florianópolis | Ponto de Equilíbrio',
    description:
      'Pilates nos aparelhos, para postura e dores, para gestantes e na maturidade, na Trindade, Florianópolis. Veja para quem é cada modalidade.',
    path: '/modalidades',
  })
  return (
    <main>
      <PageHero
        title="Modalidades"
        intro="Todas as aulas acontecem nos aparelhos, em turmas pequenas. O que muda é o foco: veja qual combina com o seu momento."
      />
      <section aria-label="Lista de modalidades" className="pb-24 md:pb-32">
        <div className="container-x space-y-20 md:space-y-28">
          {servicos.map((s, i) => (
            <article key={s.slug} className="grid gap-10 md:grid-cols-12 md:items-center">
              <div className={`md:col-span-6 ${i % 2 ? 'md:order-2 md:col-start-7' : ''}`}>
                <RevealImage
                  src={s.imagem.src}
                  width={s.imagem.w}
                  height={s.imagem.h}
                  alt={s.imagem.alt}
                  className="aspect-[5/4] rounded-[28px] bg-sand"
                />
              </div>
              <div className={`md:col-span-5 ${i % 2 ? 'md:order-1' : 'md:col-start-8'}`}>
                <h2 className="font-display text-[1.8rem] leading-tight md:text-[2.4rem]">{s.nome}</h2>
                <p className="mt-4 text-[1.08rem] text-amber-ink">{s.beneficio}</p>
                <ul className="mt-6 space-y-2.5 text-mist">
                  {s.paraQuem.slice(0, 3).map((p) => (
                    <li key={p} className="flex gap-3">
                      <Check size={18} strokeWidth={1.6} className="mt-1 shrink-0 text-amber-ink" /> {p}
                    </li>
                  ))}
                </ul>
                <Link to={`/modalidades/${s.slug}`} className="group mt-8 inline-flex items-center gap-3 font-semibold text-pine">
                  <span className="border-b border-pine/30 pb-0.5 transition-colors group-hover:border-pine">Ver como funciona</span>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-line transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight size={18} strokeWidth={1.5} />
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x grid gap-8 border-t border-line pt-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionTitle text="Não sabe qual escolher?" />
            <p className="mt-6 max-w-xl text-mist">Conte seu objetivo pelo WhatsApp. A gente indica a turma e o horário certos para começar.</p>
          </div>
          <div className="md:col-span-5 md:justify-self-end">
            <ButtonPrimary href={waLink('Olá! Quero começar pilates, mas não sei qual modalidade escolher.')} icon={<WaIcon size={18} />}>
              Pedir indicação
            </ButtonPrimary>
          </div>
        </div>
      </section>
      <FinalCTA />
    </main>
  )
}
