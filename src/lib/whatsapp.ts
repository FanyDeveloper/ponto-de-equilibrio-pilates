import { empresa } from '../data/empresa'

export const waLink = (mensagem = 'Olá! Vim pelo site e gostaria de agendar uma aula experimental.') =>
  `https://wa.me/${empresa.whatsapp}?text=${encodeURIComponent(mensagem)}`

export const waServico = (servico: string) =>
  waLink(`Olá! Vi no site a modalidade ${servico} e gostaria de mais informações.`)

export const telLink = `tel:${empresa.telefoneE164}`
