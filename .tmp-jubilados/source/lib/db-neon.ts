import { Pool } from "@neondatabase/serverless"

const connectionString = process.env.NEON_POSTGRES_URL || ""

const pool = new Pool({ connectionString })

export interface Lead {
  telefono: string
  pais: string
  fecha: string
  hora: string
  pagina_captura: string
  campana: string
  anuncio: string
  utm_source?: string
  utm_medium?: string
  utm_term?: string
  respuesta?: string
  respuesta_fecha?: string
  age_range?: string
  gender?: string
  capital_amount?: string
  video_id?: string
}

export async function saveLeadNeon(lead: Lead, retries = 3): Promise<boolean> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    let client
    try {
      client = await pool.connect()

      await client.query(
        `INSERT INTO leads_eventos (telefono, pais, fecha, hora, pagina_captura, campana, anuncio, utm_source, utm_medium, utm_term)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (telefono) DO NOTHING`,
        [
          lead.telefono,
          lead.pais,
          lead.fecha,
          lead.hora,
          lead.pagina_captura,
          lead.campana,
          lead.anuncio,
          lead.utm_source || null,
          lead.utm_medium || null,
          lead.utm_term || null,
        ]
      )

      console.log("[v0] Lead guardado en Neon")
      return true
    } catch (error) {
      console.log(`[v0] Neon error (attempt ${attempt}/${retries}):`, error)
      if (attempt === retries) return false
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
    } finally {
      if (client) client.release()
    }
  }
  return false
}

export async function updateLeadResponseNeon(
  telefono: string,
  respuesta: string,
  retries = 3
): Promise<boolean> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    let client
    try {
      client = await pool.connect()

      await client.query(
        `UPDATE leads_eventos SET respuesta = $1, respuesta_fecha = $2, updated_at = $3
         WHERE telefono = $4`,
        [respuesta, new Date().toISOString(), new Date().toISOString(), telefono]
      )

      console.log("[v0] Respuesta actualizada en Neon")
      return true
    } catch (error) {
      console.log(`[v0] Neon update error (attempt ${attempt}/${retries}):`, error)
      if (attempt === retries) return false
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt))
    } finally {
      if (client) client.release()
    }
  }
  return false
}

export async function getLeadByPhoneNeon(telefono: string): Promise<Lead | null> {
  let client
  try {
    client = await pool.connect()

    const result = await client.query("SELECT * FROM leads_eventos WHERE telefono = $1", [telefono])

    if (result.rows.length === 0) {
      console.log("[v0] No se encontró el lead en Neon")
      return null
    }

    return result.rows[0] as Lead
  } catch (error) {
    console.log("[v0] Error obteniendo lead de Neon:", error)
    return null
  } finally {
    if (client) client.release()
  }
}
