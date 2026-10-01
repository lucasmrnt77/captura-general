import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.NEON_POSTGRES_URL,
})

export async function saveLeadNeon(data: {
  telefono: string
  pais: string
  fecha_hora: string
  pagina_captura: string
  campana: string
  anuncio: string
  utm_source: string
  utm_medium: string
  utm_term: string
}) {
  try {
    const result = await pool.query(
      `INSERT INTO leads_eventos (
        telefono, pais, fecha_hora, pagina_captura, campana, anuncio,
        utm_source, utm_medium, utm_term
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (telefono) DO UPDATE SET
        updated_at = NOW()
      RETURNING *`,
      [
        data.telefono,
        data.pais,
        data.fecha_hora,
        data.pagina_captura,
        data.campana,
        data.anuncio,
        data.utm_source,
        data.utm_medium,
        data.utm_term,
      ]
    )
    return { success: true, data: result.rows[0] }
  } catch (error) {
    console.error('[v0] Neon save error:', error)
    return { success: false, error }
  }
}

export async function updateLeadNeon(telefono: string, respuesta: string) {
  try {
    const result = await pool.query(
      `UPDATE leads_eventos
       SET respuesta = $1, respuesta_fecha = NOW(), updated_at = NOW()
       WHERE telefono = $2
       RETURNING *`,
      [respuesta, telefono]
    )
    return { success: true, data: result.rows[0] }
  } catch (error) {
    console.error('[v0] Neon update error:', error)
    return { success: false, error }
  }
}

export async function searchLeadNeon(telefono: string) {
  try {
    const result = await pool.query(
      'SELECT * FROM leads_eventos WHERE telefono = $1 LIMIT 1',
      [telefono]
    )
    return { success: true, data: result.rows[0] || null }
  } catch (error) {
    console.error('[v0] Neon search error:', error)
    return { success: false, error }
  }
}
