"use client"

import { useEffect } from "react"
import { avisarVisita } from "@/lib/lancamento"
import { variacaoAtiva } from "@/lib/variacao-ativa"

/**
 * Conta a visita da landing no painel (métricas por página).
 * landing="auto" (link único): a variação que o sorteio mostrou ("/v2"), ou "/" na página principal.
 */
export function Visita({ landing }: { landing: string }) {
  useEffect(() => {
    if (landing === "auto") {
      const v = variacaoAtiva()
      avisarVisita(v ? `/${v}` : "/")
      return
    }
    avisarVisita(landing)
  }, [landing])
  return null
}
