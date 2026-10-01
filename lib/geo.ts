import { headers } from "next/headers"

const LOCAL = new Set(["AR", "UY", "CL"])

/**
 * Determina si se debe mostrar la versión "safe" (internacional) de la página.
 * Se usa SOLO en las páginas de campaña /pag1, /pag2 y /pag3 (que son dinámicas
 * porque leen searchParams). La landing principal "/" ya NO usa esto: es estática
 * y decide la variante en el edge vía middleware.ts.
 */
export async function resolveSafeMode(sp: {
  pais?: string | string[]
}): Promise<{ safeMode: boolean; country: string }> {
  const override = Array.isArray(sp?.pais) ? sp.pais[0] : sp?.pais
  let country = (override || "").toUpperCase()

  if (!country) {
    const h = await headers()
    country = (h.get("x-vercel-ip-country") || "").toUpperCase()
  }

  const safeMode = country !== "" && !LOCAL.has(country)
  return { safeMode, country }
}
