/**
 * Integração com o serviço de tracking (projeto separado "tracking-eventos").
 * A página só avisa o que aconteceu; o serviço decide o evento, envia à Meta (CAPI)
 * e devolve o event_id para o pixel disparar igual (a Meta conta uma vez só).
 * Nenhuma regra de qualificação nem token da Meta fica nesta landing.
 */
export const TRACKING_URL = (process.env.NEXT_PUBLIC_TRACKING_URL || "https://tracking-eventos.vercel.app").replace(/\/+$/, "")

export type ResultadoTracking = { ok: boolean; evento: string | null; event_id: string; qualificado: boolean | null }

type TdeFn = ((comando: string, dados: Record<string, unknown>) => unknown) & { q?: unknown[]; versao?: string }

export function tde(comando: "lead" | "qualificar", dados: Record<string, unknown>): Promise<ResultadoTracking | null> {
  if (typeof window === "undefined") return Promise.resolve(null)
  const w = window as unknown as { tde?: TdeFn }
  // Fila até o t.js carregar (ele processa o que ficou aqui)
  if (!w.tde) {
    const fila: TdeFn = function (...args: unknown[]) {
      ;(fila.q = fila.q || []).push(args)
    } as TdeFn
    w.tde = fila
  }
  return new Promise((resolve) => {
    w.tde!(comando, { landing: "general", ...dados, onResultado: resolve })
  })
}

/** Espera o resultado por no máximo `ms` (para não travar a ida ao WhatsApp). */
export function comLimite<T>(p: Promise<T>, ms: number): Promise<T | null> {
  return Promise.race([p, new Promise<null>((r) => setTimeout(() => r(null), ms))])
}
