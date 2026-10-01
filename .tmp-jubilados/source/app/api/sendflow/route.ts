import { NextRequest, NextResponse } from 'next/server'

interface SendflowWebhook {
  id: string
  event: string
  data: {
    campaignId: string
    campaignName: string
    groupName: string
    groupJid: string
    groupId: string
    number: string
    createdAt: string
    createdAt_with_timezone_br: string
  }
  version: string
}

export async function POST(request: NextRequest) {
  try {
    console.log('[v0] ===== SENDFLOW WEBHOOK RECIBIDO =====')
    console.log('[v0] Headers:', Object.fromEntries(request.headers))
    
    const body: SendflowWebhook = await request.json()
    console.log('[v0] Body completo:', JSON.stringify(body, null, 2))

    // Validar que sea el evento correcto
    if (body.event !== 'group.updated.members.added') {
      console.log('[v0] Evento no soportado:', body.event)
      return NextResponse.json(
        { success: false, message: 'Evento no soportado' },
        { status: 400 }
      )
    }

    // Preparar datos para Google Sheets
    const sheetData = {
      action: 'add_member',
      webhookId: body.id,
      campaignId: body.data.campaignId,
      campaignName: body.data.campaignName,
      groupName: body.data.groupName,
      groupJid: body.data.groupJid,
      groupId: body.data.groupId,
      memberNumber: body.data.number,
      createdAt: body.data.createdAt,
      createdAt_br: body.data.createdAt_with_timezone_br,
      timestamp: new Date().toISOString(),
    }

    // Enviar a Google Sheets
    const sheetScriptUrl = process.env.GOOGLE_SHEETS_SENDFLOW_URL

    if (!sheetScriptUrl) {
      console.error('[v0] GOOGLE_SHEETS_SENDFLOW_URL no configurada')
      return NextResponse.json(
        { success: false, message: 'Script de Google Sheets no configurado' },
        { status: 500 }
      )
    }

    const sheetResponse = await fetch(sheetScriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sheetData),
    })

    if (!sheetResponse.ok) {
      console.error('[v0] Error al guardar en Google Sheets:', sheetResponse.status)
      return NextResponse.json(
        { success: false, message: 'Error al guardar datos' },
        { status: 500 }
      )
    }

    console.log('[v0] Miembro agregado guardado:', {
      campaignName: body.data.campaignName,
      groupName: body.data.groupName,
      number: body.data.number,
    })

    return NextResponse.json({
      success: true,
      message: 'Datos guardados correctamente',
      data: sheetData,
    })
  } catch (error) {
    console.error('[v0] Error en sendflow webhook:', error)
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  console.log('[v0] GET /api/sendflow - Endpoint activo y funcionando')
  return NextResponse.json({
    status: 'active',
    message: 'Endpoint de Sendflow está funcionando correctamente',
    url: request.url,
  })
}
