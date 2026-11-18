import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'
import { faqGeral, servicos } from '../data/empresa'
import PageHero from '../components/PageHero'
import Accordion from '../components/ui/Accordion'
import FinalCTA from '../components/FinalCTA'

export default function Faq() {
  useSEO({
    title: 'Perguntas Frequentes | Pilates na Trindade – Ponto de Equilíbrio Pilates',
    description:
      'Aula experimental, valores, turmas, horários, reposição, pagamento e localização do Ponto de Equilíbrio Pilates, na Trindade, Florianópolis.',
    path: '/perguntas-frequentes',
  })
  return (
    <main>
      <PageHero title="Antes da primeira *aula*" intro="As perguntas que mais chegam pelo WhatsApp. Se a sua não estiver aqui, é só mandar mensagem." />
      <section className="pb-24 md:pb-32">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <h2 className="sr-only">Perguntas gerais</h2>
            <Accordion items={faqGeral} />
          </div>
          <aside className="md:col-span-3 md:col-start-10">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-mist">Dúvidas por modalidade</h2>
            <ul className="mt-5 space-y-3">
              {servicos.map((s) => (
                <li key={s.slug}>
                  <Link to={`/modalidades/${s.slug}#duvidas`} className="font-display text-[1.05rem] text-pine underline-offset-4 hover:underline">
                    {s.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
      <FinalCTA title="Ficou alguma dúvida? *Pergunte* direto." text="Mande sua pergunta pelo WhatsApp. A gente responde rapidinho." mensagem="Olá! Tenho uma dúvida sobre as aulas:" />
    </main>
  )
}
