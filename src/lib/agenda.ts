import { empresa } from '../data/empresa'

const cfg = empresa.agenda

export type Dia = {
  iso: string // AAAA-MM-DD
  semana: string // "seg"
  semanaLonga: string // "segunda-feira"
  dia: string // "24"
  mes: string // "nov"
  mesLongo: string // "novembro"
  horarios: string[] // ["13:30", "14:00", …]
}

const toMin = (h: string) => {
  const [hh, mm] = h.split(':').map(Number)
  return hh * 60 + mm
}
const toHora = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`

/** Data e hora atuais no fuso do estúdio, independente de onde a pessoa está. */
function agoraNoConsultorio() {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: cfg.fuso,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(new Date())
      .map((x) => [x.type, x.value]),
  )
  return { y: +p.year, m: +p.month, d: +p.day, min: +p.hour * 60 + +p.minute }
}

const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC', ...opts })
const fSemana = fmt({ weekday: 'short' })
const fSemanaLonga = fmt({ weekday: 'long' })
const fMes = fmt({ month: 'short' })
const fMesLongo = fmt({ month: 'long' })

/** Gera os dias de atendimento das próximas semanas, com os horários disponíveis em cada um. */
export function gerarDias(): Dia[] {
  const agora = agoraNoConsultorio()
  const hoje = new Date(Date.UTC(agora.y, agora.m - 1, agora.d))
  const inicio = toMin(cfg.inicio)
  const fim = toMin(cfg.fim)
  const dias: Dia[] = []

  for (let i = 0; i < cfg.semanas * 7 + 7 && dias.length < cfg.semanas * cfg.diasSemana.length; i++) {
    const data = new Date(hoje.getTime() + i * 86400000)
    const iso = data.toISOString().slice(0, 10)
    if (!cfg.diasSemana.includes(data.getUTCDay()) || cfg.feriados.includes(iso)) continue

    const horarios: string[] = []
    for (let m = inicio; m + cfg.intervaloMin <= fim; m += cfg.intervaloMin) {
      if (i === 0 && m < agora.min + cfg.antecedenciaMin) continue
      horarios.push(toHora(m))
    }
    if (!horarios.length) continue

    dias.push({
      iso,
      semana: fSemana.format(data).replace('.', ''),
      semanaLonga: fSemanaLonga.format(data),
      dia: String(data.getUTCDate()),
      mes: fMes.format(data).replace('.', ''),
      mesLongo: fMesLongo.format(data),
      horarios,
    })
  }
  return dias
}

export const periodo = (h: string) => (toMin(h) < 12 * 60 ? 'Manhã' : toMin(h) < 18 * 60 ? 'Tarde' : 'Noite')
