/**
 * Reglas condicionales para disparar eventos Meta
 * Basadas en: país, rango de edad, sexo, capital disponible
 */

export interface UserDemographics {
  country: string
  age_range: string
  gender: string
  capital_amount: string
  respuesta: string
}

export type MetaEventType = "RegistroEventoTrading" | "Lead NoSegmentado" | null

/**
 * Determina qué evento Meta disparar basado en criterios demográficos
 * Retorna null si no hay coincidencia (no disparar evento)
 */
export function getMetaEventByDemographics(
  demographics: UserDemographics
): MetaEventType {
  const { country, age_range, gender, capital_amount, respuesta } = demographics

  // Regla por defecto: si respuesta es calificada (no imposible), enviar RegistroEventoTrading
  if (respuesta === "no_pero_podria" || respuesta === "si_puedo") {
    return "RegistroEventoTrading"
  }

  // Si respuesta es no calificada, enviar Lead NoSegmentado
  if (respuesta === "no_imposible") {
    return "Lead NoSegmentado"
  }

  return null
}

/**
 * Debug: Retorna todas las variables disponibles para crear reglas
 */
export const AVAILABLE_VALUES = {
  countries: ["AR", "BR", "MX", "CO", "CL", "PE", "UY", "PY", "BO", "VE", "EC"],
  age_ranges: [
    "menor_25",
    "25_34",
    "35_44",
    "45_54",
    "55_64",
    "mayor_65",
  ],
  genders: ["hombre", "mujer"],
  capital_amounts: ["si", "no_pero_podria", "no"],
  respuestas: ["no_imposible", "no_pero_podria", "si_puedo"],
}
