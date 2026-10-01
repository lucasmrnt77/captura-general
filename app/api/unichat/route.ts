import { NextRequest, NextResponse } from 'next/server'

const UNICHAT_URL = 'https://unnichat.com.br/a/WMElAn7BeiiZvDrpn1Ec'

type IncomingPayload = {
  phoneNumber?: string | number
  telefono?: string | number
  number?: string | number
  name?: string
  nombre?: string
  data?: { phoneNumber?: string | number; telefono?: string | number; number?: string | number; name?: string; nombre?: string }
  dataCollection?: { phoneNumber?: string | number; telefono?: string | number; number?: string | number; name?: string; nombre?: string }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as IncomingPayload
    const source = body.data ?? body.dataCollection ?? body
    const rawPhone = source.phoneNumber ?? source.telefono ?? source.number
    const phoneNumber = rawPhone === undefined ? '' : String(rawPhone).replace(/[^0-9+]/g, '')
    const name = String(source.name ?? source.nombre ?? 'Lead General').trim() || 'Lead General'

    if (!phoneNumber) {
      return NextResponse.json({ success: false, error: 'phoneNumber, telefono o number es requerido' }, { status: 400 })
    }

    const apiKey = process.env.apikey
    if (!apiKey) {
      console.error('[v0] Unichat API key missing')
      return NextResponse.json({ success: false, error: 'Servicio de contacto no configurado' }, { status: 503 })
    }

    const response = await fetch(UNICHAT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        apiKey,
        data: { user: { phoneNumber, name, email: '' } },
      }),
      cache: 'no-store',
    })

    const responseText = await response.text()
    if (!response.ok) {
      console.error('[v0] Unichat upstream rejected request:', response.status, { hasPhone: true, responseLength: responseText.length })
      return NextResponse.json(
        { success: false, error: 'Unichat rechazó el contacto', upstreamStatus: response.status },
        { status: 502 },
      )
    }

    let responseData: unknown = null
    try { responseData = responseText ? JSON.parse(responseText) : null } catch { responseData = responseText || null }
    return NextResponse.json({ success: true, response: responseData })
  } catch (error) {
    console.error('[v0] Unichat webhook parse/request failed:', error instanceof Error ? error.message : 'unknown error')
    return NextResponse.json({ success: false, error: 'Solicitud inválida o servicio no disponible' }, { status: 400 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'active', message: 'Unichat endpoint funcionando' })
}
