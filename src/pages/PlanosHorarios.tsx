import { Check } from 'lucide-react'
import { useSEO } from '../hooks/useSEO'
import { empresa } from '../data/empresa'
import { waLink } from '../lib/whatsapp'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import SpotlightCard from '../components/reactbits/SpotlightCard'
import Agenda from '../components/Agenda'
import ButtonPrimary from '../components/ui/ButtonPrimary'
import ButtonSecondary from '../components/ui/ButtonSecondary'
import FinalCTA from '../components/FinalCTA'
import { WaIcon } from '../components/Header'

// [CONFIRMAR: frequências oferecidas e valores de cada plano]
const planos = [
  { nome: '1x por semana', para: 'Para manter o corpo em movimento e conhecer o método.', valor: '[CONFIRMAR: valor]' },
  { nome: '2x por semana', para: 'A frequência que a maioria escolhe para sentir evolução constante.', valor: '[CONFIRMAR: valor]', destaque: true },
  { nome: '3x por semana', para: 'Para quem quer resultado mais rápido em força e postura.', valor: '[CONFIRMAR: valor]' },
]

export default function PlanosHorarios() {
  useSEO({
    title: 'Planos e Horários de Pilates na Trindade, Florianópolis | Ponto de Equilíbrio',
    description:
      'Planos de pilates de 1 a 3 vezes por semana na Trindade, Florianópolis, com aulas até as 20h30. Agende uma aula experimental online.',
    path: '/planos-e-horarios',
  })
  return (
    <main>
      <PageHero
        title="Planos e *horários*"
        intro="Você escolhe quantas vezes por semana quer vir e os horários que cabem na sua rotina. As aulas vão até as 20h30."
      >
        <ButtonSecondary to="/planos-e-horarios#agenda">Agendar aula experimental</ButtonSecondary>
      </PageHero>

      <section aria-labelledby="planos-titulo" className="pb-24 md:pb-32">
        <div className="container-x">
          <h2 id="planos-titulo" className="sr-only">Planos</h2>
          <div className="grid gap-4 md:grid-cols-3 md:items-end">
            {planos.map((p) => (
              <SpotlightCard
                key={p.nome}
                className={`rounded-[26px] p-8 md:p-10 ${p.destaque ? 'bg-pine text-bone md:pb-16 md:pt-14' : 'border border-line bg-paper'}`}
                color={p.destaque ? 'rgba(109,176,143,0.22)' : undefined}
              >
                {p.destaque && <p className="mb-6 text-sm font-semibold text-amber">A mais escolhida [CONFIRMAR]</p>}
                <h3 className="font-display text-[1.7rem]">{p.nome}</h3>
                <p className={`mt-3 ${p.destaque ? 'text-bone/70' : 'text-mist'}`}>{p.para}</p>
                <p className={`mt-8 border-t pt-6 text-[1.05rem] font-semibold ${p.destaque ? 'border-bone/20' : 'border-line'}`}>{p.valor}</p>
              </SpotlightCard>
            ))}
          </div>
          <ul className="mt-10 grid gap-3 text-mist sm:grid-cols-2 md:grid-cols-4">
            {[`Aula experimental: ${empresa.experimental}`, `Turma: ${empresa.turma}`, `Reposição: ${empresa.reposicao}`, `Pagamento: ${empresa.pagamento}`].map((t) => (
              <li key={t} className="flex gap-3 text-[0.95rem]">
                <Check size={18} strokeWidth={1.6} className="mt-0.5 shrink-0 text-amber-ink" /> {t}
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <ButtonPrimary href={waLink('Olá! Vi os planos no site e gostaria de saber valores e horários disponíveis.')} icon={<WaIcon size={18} />}>
              Pedir valores no WhatsApp
            </ButtonPrimary>
          </div>
        </div>
      </section>

      <section aria-labelledby="horarios-titulo" className="pb-24 md:pb-32">
        <div className="container-x grid gap-10 border-t border-line pt-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionTitle id="horarios-titulo" text="Horário de funcionamento" />
          </div>
          <dl className="md:col-span-6 md:col-start-7">
            {empresa.horarios.map((h) => (
              <div key={h.dias} className="flex justify-between gap-6 border-b border-line py-5 text-[1.05rem]">
                <dt className="text-mist">{h.dias}</dt>
                <dd className="text-right text-ink">{h.horas}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Agenda />
      <FinalCTA title="Ficou com alguma *dúvida?*" text="Pergunte pelo WhatsApp sobre turmas, valores ou qual plano combina com você." mensagem="Olá! Tenho uma dúvida sobre os planos:" />
    </main>
  )
}
