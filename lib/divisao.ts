/**
 * Link único dos anúncios: o domínio puro (ex.: eventogeneral.metodoconsistente.com/).
 *
 * Quem abre "/" recebe uma das variações do teste da vez, no MESMO endereço e sem servidor no caminho:
 * "/" (e "/intl") é uma página fixa em cache com o texto de todas as variações, e um script de ~1 KB
 * (lib/sorteio.ts) sorteia pelos pesos abaixo antes de a tela pintar. A variação sorteada vai para o
 * painel, a planilha e o formulário ("/v2" mesmo com o endereço "/"). Mais rápido que sortear no
 * servidor (proxy/middleware), que deixava o domínio puro mais lento no PageSpeed.
 *
 * COMO TROCAR DE TESTE (o anúncio nunca muda, a Meta não reaprende):
 *  1. Acrescente um teste novo em TESTES_DIVISAO com o dia de início e as variações + pesos.
 *     Vale a partir de 00:00 (Uruguai) do dia de início; o anterior para sozinho.
 *  2. Faça o push. Pode deixar o próximo teste já agendado com antecedência.
 *  3. No painel (aba Páginas → Testes das páginas), crie o teste com o mesmo nome, as mesmas
 *     páginas e o período: os dados de cada teste ficam separados pelas datas.
 *  Variação "/" = a página principal (controle). Peso 0 = fora do teste.
 *  Variação que não existe neste projeto (VARIACOES_EXISTENTES) é ignorada, nunca vira 404.
 *
 * QUEM VOLTA vê a mesma variação durante o teste (cookie). Em teste novo, sorteia de novo.
 * SEM TESTE ATIVO (antes do 1º início), "/" continua sendo a página principal.
 *
 * VERIFICAR SEM ESPERAR A DATA: ?previa=AAAA-MM-DD simula o dia; ?variacao=v2 força a variação.
 * (nenhum dos dois grava cookie). Junte ?tde_teste=1 para não sujar a Meta nem o painel.
 */

/**
 * LIGA/DESLIGA o link único sem mexer no código: variável de ambiente LINK_UNICO no projeto da Vercel.
 *   LINK_UNICO = ligado  → o domínio puro sorteia as variações do teste da vez (abaixo).
 *   sem a variável (ou qualquer outro valor) → o domínio puro mostra só a página principal, igual ao
 *   lançamento anterior: sem sorteio, sem script e sem os textos das variações na página.
 * Depois de mudar a variável: Deployments → ⋯ → Redeploy (a página é gerada no deploy).
 */
export const LINK_UNICO_ATIVO = process.env.LINK_UNICO === "ligado"

export type TesteDivisao = {
  nome: string
  /** AAAA-MM-DD, horário do Uruguai */
  inicio: string
  /** caminho → peso (proporção). Ex.: { "/v1": 34, "/v2": 33, "/v3": 33 } */
  variacoes: Record<string, number>
}

export const TESTES_DIVISAO: TesteDivisao[] = [
  // Teste 1 do Emi, headlines oficiais (A=/v1, B=/v2, C=/v3, D=/v4), a partir de hoje.
  // Nome novo = sorteio novo para todo mundo (quem já tinha caído nos textos provisórios é sorteado de novo).
  { nome: "Teste 1 · Headline oficial", inicio: "2026-10-26", variacoes: { "/v1": 25, "/v2": 25, "/v3": 25, "/v4": 25 } },
]

/** Variações que existem neste projeto (cada uma com a sua versão -intl). Página nova (/v4…) entra aqui. */
export const VARIACOES_EXISTENTES = ["/", "/v1", "/v2", "/v3", "/v4"]

export const COOKIE_DIVISAO = "tde_div"
export const DURACAO_COOKIE = 60 * 60 * 24 * 30

const DIA = /^\d{4}-\d{2}-\d{2}$/

/** Dia de hoje (AAAA-MM-DD) no horário do Uruguai. */
export function diaUruguai(agora: Date = new Date()): string {
  return agora.toLocaleDateString("en-CA", { timeZone: "America/Montevideo" })
}

function normalizar(caminho: string): string {
  const c = ("/" + String(caminho).trim().replace(/^\/+|\/+$/g, "")).toLowerCase()
  return c
}

/** Pesos válidos do teste: só variações existentes e com peso > 0. */
export function pesosValidos(t: TesteDivisao, existentes: string[] = VARIACOES_EXISTENTES): [string, number][] {
  const ok = new Set(existentes.map(normalizar))
  return Object.entries(t.variacoes)
    .map(([c, p]) => [normalizar(c), Number(p)] as [string, number])
    .filter(([c, p]) => ok.has(c) && Number.isFinite(p) && p > 0)
}

/** Teste da vez: o último que já começou e tem ao menos uma variação válida. */
export function testeAtivo(dia: string, testes: TesteDivisao[] = TESTES_DIVISAO, existentes: string[] = VARIACOES_EXISTENTES): TesteDivisao | null {
  const validos = testes
    .filter((t) => DIA.test(t.inicio) && t.inicio <= dia && pesosValidos(t, existentes).length > 0)
    .sort((a, b) => a.inicio.localeCompare(b.inicio))
  return validos[validos.length - 1] ?? null
}

/** Sorteio pelo peso. `r` entre 0 e 1. */
export function sortear(pesos: [string, number][], r: number): string {
  const total = pesos.reduce((s, [, p]) => s + p, 0)
  let alvo = Math.min(Math.max(r, 0), 0.999999999) * total
  for (const [c, p] of pesos) {
    if (alvo < p) return c
    alvo -= p
  }
  return pesos[pesos.length - 1][0]
}

const chaveTeste = (t: TesteDivisao) => `${t.inicio}~${t.nome}`

export function lerCookie(valor: string | undefined | null): { teste: string; caminho: string } | null {
  if (!valor) return null
  try {
    const v = valor.includes("|") ? valor : decodeURIComponent(valor)
    const i = v.lastIndexOf("|")
    if (i < 0) return null
    return { teste: v.slice(0, i), caminho: v.slice(i + 1) }
  } catch {
    return null
  }
}

export type Escolha = {
  /** variação servida ("/" = página principal) */
  caminho: string
  teste: string | null
  /** valor do cookie a gravar (null = não gravar) */
  cookie: string | null
}

/**
 * Decide o que "/" mostra. null = sem teste ativo (página principal, nada a fazer).
 *  forcada: ?variacao=v2 · previa: ?previa=AAAA-MM-DD · cookie: tde_div · r: Math.random()
 */
export function escolherVariacao(o: {
  dia: string
  cookie?: string | null
  forcada?: string | null
  previa?: string | null
  r: number
  testes?: TesteDivisao[]
  existentes?: string[]
}): Escolha | null {
  const existentes = o.existentes ?? VARIACOES_EXISTENTES
  if (o.forcada) {
    const c = normalizar(o.forcada)
    if (existentes.map(normalizar).includes(c)) return { caminho: c, teste: null, cookie: null }
  }
  const simulando = !!o.previa && DIA.test(o.previa)
  const t = testeAtivo(simulando ? o.previa! : o.dia, o.testes ?? TESTES_DIVISAO, existentes)
  if (!t) return null
  const pesos = pesosValidos(t, existentes)
  const k = chaveTeste(t)
  const salvo = lerCookie(o.cookie)
  if (!simulando && salvo && salvo.teste === k && pesos.some(([c]) => c === salvo.caminho)) {
    return { caminho: salvo.caminho, teste: t.nome, cookie: null }
  }
  const caminho = sortear(pesos, o.r)
  return { caminho, teste: t.nome, cookie: simulando ? null : `${k}|${caminho}` }
}

const NAO_LOCAL = /^(?!(?:AR|UY|CL)$).+$/i

/**
 * Mesma regra do next.config.mjs: ?pais=XX manda; senão o país da Vercel.
 * semPaisInternacional: o que fazer quando a Vercel não informa o país (Trader: internacional).
 */
export function ehInternacional(paisQuery: string | null, paisHeader: string | null, semPaisInternacional: boolean): boolean {
  if (paisQuery) return NAO_LOCAL.test(paisQuery)
  if (paisHeader) return NAO_LOCAL.test(paisHeader)
  return semPaisInternacional
}

/** Página real que a Vercel serve por trás de "/". */
export function paginaServida(caminho: string, internacional: boolean): string {
  if (caminho === "/") return internacional ? "/intl" : "/"
  return internacional ? `${caminho}-intl` : caminho
}
