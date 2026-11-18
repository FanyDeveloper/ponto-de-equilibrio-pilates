import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'
import { empresa } from '../data/empresa'
import PageHero from '../components/PageHero'

const atualizado = '18 de novembro de 2026'

export default function Privacidade() {
  useSEO({
    title: 'Política de Privacidade | Ponto de Equilíbrio Pilates',
    description: 'Como o Ponto de Equilíbrio Pilates trata dados pessoais e cookies, conforme a LGPD (Lei 13.709/2018).',
    path: '/politica-de-privacidade',
  })
  const h2 = 'mt-14 font-display text-[1.7rem] text-ink md:text-[2rem]'
  return (
    <main>
      <PageHero title="Política de Privacidade" intro={`Última atualização: ${atualizado}.`} />
      <section className="pb-28">
        <div className="container-x">
          <article className="max-w-3xl space-y-5 text-[1.05rem] text-mist [&_strong]:text-ink">
            <p>
              Esta política explica como o <strong>{empresa.nome}</strong> trata os dados pessoais de quem visita este site, em
              conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 – LGPD).
            </p>

            <h2 className={h2}>Quem é o responsável</h2>
            <p>
              Controlador: {empresa.nome} ({empresa.responsavel}). CPF/CNPJ: [CONFIRMAR]. Endereço: {empresa.endereco.completo}.
              Contato para assuntos de privacidade: {empresa.email} ou WhatsApp {empresa.telefone}.
            </p>

            <h2 className={h2}>Quais dados coletamos</h2>
            <p>
              <strong>Formulário de agendamento:</strong> nome, telefone, serviço de interesse e a mensagem que você escrever. Esses dados
              não são gravados no site nem em banco de dados. Ao enviar, o formulário apenas abre o WhatsApp no seu aparelho com o texto
              pronto, e você decide se envia ou não.
            </p>
            <p>
              <strong>Agenda de aula experimental:</strong> nome, modalidade de interesse e o dia e horário escolhidos. Assim como o formulário, a agenda
              não grava nada no site: ela só monta a mensagem e abre o WhatsApp para você enviar o pedido.
            </p>
            <p>
              <strong>Conversa pelo WhatsApp:</strong> as mensagens trocadas ficam no WhatsApp do estúdio e no seu, sujeitas também à
              política de privacidade do WhatsApp (Meta).
            </p>
            <p>
              <strong>Dados de saúde:</strong> informações sobre dores, lesões ou gestação que você compartilhar servem apenas para
              adaptar as aulas e são tratadas com sigilo. Evite enviar exames pelo formulário.
            </p>

            <h2 className={h2}>Para que usamos</h2>
            <p>
              Apenas para responder ao seu contato e agendar aulas. A base legal é o seu consentimento (art. 7º, I, da LGPD),
              dado ao marcar a caixa de concordância no formulário. Não vendemos nem compartilhamos seus dados para publicidade.
            </p>

            <h2 className={h2}>Cookies</h2>
            <p>
              O site guarda no seu navegador apenas a sua escolha no aviso de cookies. Ele não usa cookies de publicidade.{' '}
              [CONFIRMAR: se for instalado Google Analytics ou Meta Pixel, atualizar este parágrafo.]
            </p>
            <p>
              Os <strong>posts do Instagram</strong> na página inicial só são carregados se você aceitar os cookies ou clicar em “Mostrar
              posts”. Quando carregados, o Instagram (Meta) pode gravar cookies próprios, conforme a política de privacidade da Meta.
            </p>
            <p>
              O <strong>mapa do Google</strong> só é carregado se você aceitar os cookies ou clicar em “Mostrar mapa”. Quando carregado, o
              Google pode gravar cookies próprios, conforme a política de privacidade do Google.
            </p>

            <h2 className={h2}>Por quanto tempo guardamos</h2>
            <p>
              As conversas de agendamento e as fichas de alunas são mantidas pelo tempo necessário às aulas e às obrigações legais.
              [CONFIRMAR: prazo de retenção adotado pelo estúdio]
            </p>

            <h2 className={h2}>Seus direitos</h2>
            <p>
              Você pode, a qualquer momento, pedir para confirmar se tratamos seus dados, acessá-los, corrigi-los, excluí-los ou revogar o
              consentimento (art. 18 da LGPD). Basta entrar em contato pelos canais acima. Você também pode reclamar à Autoridade
              Nacional de Proteção de Dados (ANPD).
            </p>

            <h2 className={h2}>Alterações</h2>
            <p>Esta política pode ser atualizada. A data no topo da página indica a última revisão.</p>

            <p className="pt-8">
              <Link to="/contato" className="text-pine underline underline-offset-2">Voltar para o contato</Link>
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}
