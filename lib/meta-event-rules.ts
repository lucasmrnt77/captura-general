/**
 * Reglas condicionales para disparar eventos Meta
 * Basadas en: país, rango de edad, sexo, capital disponible
 * 
 * INSTRUCCIONES PARA USAR:
 * 1. Llenar las combinaciones exactas según los criterios del usuario
 * 2. Cada regla debe retornar el tipo de evento a disparar: "RegistroEventoTrading", "Lead NoSegmentado", o null
 * 3. Las reglas se evalúan en orden - la primera coincidencia gana
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

  /**
   * TODO: LLENAR CON LAS COMBINACIONES DEL USUARIO
   * 
   * Formato ejemplo:
   * if (
   *   country === "AR" &&
   *   age_range === "25_34" &&
   *   gender === "hombre" &&
   *   capital_amount === "si"
   * ) {
   *   return "RegistroEventoTrading"
   * }
   */

  // Regla por defecto: si respuesta es calificada (no imposible), enviar RegistroEventoTrading
  // ESTO DEBE SER REEMPLAZADO CON LAS REGLAS ESPECÍFICAS DEL USUARIO
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
