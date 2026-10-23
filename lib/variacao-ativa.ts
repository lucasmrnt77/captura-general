/** Variação marcada pelo script ("v2"), ou null na página principal / fora do link único. */
export function variacaoAtiva(): string | null {
  if (typeof document === "undefined") return null
  const v = document.documentElement.getAttribute("data-v")
  return v && v !== "principal" ? v : null
}
