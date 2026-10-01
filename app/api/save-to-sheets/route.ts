import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log('[v0] save-to-sheets: Datos recibidos =', data.telefono, data.action)

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL
    
    if (!scriptUrl) {
      console.error('[v0] save-to-sheets: ERROR - URL no configurada')
      return NextResponse.json(
        { success: false, error: 'NEXT_PUBLIC_GOOGLE_SHEETS_URL no configurada' },
        { status: 400 }
      )
    }

    console.log('[v0] save-to-sheets: URL OK, enviando POST...')

    // Hacer POST a Google Apps Script
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    console.log('[v0] save-to-sheets: Status HTTP =', response.status)

    const text = await response.text()
    console.log('[v0] save-to-sheets: Respuesta (primeros 300 chars) =', text.substring(0, 300))

    // Intentar parsear como JSON
    let result
    try {
      result = JSON.parse(text)
      console.log('[v0] save-to-sheets: JSON válido, éxito =', result.success)
      return NextResponse.json(result)
    } catch (e) {
      console.error('[v0] save-to-sheets: ERROR - Respuesta no es JSON válido')
      console.error('[v0] save-to-sheets: Respuesta completa =', text.substring(0, 500))
      return NextResponse.json({
        success: false,
        error: 'Google Apps Script no devolvió JSON válido',
        debug: text.substring(0, 200)
      }, { status: 500 })
    }
  } catch (error) {
    console.error('[v0] save-to-sheets: Exception =', error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
