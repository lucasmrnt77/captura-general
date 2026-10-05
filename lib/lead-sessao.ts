/**
 * Dados do lead do formulário até a página de obrigado, SEM passar pela URL
 * (e-mail na URL fica registrado no GTM, Analytics e histórico do navegador).
 * Guardado em sessionStorage por 2 horas. Nome já previsto para o futuro.
 */
const CHAVE = "tde_lead"
const VALIDADE_MS = 2 * 60 * 60 * 1000

export type LeadSessao = { email: string; nombre: string; telefono: string }

export function salvarLeadSessao(dados: Partial<LeadSessao>) {
  try {
    sessionStorage.setItem(CHAVE, JSON.stringify({ ...dados, salvo_em: Date.now() }))
  } catch {
    // modo privado / bloqueado: a página de obrigado segue sem e-mail
  }
}

export function leadDaSessao(): LeadSessao {
  const vazio = { email: "", nombre: "", telefono: "" }
  if (typeof window === "undefined") return vazio
  try {
    const v = JSON.parse(sessionStorage.getItem(CHAVE) || "null")
    if (!v || Date.now() - Number(v.salvo_em || 0) > VALIDADE_MS) return vazio
    return {
      email: typeof v.email === "string" ? v.email : "",
      nombre: typeof v.nombre === "string" ? v.nombre : "",
      telefono: typeof v.telefono === "string" ? v.telefono : "",
    }
  } catch {
    return vazio
  }
}

export function emailValido(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
}
