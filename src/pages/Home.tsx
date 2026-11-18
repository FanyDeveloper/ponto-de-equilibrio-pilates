import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock, MapPin, Phone } from 'lucide-react'
import { gsap, useGSAP } from '../lib/gsap'
import { useSEO } from '../hooks/useSEO'
import { aparelhos, empresa, galeria, mapsLink, servicos } from '../data/empresa'
import { telLink, waLink } from '../lib/whatsapp'
import SplitText from '../components/reactbits/SplitText'
import RotatingText from '../components/reactbits/RotatingText'
import LogoLoop from '../components/reactbits/LogoLoop'
import ScrollReveal from '../components/reactbits/ScrollReveal'
import MagicBento from '../components/reactbits/MagicBento'
import Magnet from '../components/reactbits/Magnet'
import CountUp from '../components/reactbits/CountUp'
import SpotlightCard from '../components/reactbits/SpotlightCard'
import Noise from '../components/reactbits/Noise'
import ButtonPrimary from '../components/ui/ButtonPrimary'
import ButtonSecondary from '../components/ui/ButtonSecondary'
import SectionTitle from '../components/SectionTitle'
import RevealImage from '../components/RevealImage'
import GoogleRating from '../components/GoogleRating'
import CenterMotif from '../components/CenterMotif'
import Reviews from '../components/Reviews'
import MapEmbed from '../components/MapEmbed'
import FinalCTA from '../components/FinalCTA'
import Masonry from '../components/reactbits/Masonry'
import Stars from '../components/Stars'
import { WaIcon } from '../components/Header'

const passos = [
  { titulo: 'Mande uma mensagem', texto: 'Conte pelo WhatsApp seu objetivo e se tem alguma dor ou limitação.' },
  { titulo: 'Faça a aula experimental', texto: 'Conheça os aparelhos, o espaço e o jeito de dar aula do estúdio, sem compromisso.' },
  { titulo: 'Escolha sua frequência', texto: 'Duas ou três vezes por semana, nos horários que cabem na sua rotina.' },
  { titulo: 'Sinta a diferença', texto: 'Respiração, postura e força melhorando aula após aula, com acompanhamento de perto.' },
]

export default function Home() {
  useSEO({
    title: 'Pilates na Trindade, Florianópolis | Ponto de Equilíbrio Pilates by Susy Aguiar',
    description:
      'Estúdio de pilates nos aparelhos na Trindade, Florianópolis. Turmas pequenas, instrutoras qualificadas e espaço novo. Nota 5,0 no Google. Agende uma aula experimental.',
    path: '/',
  })

  const hero = useRef<HTMLElement>(null)
  const pin = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({ delay: 0.5 })
          .from('[data-h="sub"]', { y: 22, opacity: 0, duration: 0.7 })
          .from('[data-h="cta"]', { y: 18, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.45')
          .from('[data-h="meta"]', { opacity: 0, duration: 0.5 }, '-=0.4')
      })
    },
    { scope: hero },
  )

  // Seção fixada: os aparelhos passam na horizontal conforme a rolagem (desktop, sem reduced-motion)
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const track = pin.current!.querySelector<HTMLElement>('[data-track]')!
        const dist = () => track.scrollWidth - track.parentElement!.clientWidth
        gsap.to(track, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin.current,
            start: 'top top',
            end: () => `+=${dist()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        gsap.fromTo('[data-pin-progress]', { scaleX: 0 }, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: pin.current, start: 'top top', end: () => `+=${dist()}`, scrub: true, invalidateOnRefresh: true },
        })
      })
    },
    { scope: pin },
  )

  return (
    <main>
      {/* HERO */}
      <section ref={hero} className="relative overflow-hidden pt-28 md:pt-36">
        <Noise />
        <div className="container-x relative">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <div data-h="meta" className="mb-7">
                <GoogleRating compact />
              </div>
              <SplitText
                as="h1"
                trigger="load"
                delay={0.1}
                stagger={0.045}
                text="Pilates nos aparelhos na Trindade, em turmas pequenas e com *atenção de verdade.*"
                className="font-display text-[2.15rem] leading-[1.06] text-ink sm:text-[3rem] lg:text-[4rem]"
              />
            </div>
            <div className="md:col-span-4 md:pb-2">
              <p data-h="sub" className="text-[1.08rem] text-mist">
                O estúdio da Susy Aguiar em Florianópolis, para quem busca{' '}
                <RotatingText words={['melhor postura', 'menos dor', 'mais força', 'equilíbrio', 'respirar melhor']} className="font-semibold text-pine" />.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <div data-h="cta">
                  <Magnet>
                    <ButtonPrimary href={waLink()} icon={<WaIcon size={18} />}>
                      Aula experimental
                    </ButtonPrimary>
                  </Magnet>
                </div>
                <div data-h="cta">
                  <ButtonSecondary to="/modalidades">Modalidades</ButtonSecondary>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-12 md:mt-16">
            <RevealImage
              priority
              src="/images/sala-frase-1200.webp"
              srcSet="/images/sala-frase-640.webp 640w, /images/sala-frase-1200.webp 1200w"
              sizes="(min-width: 1280px) 1200px, 94vw"
              width={1200}
              height={758}
              alt="Sala do Ponto de Equilíbrio Pilates com Chairs e Reformer de madeira, bolas suíças na parede e a frase de Joseph Pilates: é a mente que esculpe o corpo"
              className="aspect-[4/5] rounded-[28px] bg-sand sm:aspect-[16/8]"
              imgClassName="object-[38%_50%]"
            />
            <div data-h="meta" className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3 sm:bottom-6 sm:left-6 sm:right-6">
              <p className="rounded-2xl bg-paper/90 px-5 py-3 text-[0.92rem] text-ink backdrop-blur">
                <span className="font-semibold">Espaço novo</span> na Lauro Linhares, Trindade
              </p>
              <CenterMotif scrub={false} className="hidden h-24 w-24 text-bone/80 sm:block" />
            </div>
          </div>
        </div>

        <div className="mt-14 border-y border-line bg-paper/60 py-5 font-display text-[1.05rem] text-pine md:text-[1.3rem]">
          <LogoLoop items={[...servicos.map((s) => s.nome), 'Trindade · Florianópolis']} />
        </div>
      </section>

      {/* QUEM SOMOS */}
      <section aria-labelledby="sobre-titulo" className="py-24 md:py-36">
        <div className="container-x grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col justify-center md:order-2 md:col-span-6 md:col-start-7">
            <h2 id="sobre-titulo" className="sr-only">Sobre o estúdio</h2>
            <ScrollReveal
              as="p"
              className="font-display text-[1.55rem] leading-[1.3] text-ink md:text-[2.15rem]"
              text="O PEP é o estúdio da Susy Aguiar na Trindade. Um lugar para cuidar do corpo com calma, com instrutoras que acompanham cada aluna de perto."
            />
            <p className="mt-8 max-w-lg text-mist">
              Tem aluna que está com a gente há oito anos. Em {empresa.novoEspaco} o estúdio ganhou um espaço novo, mais amplo e
              iluminado, no Centro Executivo Ernesto Pausewang. Somos uma empresa de mulheres empreendedoras e um lugar onde todo mundo
              é bem-vindo, inclusive a comunidade LGBTQ+.
            </p>
            <div className="mt-8">
              <ButtonSecondary to="/sobre">Conheça o estúdio</ButtonSecondary>
            </div>
          </div>
          <div className="md:order-1 md:col-span-5">
            <RevealImage
              src="/images/recepcao-663.webp"
              width={663}
              height={785}
              alt="Recepção do estúdio com parede verde-menta, logo do Ponto de Equilíbrio Pilates e quatro cadeiras de espera"
              className="aspect-[4/5] rounded-[28px] bg-sand"
            />
          </div>
        </div>
      </section>

      {/* MODALIDADES */}
      <section aria-labelledby="mod-titulo" className="pb-24 md:pb-36">
        <div className="container-x">
          <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <SectionTitle id="mod-titulo" text="Um pilates para *cada momento*" className="max-w-2xl" />
            <ButtonSecondary to="/modalidades">Todas as modalidades</ButtonSecondary>
          </div>
          <div className="grid gap-4 md:grid-cols-12 md:gap-5">
            {servicos.map((s, i) => (
              <Link
                key={s.slug}
                to={`/modalidades/${s.slug}`}
                className={`block ${['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7'][i]}`}
              >
                <SpotlightCard className={`h-full rounded-[26px] ${i % 3 === 0 ? 'bg-pine text-bone' : 'border border-line bg-paper'}`} color={i % 3 === 0 ? 'rgba(109,176,143,0.22)' : undefined}>
                  <div className="grid h-full gap-0 sm:min-h-[300px] sm:grid-cols-[1fr_0.8fr]">
                    <div className="flex flex-col justify-between gap-8 p-7 md:p-9">
                      <div>
                        <h3 className="font-display text-[1.45rem] leading-tight md:text-[1.75rem]">{s.nome}</h3>
                        <p className={`mt-3 ${i % 3 === 0 ? 'text-bone/70' : 'text-mist'}`}>{s.beneficio}</p>
                      </div>
                      <span className={`grid h-11 w-11 place-items-center rounded-full border transition-transform duration-500 group-hover:rotate-45 ${i % 3 === 0 ? 'border-bone/30' : 'border-line'}`}>
                        <ArrowUpRight size={19} strokeWidth={1.5} />
                      </span>
                    </div>
                    <div className="relative hidden overflow-hidden sm:block">
                      <img src={s.imagem.src} width={s.imagem.w} height={s.imagem.h} alt="" loading="lazy" className="photo-grade absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* OS APARELHOS (seção fixada, rolagem horizontal) */}
      <section ref={pin} aria-labelledby="aparelhos-titulo" className="grain grain-dark relative overflow-hidden bg-pine text-bone md:flex md:h-screen md:flex-col md:justify-center">
        <div className="container-x pt-24 md:pt-0">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 id="aparelhos-titulo" className="max-w-xl font-display text-[1.95rem] leading-[1.08] md:text-[3rem]">
              Os aparelhos que você vai conhecer
            </h2>
            <p className="max-w-sm text-bone/70">Molas, barras e alças que ajudam ou desafiam o movimento, conforme o que o seu corpo precisa.</p>
          </div>
          <div className="mt-8 hidden h-px w-full bg-bone/15 md:block">
            <span data-pin-progress className="block h-px origin-left bg-amber" />
          </div>
        </div>
        <div className="mt-10 overflow-x-auto pb-24 md:mt-12 md:overflow-visible md:pb-0" data-lenis-prevent-wheel>
          <div data-track className="flex w-max snap-x snap-mandatory gap-4 px-[clamp(1.25rem,4vw,3rem)] md:snap-none md:gap-5">
            {aparelhos.map((a, i) => (
              <article
                key={a.nome}
                className={`flex h-[340px] w-[78vw] max-w-[380px] shrink-0 snap-start flex-col justify-between rounded-[24px] p-7 md:h-[400px] md:w-[360px] md:p-9 ${i % 2 ? 'bg-pine-deep' : 'bg-bone text-ink'}`}
              >
                <CenterMotif scrub={false} className={`h-20 w-20 ${i % 2 ? 'text-bone/70' : 'text-pine/70'}`} />
                <div>
                  <h3 className="font-display text-[1.7rem] md:text-[2rem]">{a.nome}</h3>
                  <p className={`mt-3 ${i % 2 ? 'text-bone/70' : 'text-mist'}`}>{a.texto}</p>
                </div>
              </article>
            ))}
            <div className="relative h-[340px] w-[78vw] max-w-[380px] shrink-0 snap-start overflow-hidden rounded-[24px] md:h-[400px] md:w-[300px]">
              <img src="/images/cadillac-acessorios-589.webp" width={589} height={786} loading="lazy" alt="Cadillac do estúdio ao lado da estante com arcos, faixas e bolas" className="photo-grade h-full w-full object-cover" />
            </div>
            <div className="relative h-[340px] w-[85vw] max-w-[560px] shrink-0 snap-start overflow-hidden rounded-[24px] md:h-[400px] md:w-[560px]">
              <img src="/images/aparelhos-831.webp" width={831} height={565} loading="lazy" alt="Cadillac, banquinho e Ladder Barrel de madeira sobre o piso verde do estúdio" className="photo-grade h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section aria-labelledby="dif-titulo" className="py-24 md:py-36">
        <div className="container-x">
          <div className="mb-14 max-w-3xl md:mb-20">
            <SectionTitle id="dif-titulo" text="Por que as alunas *ficam*" />
            <p className="mt-6 max-w-xl text-mist">Os pontos que mais aparecem nas avaliações do Google.</p>
          </div>
          <MagicBento
            items={[
              {
                title: 'Profissionais qualificadas e gentis',
                text: 'Instrutoras capacitadas, atenciosas e com uma energia que faz a aula passar rápido.',
                tone: 'pine',
                className: 'md:col-span-4',
                extra: <CenterMotif scrub={false} className="h-24 w-24 self-end text-bone/40" />,
              },
              {
                title: 'Nota no Google',
                text: `${empresa.google.avaliacoes} avaliações de alunas e alunos.`,
                tone: 'sand',
                className: 'md:col-span-2',
                extra: (
                  <div>
                    <p className="font-display text-[3.6rem] leading-none text-pine">
                      <CountUp to={empresa.google.nota} decimals={1} />
                    </p>
                    <Stars className="mt-3" />
                  </div>
                ),
              },
              { title: 'Espaço novo e aconchegante', text: 'Ambiente amplo, iluminado e sempre limpo, inaugurado em 2023.', className: 'md:col-span-2' },
              { title: 'Aparelhos higienizados', text: 'Cuidado com a limpeza de cada aparelho, aula após aula.', className: 'md:col-span-2' },
              { title: 'Todo mundo é bem-vindo', text: 'Uma empresa de mulheres empreendedoras que acolhe a comunidade LGBTQ+.', className: 'md:col-span-2' },
            ]}
          />
        </div>
      </section>

      {/* COMO COMEÇAR */}
      <section aria-labelledby="comecar-titulo" className="grain bg-sand py-24 md:py-32">
        <div className="container-x">
          <SectionTitle id="comecar-titulo" text="Como começar" />
          <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
            <span aria-hidden className="absolute left-0 right-0 top-[11px] hidden h-px bg-pine/20 md:block" />
            {passos.map((p) => (
              <li key={p.titulo} className="relative pl-10 md:pl-0 md:pt-12">
                <span aria-hidden className="absolute left-0 top-1 grid h-6 w-6 place-items-center rounded-full border border-pine/40 bg-sand md:top-0">
                  <span className="h-2 w-2 rounded-full bg-amber" />
                </span>
                <h3 className="font-display text-[1.25rem] leading-snug">{p.titulo}</h3>
                <p className="mt-3 text-mist">{p.texto}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14">
            <ButtonPrimary to="/planos-e-horarios#agenda">Escolher horário da aula experimental</ButtonPrimary>
          </div>
        </div>
      </section>

      <Reviews />

      {/* GALERIA */}
      <section aria-labelledby="galeria-titulo" className="pb-24 md:pb-36">
        <div className="container-x">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle id="galeria-titulo" text="Um espaço feito para *respirar*" className="max-w-2xl" />
            <ButtonSecondary to="/sobre#estrutura">Ver a estrutura</ButtonSecondary>
          </div>
          <Masonry items={galeria.slice(0, 5)} />
        </div>
      </section>

      {/* LOCALIZAÇÃO */}
      <section aria-labelledby="local-titulo" className="pb-24 md:pb-36">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionTitle id="local-titulo" text="Na Trindade, em *Florianópolis*" />
            <ul className="mt-10 space-y-6">
              <li className="flex gap-4">
                <MapPin className="mt-1 shrink-0 text-amber-ink" size={22} strokeWidth={1.5} />
                <div>
                  <a href={mapsLink} target="_blank" rel="noopener" className="text-[1.05rem] text-ink underline-offset-4 hover:underline">
                    {empresa.endereco.completo}
                  </a>
                  <p className="mt-1 text-sm text-mist">{empresa.endereco.complemento} {empresa.estacionamento}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="mt-1 shrink-0 text-amber-ink" size={22} strokeWidth={1.5} />
                <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-[1rem]">
                  {empresa.horarios.map((h) => (
                    <div key={h.dias} className="contents">
                      <dt className="text-mist">{h.dias}</dt>
                      <dd className="text-ink">{h.horas}</dd>
                    </div>
                  ))}
                </dl>
              </li>
              <li className="flex gap-4">
                <Phone className="mt-1 shrink-0 text-amber-ink" size={22} strokeWidth={1.5} />
                <a href={telLink} className="text-[1.05rem] text-ink underline-offset-4 hover:underline">{empresa.telefone}</a>
              </li>
            </ul>
          </div>
          <MapEmbed className="min-h-[340px] md:col-span-7 md:min-h-[460px]" />
        </div>
      </section>

      <FinalCTA />
    </main>
  )
}
