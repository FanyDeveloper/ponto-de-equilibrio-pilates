import { useMemo, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { CalendarCheck, ChevronLeft, ChevronRight, Clock, MessageCircle } from 'lucide-react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { empresa, servicos } from '../data/empresa'
import { gerarDias, periodo, type Dia } from '../lib/agenda'
import { waLink } from '../lib/whatsapp'
import SectionTitle from './SectionTitle'
import ButtonPrimary from './ui/ButtonPrimary'
import Checkbox from './ui/Checkbox'
import { FloatingInput, FloatingSelect } from './ui/FloatingField'
import Noise from './reactbits/Noise'
import { WaIcon } from './Header'

const cap = (t?: string) => (t ? t[0].toUpperCase() + t.slice(1) : '')
const fSem = new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC', weekday: 'short' })

/** Os 5 dias úteis da semana do primeiro dia da lista, marcando os indisponíveis. */
function semanaCompleta(semana: Dia[]) {
  if (!semana.length) return []
  const dt = new Date(semana[0].iso + 'T00:00:00Z')
  const seg = dt.getTime() - ((dt.getUTCDay() + 6) % 7) * 86400000
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(seg + i * 86400000)
    const iso = d.toISOString().slice(0, 10)
    const disp = semana.find((x) => x.iso === iso)
    return disp
      ? { iso, disp }
      : {
          iso,
          disp: null,
          semana: fSem.format(d).replace('.', ''),
          dia: String(d.getUTCDate()),
          motivo: empresa.agenda.feriados.includes(iso) ? 'Feriado' : 'Encerrado',
        }
  })
}

const opcoes = ['Aula experimental', ...servicos.map((s) => s.nome)]

/** Agrupa os dias por semana (segunda como início). */
function porSemana(dias: Dia[]) {
  const semanas: Dia[][] = []
  let chave = ''
  for (const d of dias) {
    const dt = new Date(d.iso + 'T00:00:00Z')
    const seg = new Date(dt.getTime() - ((dt.getUTCDay() + 6) % 7) * 86400000).toISOString().slice(0, 10)
    if (seg !== chave) {
      semanas.push([])
      chave = seg
    }
    semanas[semanas.length - 1].push(d)
  }
  return semanas
}

/**
 * Agenda online: a pessoa escolhe dia e horário dentro do expediente
 * e o pedido abre no WhatsApp para o estúdio confirmar.
 */
export default function Agenda() {
  const dias = useMemo(gerarDias, [])
  const semanas = useMemo(() => porSemana(dias), [dias])
  const [semana, setSemana] = useState(0)
  const [diaIso, setDiaIso] = useState(dias[0]?.iso ?? '')
  const [hora, setHora] = useState('')
  const [nome, setNome] = useState('')
  const [servico, setServico] = useState('')
  const [aceite, setAceite] = useState(false)
  const [erros, setErros] = useState<{ hora?: string; nome?: string; servico?: string; aceite?: string }>({})
  const ref = useRef<HTMLElement>(null)

  const dia = dias.find((d) => d.iso === diaIso)
  const grupos = useMemo(() => {
    const g: Record<string, string[]> = {}
    dia?.horarios.forEach((h) => (g[periodo(h)] ??= []).push(h))
    return Object.entries(g)
  }, [dia])

  // Horários entram em sequência a cada troca de dia
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.fromTo('[data-slot]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.025, ease: 'power3.out', overwrite: true })
    },
    { scope: ref, dependencies: [diaIso] },
  )

  const escolherDia = (iso: string) => {
    setDiaIso(iso)
    setHora('')
  }
  const mudarSemana = (dir: number) => {
    const nova = Math.min(semanas.length - 1, Math.max(0, semana + dir))
    setSemana(nova)
    escolherDia(semanas[nova][0].iso)
  }

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    const e: typeof erros = {}
    if (!hora) e.hora = 'Escolha um horário.'
    if (nome.trim().length < 2) e.nome = 'Escreva seu nome.'
    if (!servico) e.servico = 'Escolha uma opção.'
    if (!aceite) e.aceite = 'Para enviar, é preciso concordar com o uso dos dados.'
    setErros(e)
    if (Object.keys(e).length || !dia) {
      if (e.hora) document.getElementById('agenda-horarios')?.focus()
      else document.getElementById(e.nome ? 'agenda-nome' : e.servico ? 'agenda-servico' : 'agenda-aceite')?.focus()
      return
    }
    const [, mm, dd] = dia.iso.split('-')
    const texto = [
      'Olá! Gostaria de agendar uma aula experimental pelo site.',
      '',
      `*Dia:* ${dia.semanaLonga}, ${dd}/${mm}`,
      `*Horário:* ${hora} (horário de Brasília)`,
      `*Nome:* ${nome.trim()}`,
      `*Interesse:* ${servico}`,
      '',
      'Aguardo a confirmação.',
    ].join('\n')
    // Abre dentro do clique para não ser bloqueado como pop-up
    const a = document.createElement('a')
    a.href = waLink(texto)
    a.target = '_blank'
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  if (!dias.length) return null
  const atual = semanas[semana] ?? []

  return (
    <section ref={ref} id="agenda" aria-labelledby="agenda-titulo" className="relative scroll-mt-24 overflow-hidden bg-sand py-24 md:py-32">
      <Noise opacity={0.3} />
      <div className="container-x relative grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <SectionTitle id="agenda-titulo" text="Agende sua aula *experimental*" />
          <p className="mt-6 max-w-sm text-mist">
            Escolha o dia e o horário que cabem na sua rotina e envie o pedido. O estúdio confirma pelo WhatsApp e já tira suas
            dúvidas sobre planos.
          </p>
          <ul className="mt-10 space-y-5 text-[0.98rem]">
            <li className="flex gap-3">
              <Clock size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-amber-ink" />
              <span>
                <strong className="font-semibold text-ink">{empresa.horarioResumo}</strong>
                <br />
                <span className="text-mist">Horário de Brasília</span>
              </span>
            </li>
            <li className="flex gap-3">
              <MessageCircle size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-amber-ink" />
              <span className="text-mist">O horário só fica reservado depois da confirmação no WhatsApp.</span>
            </li>
            <li className="flex gap-3">
              <CalendarCheck size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-amber-ink" />
              <span className="text-mist">Não achou um horário bom? Chame no WhatsApp que a gente encontra um.</span>
            </li>
          </ul>
        </div>

        <form onSubmit={onSubmit} noValidate className="rounded-[26px] border border-line/70 bg-paper p-5 shadow-[0_30px_60px_-40px_rgba(20,39,41,0.45)] sm:p-8 md:col-span-8 md:p-10">
          {/* Semana */}
          <div className="flex items-center justify-between gap-4">
            <p className="font-display text-[1.45rem] leading-tight md:text-[1.7rem]" aria-live="polite">
              {cap(atual[0]?.mesLongo)}
              {atual[atual.length - 1]?.mesLongo !== atual[0]?.mesLongo && ` – ${atual[atual.length - 1]?.mesLongo}`}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => mudarSemana(-1)}
                disabled={semana === 0}
                aria-label="Semana anterior"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-pine transition-colors hover:border-pine disabled:opacity-35 disabled:hover:border-line"
              >
                <ChevronLeft size={18} strokeWidth={1.6} />
              </button>
              <button
                type="button"
                onClick={() => mudarSemana(1)}
                disabled={semana >= semanas.length - 1}
                aria-label="Próxima semana"
                className="grid h-11 w-11 place-items-center rounded-full border border-line text-pine transition-colors hover:border-pine disabled:opacity-35 disabled:hover:border-line"
              >
                <ChevronRight size={18} strokeWidth={1.6} />
              </button>
            </div>
          </div>

          {/* Dias */}
          <fieldset className="mt-6">
            <legend className="sr-only">Dia</legend>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
              {semanaCompleta(atual).map((c) => {
                if (!c.disp)
                  return (
                    <div key={c.iso} aria-hidden className="flex flex-col items-center rounded-2xl border border-dashed border-line py-3 text-mist/60 sm:py-4">
                      <span className="text-[0.72rem] font-semibold uppercase tracking-[0.12em]">{c.semana}</span>
                      <span className="mt-1 font-display text-[1.6rem] leading-none line-through decoration-1 sm:text-[2rem]">{c.dia}</span>
                      <span className="mt-1.5 text-[0.65rem] sm:text-[0.7rem]">{c.motivo}</span>
                    </div>
                  )
                const d = c.disp
                const ativo = d.iso === diaIso
                return (
                  <label
                    key={d.iso}
                    className={`relative flex cursor-pointer flex-col items-center rounded-2xl border py-3 transition-all duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-amber-ink sm:py-4 ${ativo ? 'border-pine bg-pine text-bone' : 'border-line bg-bone/60 text-ink hover:border-pine/50'}`}
                  >
                    <input type="radio" name="dia" value={d.iso} checked={ativo} onChange={() => escolherDia(d.iso)} className="sr-only" />
                    <span className={`text-[0.72rem] font-semibold uppercase tracking-[0.12em] ${ativo ? 'text-bone/70' : 'text-mist'}`}>{d.semana}</span>
                    <span className="mt-1 font-display text-[1.6rem] leading-none sm:text-[2rem]">{d.dia}</span>
                    <span className={`mt-1.5 text-[0.65rem] sm:text-[0.7rem] ${ativo ? 'text-bone/70' : 'text-mist'}`}>
                      {d.horarios.length} {d.horarios.length === 1 ? 'horário' : 'horários'}
                    </span>
                    <span className="sr-only">
                      {d.semanaLonga}, {d.dia} de {d.mesLongo}
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          {/* Horários */}
          <fieldset
            id="agenda-horarios"
            tabIndex={-1}
            aria-describedby={erros.hora ? 'agenda-hora-err' : undefined}
            className="mt-8 outline-none"
          >
            <legend className="text-[0.95rem] text-mist">
              Horários de <span className="font-semibold text-ink">{dia?.semanaLonga}, {dia?.dia}</span>
            </legend>
            {grupos.map(([nomeGrupo, hs]) => (
              <div key={nomeGrupo} className="mt-5">
                <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-mist">{nomeGrupo}</p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {hs.map((h) => {
                    const ativo = h === hora
                    return (
                      <label
                        data-slot
                        key={h}
                        className={`cursor-pointer rounded-full border py-2.5 text-center text-[0.98rem] tabular-nums transition-all duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-amber-ink ${ativo ? 'border-amber bg-amber font-semibold text-pine-deep' : 'border-line bg-bone/60 hover:border-pine/60'}`}
                      >
                        <input
                          type="radio"
                          name="hora"
                          value={h}
                          checked={ativo}
                          onChange={() => {
                            setHora(h)
                            setErros((p) => ({ ...p, hora: undefined }))
                          }}
                          className="sr-only"
                        />
                        {h}
                      </label>
                    )
                  })}
                </div>
              </div>
            ))}
            {erros.hora && (
              <p id="agenda-hora-err" className="mt-3 text-sm text-[#9b2c1f]">
                {erros.hora}
              </p>
            )}
          </fieldset>

          {/* Dados e envio */}
          <div className="mt-10 border-t border-line pt-8">
            <p className="font-display text-[1.35rem] leading-snug md:text-[1.6rem]" aria-live="polite">
              {hora ? (
                <>
                  {cap(dia?.semanaLonga)}, {dia?.dia} de {dia?.mesLongo} às{' '}
                  <em className="text-amber-ink">{hora}</em>
                </>
              ) : (
                <span className="text-mist">Selecione um horário acima</span>
              )}
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <FloatingInput
                id="agenda-nome"
                label="Seu nome"
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value)
                  setErros((p) => ({ ...p, nome: undefined }))
                }}
                error={erros.nome}
                required
                autoComplete="name"
              />
              <FloatingSelect
                id="agenda-servico"
                label="O que você procura?"
                value={servico}
                options={opcoes}
                onChange={(e) => {
                  setServico(e.target.value)
                  setErros((p) => ({ ...p, servico: undefined }))
                }}
                error={erros.servico}
                required
              />
            </div>
            <div className="mt-5">
              <Checkbox
                id="agenda-aceite"
                checked={aceite}
                onChange={(v) => {
                  setAceite(v)
                  setErros((p) => ({ ...p, aceite: undefined }))
                }}
                error={erros.aceite}
              >
                Concordo que meu nome e o horário escolhido sejam usados apenas para o agendamento, conforme a{' '}
                <Link to="/politica-de-privacidade" className="text-pine underline underline-offset-2">Política de Privacidade</Link>.
              </Checkbox>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <ButtonPrimary type="submit" icon={<WaIcon size={18} />}>
                Pedir esta aula
              </ButtonPrimary>
              <p className="text-sm text-mist">Abre o WhatsApp com o pedido pronto.</p>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
