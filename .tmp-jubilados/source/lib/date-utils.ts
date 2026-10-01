/**
 * Obtiene la fecha y hora actual en GMT-3 (Uruguay/Argentina)
 * Formato: YYYY-MM-DD HH:mm:ss
 */
export function getDateTimeGMT3(): string {
  const { fecha, hora } = getDateAndTimeGMT3()
  return `${fecha} ${hora}`
}

/**
 * Obtiene fecha y hora por separado en GMT-3 (Uruguay/Argentina)
 * Retorna: { fecha: "DD/MM/YYYY", hora: "HH:mm:ss" }
 */
export function getDateAndTimeGMT3(): { fecha: string; hora: string } {
  const now = new Date()
  
  // Opciones para la fecha (DD/MM/YYYY)
  const dateOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Buenos_Aires',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
  
  // Opciones para la hora (HH:mm:ss)
  const timeOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Buenos_Aires',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }
  
  const fecha = new Intl.DateTimeFormat('es-AR', dateOptions).format(now)
  const hora = new Intl.DateTimeFormat('es-AR', timeOptions).format(now)
  
  return { fecha, hora }
}
