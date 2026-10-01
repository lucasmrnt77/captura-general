/**
 * Envia uma cópia do lead para o Painel Sendflow (server-side).
 * Variáveis (só servidor): PAINEL_CAPTURA_URL e PAINEL_CAPTURA_TOKEN.
 * Nunca lança erro: se o painel falhar, o cadastro segue normalmente.
 */
const vazio = (v: unknown, ...ignorar: string[]) => {
  if (typeof v !== "string") return null
  const t = v.trim()
  return t && !ignorar.includes(t) ? t : null
}

export async function enviarParaPainel(body: Record<string, unknown>) {
  const url = process.env.PAINEL_CAPTURA_URL
  const token = process.env.PAINEL_CAPTURA_TOKEN
  if (!url || !token || !body?.telefono) return
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-token": token },
      body: JSON.stringify({
        telefono: body.telefono,
        pagina_captura: vazio(body.pagina_captura), // "Gen-Uruguay" etc. → painel classifica como Nunca operou
        pagina_gracias: vazio(body.pag_gracias),
        utm_campaign: vazio(body.campana, "Directo"),
        utm_content: vazio(body.anuncio, "N/A"),
        utm_source: vazio(body.utm_source),
        utm_medium: vazio(body.utm_medium),
        utm_term: vazio(body.utm_term),
      }),
      signal: AbortSignal.timeout(5000),
    })
    if (!r.ok) console.error("[painel] resposta", r.status, await r.text())
  } catch (e) {
    console.error("[painel] falha ao enviar", e)
  }
}

/**
 * Respostas da página de obrigado (idade, gênero, capacidade de investimento)
 * → POST {PAINEL_CAPTURA_URL}/perfil. Nunca lança erro.
 */
export async function enviarPerfilParaPainel(body: Record<string, unknown>) {
  const base = process.env.PAINEL_CAPTURA_URL
  const token = process.env.PAINEL_CAPTURA_TOKEN
  if (!base || !token || !body?.telefono) return
  try {
    const r = await fetch(`${base.replace(/\/+$/, "")}/perfil`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-token": token },
      body: JSON.stringify({
        telefono: body.telefono,
        age_range: vazio(body.age_range),
        gender: vazio(body.gender),
        respuesta: vazio(body.respuesta) ?? vazio(body.capital_amount),
      }),
      signal: AbortSignal.timeout(5000),
    })
    if (!r.ok) console.error("[painel] perfil", r.status, await r.text())
  } catch (e) {
    console.error("[painel] falha ao enviar perfil", e)
  }
}
