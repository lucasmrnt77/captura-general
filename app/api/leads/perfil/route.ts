import { NextRequest, NextResponse } from "next/server"
import { enviarPerfilParaPainel } from "@/lib/painel"

/**
 * Respostas da página de gracias (cada resposta na hora + a final com "qualificado")
 * → Painel Sendflow. O token do painel fica só no servidor.
 */
const texto = (v: unknown, max = 200) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined)

export async function POST(req: NextRequest) {
  let b: Record<string, unknown>
  try {
    b = await req.json()
  } catch {
    return NextResponse.json({ ok: false, erro: "corpo_invalido" }, { status: 400 })
  }
  const telefono = texto(b.telefono, 40)
  if (!telefono) return NextResponse.json({ ok: false, erro: "telefone_obrigatorio" }, { status: 400 })
  const lancamento = b.lancamento === "teste-paginas" ? "teste-paginas" : undefined
  await enviarPerfilParaPainel({
    telefono,
    age_range: texto(b.age_range, 20),
    gender: texto(b.gender, 20),
    respuesta: texto(b.respuesta),
    lancamento,
    ...(typeof b.qualificado === "boolean" ? { qualificado: b.qualificado } : {}),
    ...(b.clique_grupo === true ? { clique_grupo: true } : {}),
  })
  return NextResponse.json({ ok: true })
}
