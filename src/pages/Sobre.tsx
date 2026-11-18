import { useSEO } from '../hooks/useSEO'
import { aparelhos, empresa, galeria } from '../data/empresa'
import PageHero from '../components/PageHero'
import RevealImage from '../components/RevealImage'
import SectionTitle from '../components/SectionTitle'
import ScrollReveal from '../components/reactbits/ScrollReveal'
import Masonry from '../components/reactbits/Masonry'
import GoogleRating from '../components/GoogleRating'
import CenterMotif from '../components/CenterMotif'
import FinalCTA from '../components/FinalCTA'

const valores = [
  { nome: 'Atenção', texto: 'Turmas pequenas para a instrutora enxergar cada aluna, corrigir e adaptar o exercício na hora.' },
  { nome: 'Acolhimento', texto: 'Um lugar onde todo mundo é bem-vindo, do jeito que é, inclusive a comunidade LGBTQ+.' },
  { nome: 'Cuidado', texto: 'Espaço limpo, aparelhos higienizados e aulas pensadas para o corpo de cada uma.' },
]

export default function Sobre() {
  useSEO({
    title: 'O Estúdio | Ponto de Equilíbrio Pilates by Susy Aguiar – Trindade, Florianópolis',
    description:
      'Conheça o Ponto de Equilíbrio Pilates, estúdio da Susy Aguiar na Trindade, Florianópolis: história, valores, equipe, aparelhos e fotos do espaço.',
    path: '/sobre',
  })
  return (
    <main>
      <PageHero
        title="Um estúdio para cuidar do corpo *com calma.*"
        intro="O Ponto de Equilíbrio Pilates é o estúdio da Susy Aguiar na Trindade, em Florianópolis. As alunas chamam de PEP, e muitas estão com a gente há anos."
        aside={<GoogleRating />}
      />

      <section aria-labelledby="historia-titulo" className="pb-24 md:pb-36">
        <div className="container-x grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <RevealImage
              src="/images/recepcao-663.webp"
              width={663}
              height={785}
              alt="Recepção do estúdio com a parede verde-menta e o logo do Ponto de Equilíbrio Pilates"
              className="aspect-[4/5] rounded-[28px] bg-sand md:sticky md:top-28"
            />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <SectionTitle id="historia-titulo" text="A nossa história" />
            <div className="mt-10 space-y-6 text-[1.06rem] text-mist">
              <p>
                O estúdio nasceu do trabalho da Susy Aguiar com pilates em Florianópolis. Fundação: {empresa.fundacao}. Ao longo dos anos,
                formou uma turma fiel: tem aluna que treina aqui há oito anos.
              </p>
              <p>
                Em {empresa.novoEspaco}, o PEP se mudou para um espaço novo no Centro Executivo Ernesto Pausewang, na Rua Lauro Linhares.
                Mais amplo, iluminado, com piso emborrachado, aparelhos de madeira e uma copa para um chá antes ou depois da aula.
              </p>
              <p>
                Somos uma empresa de mulheres empreendedoras. E fazemos questão de ser um lugar onde qualquer pessoa se sinta à vontade
                para cuidar de si.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Frase de Joseph Pilates" className="grain grain-dark relative overflow-hidden bg-pine py-24 text-bone md:py-36">
        <CenterMotif className="pointer-events-none absolute -right-40 top-1/2 w-[640px] -translate-y-1/2 text-bone/15" />
        <div className="container-x relative max-w-5xl">
          <ScrollReveal
            as="p"
            className="font-display text-[1.6rem] leading-[1.3] md:text-[2.6rem]"
            text="“É estar presente, concentrado e não distraído. É a mente que esculpe o corpo.”"
          />
          <p className="mt-8 text-bone/60">Joseph Pilates · a frase que está na parede da nossa sala</p>
        </div>
      </section>

      <section aria-labelledby="valores-titulo" className="py-24 md:py-32">
        <div className="container-x">
          <SectionTitle id="valores-titulo" text="O que guia as nossas aulas" className="max-w-2xl" />
          <dl className="mt-16 grid gap-y-12 md:grid-cols-12">
            {valores.map((v, i) => (
              <div key={v.nome} className={`border-t border-line pt-6 md:col-span-4 md:pr-10 ${i === 1 ? 'md:mt-14' : i === 2 ? 'md:mt-28' : ''}`}>
                <dt className="font-display text-[1.7rem] text-amber-ink">{v.nome}</dt>
                <dd className="mt-4 text-mist">{v.texto}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="equipe-titulo" className="pb-24 md:pb-32">
        <div className="container-x grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <SectionTitle id="equipe-titulo" text="Quem dá as aulas" />
            <p className="mt-6 text-mist">
              A Susy Aguiar lidera o estúdio e a equipe de instrutoras. Nas avaliações, as alunas falam de profissionais super
              qualificadas, gentis e com uma energia positiva incrível.
            </p>
            <p className="mt-4 text-sm text-mist">{empresa.registro}</p>
          </div>
          {/* Espaços reservados: trocar pelas fotos e nomes reais da equipe */}
          <div className="grid gap-4 sm:grid-cols-2 md:col-span-7">
            {['Susy Aguiar', '[CONFIRMAR: nome da instrutora]'].map((n) => (
              <figure key={n} className="grain flex aspect-[4/5] flex-col justify-end rounded-[24px] border border-dashed border-pine/30 bg-sand p-6">
                <p className="font-display text-xl text-pine">{n}</p>
                <figcaption className="mt-2 text-sm text-mist">[CONFIRMAR: retrato vertical com luz natural, no estúdio, sem pose de banco de imagem]</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="estrutura" aria-labelledby="estrutura-titulo" className="scroll-mt-24 bg-sand py-24 md:py-32">
        <div className="container-x">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <SectionTitle id="estrutura-titulo" text="A estrutura" />
              <p className="mt-6 text-mist">Aparelhos de madeira, piso emborrachado, ar-condicionado e muita luz natural.</p>
            </div>
            <dl className="grid gap-x-10 md:col-span-8 md:grid-cols-2">
              {aparelhos.map((a) => (
                <div key={a.nome} className="border-t border-pine/15 py-6">
                  <dt className="font-display text-[1.25rem] text-pine">{a.nome}</dt>
                  <dd className="mt-2 text-mist">{a.texto}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-16">
            <Masonry items={galeria} />
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  )
}
