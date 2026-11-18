import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import { useSEO } from '../hooks/useSEO'
import { servicos } from '../data/empresa'
import { waServico } from '../lib/whatsapp'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'
import RevealImage from '../components/RevealImage'
import ScrollStack from '../components/reactbits/ScrollStack'
import ScrollReveal from '../components/reactbits/ScrollReveal'
import Magnet from '../components/reactbits/Magnet'
import Accordion from '../components/ui/Accordion'
import ButtonPrimary from '../components/ui/ButtonPrimary'
import ContactForm from '../components/ContactForm'
import GoogleRating from '../components/GoogleRating'
import { WaIcon } from '../components/Header'
import NotFound from './NotFound'

export default function ModalidadeDetalhe() {
  const { slug } = useParams()
  const s = servicos.find((x) => x.slug === slug)
  useSEO({
    title: s?.seoTitle ?? 'Página não encontrada | Ponto de Equilíbrio Pilates',
    description: s?.seoDescription ?? '',
    path: s ? `/modalidades/${s.slug}` : '/404',
    noindex: !s,
  })
  if (!s) return <NotFound />
  const outros = servicos.filter((x) => x.slug !== s.slug)

  return (
    <main>
      <PageHero
        kicker={
          <nav aria-label="Você está em">
            <Link to="/modalidades" className="hover:text-pine">Modalidades</Link> <span aria-hidden>/</span> <span aria-current="page">{s.nome}</span>
          </nav>
        }
        title={s.nome}
        intro={`${s.resumo} Na Trindade, em Florianópolis.`}
        aside={<GoogleRating compact />}
      >
        <Magnet>
          <ButtonPrimary href={waServico(s.nome)} icon={<WaIcon size={18} />}>
            Quero experimentar
          </ButtonPrimary>
        </Magnet>
      </PageHero>

      <section className="pb-24 md:pb-32">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <RevealImage src={s.imagem.src} width={s.imagem.w} height={s.imagem.h} alt={s.imagem.alt} className="aspect-[4/3] rounded-[28px] bg-sand" />
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <ScrollReveal as="p" text={s.beneficio} className="font-display text-[1.55rem] leading-[1.25] text-pine md:text-[2rem]" />
            <div className="mt-8 space-y-5 text-[1.05rem] text-mist">
              {s.descricao.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="paraquem" className="grain bg-sand py-24 md:py-32">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <SectionTitle id="paraquem" text="Para quem é" className="md:col-span-4" />
          <ul className="grid gap-x-10 md:col-span-8 md:grid-cols-2">
            {s.paraQuem.map((p) => (
              <li key={p} className="flex gap-4 border-t border-pine/15 py-6 text-[1.06rem] text-ink">
                <Check className="mt-1 shrink-0 text-amber-ink" size={20} strokeWidth={1.6} /> {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="como" className="py-24 md:py-32">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:sticky md:top-32 md:col-span-4 md:self-start">
            <SectionTitle id="como" text="Como funciona" />
            <p className="mt-6 text-mist">Do primeiro contato à evolução nas aulas.</p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <ScrollStack
              items={s.comoFunciona.map((c, i) => ({
                key: c.titulo,
                content: (
                  <article className={`rounded-[24px] p-8 shadow-[0_20px_45px_-30px_rgba(20,40,34,0.5)] md:p-10 ${i % 2 ? 'bg-pine text-bone' : 'border border-line bg-paper'}`}>
                    <h3 className="font-display text-[1.4rem] md:text-[1.8rem]">{c.titulo}</h3>
                    <p className={`mt-4 max-w-lg ${i % 2 ? 'text-bone/75' : 'text-mist'}`}>{c.texto}</p>
                  </article>
                ),
              }))}
            />
          </div>
        </div>
      </section>

      <section id="duvidas" aria-labelledby="duvidas-titulo" className="scroll-mt-24 pb-24 md:pb-32">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <SectionTitle id="duvidas-titulo" text="Dúvidas comuns" className="md:col-span-4" />
          <div className="md:col-span-8">
            <Accordion items={s.faq} />
            <p className="mt-6 text-mist">
              Outras perguntas? Veja as <Link to="/perguntas-frequentes" className="text-pine underline underline-offset-2">dúvidas frequentes</Link>.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="agendar-mod" className="px-3 pb-3">
        <div className="grain grain-dark rounded-[28px] bg-pine px-6 py-20 text-bone md:px-16 md:py-24">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <SectionTitle id="agendar-mod" text="Vamos marcar sua primeira aula?" className="text-bone" />
              <p className="mt-6 text-bone/70">Preencha e o WhatsApp abre com a mensagem pronta.</p>
            </div>
            <div className="rounded-[22px] bg-bone p-6 text-ink md:col-span-7 md:p-9">
              <ContactForm servicoInicial={s.nome} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="outros" className="py-24">
        <div className="container-x">
          <h2 id="outros" className="font-display text-2xl">Outras modalidades</h2>
          <ul className="mt-8 grid gap-3 md:grid-cols-3">
            {outros.map((o) => (
              <li key={o.slug}>
                <Link to={`/modalidades/${o.slug}`} className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-paper p-6 transition-colors hover:border-pine">
                  <span className="font-display text-[1.05rem]">{o.nome}</span>
                  <ArrowUpRight size={20} strokeWidth={1.5} className="shrink-0 transition-transform duration-500 group-hover:rotate-45" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
