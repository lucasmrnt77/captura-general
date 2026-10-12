"use client"

import { useEffect } from "react"
import { avisarVisita } from "@/lib/lancamento"

/** Conta a visita da landing no painel (métricas por página). */
export function Visita({ landing }: { landing: string }) {
  useEffect(() => {
    avisarVisita(landing)
  }, [landing])
  return null
}
