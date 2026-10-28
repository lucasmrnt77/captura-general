/**
 * Configuração das páginas de teste do lançamento (captura /v1–/v3 e gracias /gracias-v1–/gracias-v3).
 * Nomenclatura única (igual na Trader e no painel): /v1, /v2, /v3… e /gracias-v1, /gracias-v2…
 *
 * - Captura: a divisão entre /v1, /v2 e /v3 é feita pelo link do painel
 *   (aba Links → um link com 3 destinos e a porcentagem de cada um).
 * - Gracias: sorteada aqui, no envio do formulário, pelos pesos abaixo.
 *   A mesma pessoa recebe sempre a mesma gracias durante a sessão.
 * - Tudo vai para o Painel Sendflow (base principal); a planilha só espelha o painel.
 * - Teste: abra a página com ?tde_teste=1 — os eventos vão para "Eventos de teste"
 *   na Meta e o lead cai no lançamento "teste-paginas" do painel (não suja os reais).
 */
export const PAINEL_URL = (process.env.NEXT_PUBLIC_PAINEL_URL || "https://painel.traderdelite.net").replace(/\/+$/, "")
export const LINK_GRUPO_GERAL = process.env.NEXT_PUBLIC_LINK_GRUPO_GERAL || "https://links.traderdelite.net/geral"
export const LANCAMENTO_TESTE = "teste-paginas"

export type OpcaoPeso = { path: string; peso: number }

/** Pesos das páginas de gracias (somam 100). Para tirar uma do teste, peso 0. */
export const GRACIAS_TESTE: OpcaoPeso[] = [
  // 28/10/2026: teste das gracias encerrado — todos vão para a /gracias-v1 (uma pergunta por vez)
  { path: "/gracias-v1", peso: 100 },
  { path: "/gracias-v2", peso: 0 },
  { path: "/gracias-v3", peso: 0 },
]

/** Sorteio pelo peso. `r` entre 0 e 1 (parâmetro só para os testes). */
export function sortearPorPeso(opcoes: OpcaoPeso[], r: number = Math.random()): string {
  const validas = opcoes.filter((o) => o.peso > 0)
  if (validas.length === 0) return opcoes[0]?.path ?? "/gracias-v1"
  const total = validas.reduce((t, o) => t + o.peso, 0)
  let alvo = r * total
  for (const o of validas) {
    if (alvo < o.peso) return o.path
    alvo -= o.peso
  }
  return validas[validas.length - 1].path
}

const CHAVE_GRACIAS = "tde_gracias"

/** Gracias da pessoa: sorteada uma vez e mantida na sessão (reenvio do formulário = mesma página). */
export function graciasDaPessoa(): string {
  const validas = new Set(GRACIAS_TESTE.filter((o) => o.peso > 0).map((o) => o.path))
  try {
    const salva = sessionStorage.getItem(CHAVE_GRACIAS)
    if (salva && validas.has(salva)) return salva
  } catch {}
  const nova = sortearPorPeso(GRACIAS_TESTE)
  try {
    sessionStorage.setItem(CHAVE_GRACIAS, nova)
  } catch {}
  return nova
}

export function modoTeste(): boolean {
  if (typeof window === "undefined") return false
  try {
    return new URLSearchParams(window.location.search).get("tde_teste") === "1"
  } catch {
    return false
  }
}

/** Avisa o painel que a página foi aberta (1 vez por sessão por landing). Nunca trava a página. */
export function avisarVisita(landing: string) {
  if (typeof window === "undefined") return
  const chave = `tde_visita:${landing}`
  try {
    if (sessionStorage.getItem(chave)) return
    sessionStorage.setItem(chave, "1")
  } catch {}
  const corpo: Record<string, string> = { landing }
  if (modoTeste()) corpo.lancamento = LANCAMENTO_TESTE
  try {
    // text/plain + no-cors: o navegador não precisa de pré-verificação (CORS) e a página não espera
    void fetch(`${PAINEL_URL}/api/visita`, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(corpo),
    }).catch(() => {})
  } catch {}
}
