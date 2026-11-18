/**
 * Código da inscrição para o redirecionador de grupos (18/11/2026).
 * Gerado no próprio navegador ao enviar o formulário (sem esperar servidor), vai junto com o lead
 * para o painel e no botão do grupo (?i=código). Assim a mesma pessoa cai sempre no mesmo grupo
 * e números bloqueados não pegam o link. É aleatório: não leva telefone nem e-mail na URL.
 * Se algo falhar (modo privado, navegador antigo), o botão abre o link normal, como antes.
 */
const CHAVE = "tde_redir"
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function novoRedirId(): string {
  let id = ""
  try {
    id = crypto.randomUUID()
  } catch {
    // navegador sem crypto.randomUUID
  }
  if (!UUID.test(id)) {
    id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      return (c === "x" ? r : (r & 3) | 8).toString(16)
    })
  }
  try {
    sessionStorage.setItem(CHAVE, id)
  } catch {
    // modo privado: segue sem o código
  }
  return id
}

/** Link do grupo com o código da inscrição (?i=…), ou o link como veio se não houver código. */
export function linkGrupoComId(link: string): string {
  try {
    const id = sessionStorage.getItem(CHAVE)
    if (id && UUID.test(id)) return `${link}${link.includes("?") ? "&" : "?"}i=${id}`
  } catch {
    // sem sessionStorage
  }
  return link
}
