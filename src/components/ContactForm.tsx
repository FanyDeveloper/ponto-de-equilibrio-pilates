import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { servicos } from '../data/empresa'
import { waLink } from '../lib/whatsapp'
import { FloatingInput, FloatingSelect, FloatingTextarea } from './ui/FloatingField'
import Checkbox from './ui/Checkbox'
import Loader from './ui/Loader'
import ButtonPrimary from './ui/ButtonPrimary'

type Dados = { nome: string; telefone: string; servico: string; mensagem: string; consentimento: boolean }
type Erros = Partial<Record<keyof Dados, string>>

const opcoes = ['Aula experimental', ...servicos.map((s) => s.nome), 'Planos e valores']

function mascaraTelefone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

function validar(d: Dados): Erros {
  const e: Erros = {}
  if (d.nome.trim().length < 2) e.nome = 'Escreva seu nome.'
  const digits = d.telefone.replace(/\D/g, '')
  if (digits.length < 10) e.telefone = 'Informe um telefone com DDD.'
  if (!d.servico) e.servico = 'Escolha uma opção.'
  if (d.mensagem.length > 800) e.mensagem = 'Mensagem muito longa (máx. 800 caracteres).'
  if (!d.consentimento) e.consentimento = 'Para enviar, é preciso concordar com o uso dos dados.'
  return e
}

/** Formulário que valida no navegador e abre o WhatsApp com os dados formatados. Nada é armazenado. */
export default function ContactForm({ servicoInicial = '' }: { servicoInicial?: string }) {
  const [d, setD] = useState<Dados>({ nome: '', telefone: '', servico: servicoInicial, mensagem: '', consentimento: false })
  const [erros, setErros] = useState<Erros>({})
  const [enviando, setEnviando] = useState(false)

  const set = <K extends keyof Dados>(k: K, v: Dados[K]) => {
    setD((p) => ({ ...p, [k]: v }))
    if (erros[k]) setErros((p) => ({ ...p, [k]: undefined }))
  }

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    const e = validar(d)
    setErros(e)
    if (Object.keys(e).length) {
      document.getElementById(Object.keys(e)[0])?.focus()
      return
    }
    setEnviando(true)
    const texto = [
      'Olá! Vim pelo site do estúdio.',
      '',
      `*Nome:* ${d.nome.trim()}`,
      `*Telefone:* ${d.telefone}`,
      `*Interesse:* ${d.servico}`,
      d.mensagem.trim() ? `*Mensagem:* ${d.mensagem.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n')
    // Abre na hora (dentro do clique) para não ser bloqueado como pop-up
    const a = document.createElement('a')
    a.href = waLink(texto)
    a.target = '_blank'
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.setTimeout(() => setEnviando(false), 900)
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4" aria-describedby="form-nota">
      <div className="grid gap-4 sm:grid-cols-2">
        <FloatingInput id="nome" label="Seu nome" value={d.nome} onChange={(e) => set('nome', e.target.value)} error={erros.nome} required autoComplete="name" />
        <FloatingInput
          id="telefone"
          label="WhatsApp com DDD"
          type="tel"
          inputMode="tel"
          value={d.telefone}
          onChange={(e) => set('telefone', mascaraTelefone(e.target.value))}
          error={erros.telefone}
          required
          autoComplete="tel-national"
        />
      </div>
      <FloatingSelect id="servico" label="O que você procura?" value={d.servico} options={opcoes} onChange={(e) => set('servico', e.target.value)} error={erros.servico} required />
      <FloatingTextarea id="mensagem" label="Conte seu objetivo ou alguma dor/limitação (opcional)" value={d.mensagem} onChange={(e) => set('mensagem', e.target.value)} error={erros.mensagem} />
      <Checkbox id="consentimento" checked={d.consentimento} onChange={(v) => set('consentimento', v)} error={erros.consentimento}>
        Concordo que meus dados sejam usados apenas para o estúdio responder meu contato, conforme a{' '}
        <Link to="/politica-de-privacidade" className="text-pine underline underline-offset-2">Política de Privacidade</Link>.
      </Checkbox>
      <div className="flex flex-wrap items-center gap-5 pt-2">
        <ButtonPrimary type="submit" disabled={enviando}>
          {enviando ? <Loader label="Abrindo o WhatsApp" /> : 'Enviar pelo WhatsApp'}
        </ButtonPrimary>
        <p id="form-nota" className="text-sm text-mist">
          O envio abre o WhatsApp com a mensagem pronta. Nada fica salvo no site.
        </p>
      </div>
    </form>
  )
}
