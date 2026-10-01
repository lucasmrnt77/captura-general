import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

type ZenflowData = {
  campaignName?: string
  groupName?: string
  groupJid?: string
  groupId?: string
  campaignId?: string
  number?: string | number
  createdAt_with_timezone_br?: string
  createdAt?: string
  [key: string]: unknown
}

type ZenflowPayload = {
  id?: string
  event?: string
  data?: ZenflowData
  dataCollection?: ZenflowData
  [key: string]: unknown
}

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status })
}

export async function GET(request: NextRequest) {
  return json({ status: 'active', message: 'Endpoint de LeadsSendflow funcionando correctamente', url: request.url })
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ZenflowPayload
    const data = body.data ?? body.dataCollection
    const phone = data?.number === undefined ? '' : String(data.number).replace(/[^0-9+]/g, '')
    const eventId = body.id?.trim() || crypto.randomUUID()

    if (!data?.createdAt_with_timezone_br || !data.groupName || !phone) {
      return json({ success: false, message: 'Payload incompleto: se requieren número, fecha y grupo' }, 400)
    }

    // Supabase y Google Sheets son entregas independientes: un fallo en una
    // no debe impedir que el webhook intente la otra.
    let admin: ReturnType<typeof createAdminClient> | null = null
    let queueResult: { success: boolean; duplicate?: boolean; error?: string } = { success: false }
    try {
      admin = createAdminClient()
      const { data: inserted, error } = await admin
        .from('sendflow_events')
        .upsert({
          event_id: eventId,
          event_type: body.event ?? null,
          campaign_id: data.campaignId ?? null,
          campaign_name: data.campaignName ?? null,
          group_name: data.groupName,
          group_jid: data.groupJid ?? null,
          group_id: data.groupId ?? null,
          phone,
          created_at_source: data.createdAt_with_timezone,
          payload: body,
          status: 'pending',
          next_attempt_at: new Date().toISOString(),
        }, { onConflict: 'event_id', ignoreDuplicates: true })
        .select('id,event_id,status')
        .maybeSingle()

      if (error) throw error
      queueResult = { success: true, duplicate: !inserted }
    } catch (error) {
      queueResult = { success: false, error: String(error) }
      console.error('[v0] Sendflow queue insert failed; continuing to Sheets:', error)
    }

    const sheetUrl = process.env.ZENFLOW_GOOGLE_SCRIPT_URL
    if (!sheetUrl) {
      console.error('[v0] ZENFLOW_GOOGLE_SCRIPT_URL is not configured')
      return json({ success: false, error: 'ZENFLOW_GOOGLE_SCRIPT_URL no está configurada' }, 503)
    }
    const sheetPayload = JSON.stringify({ action: 'add_member', ...data, number: phone })
    const initialResponse = await fetch(sheetUrl, {
      method: 'POST',
      redirect: 'manual',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: sheetPayload,
      cache: 'no-store',
    })

    // Apps Script responde el POST inicial con 302 y entrega el JSON final
    // en la URL de Location. El POST no debe seguirse automáticamente: el
    // segundo request debe ser GET.
    const redirectUrl = initialResponse.headers.get('location')
    const finalResponse = redirectUrl && [301, 302, 303, 307, 308].includes(initialResponse.status)
      ? await fetch(redirectUrl, { method: 'GET', headers: { Accept: 'application/json' }, cache: 'no-store' })
      : initialResponse
    const finalText = await finalResponse.text()
    let googleBody: { success?: boolean; [key: string]: unknown } | null = null
    try {
      googleBody = JSON.parse(finalText) as { success?: boolean; [key: string]: unknown }
    } catch {
      googleBody = null
    }
    const delivered = Boolean(finalResponse.ok && googleBody?.success === true)
    const sheetResult = {
      success: delivered,
      status: finalResponse.status,
      redirected: Boolean(redirectUrl),
      response: googleBody ?? (finalText ? finalText.slice(0, 300) : null),
    }
    if (!delivered) {
      console.error('[v0] Sendflow Google did not confirm JSON success:', finalResponse.status, finalText.slice(0, 300))
    }
    if (admin && queueResult.success) {
      await admin.from('sendflow_events').update({ status: delivered ? 'sent' : 'failed', processed_at: delivered ? new Date().toISOString() : null, last_error: delivered ? null : finalText.slice(0, 1000), attempts: 1 }).eq('event_id', eventId)
    }

    const success = delivered || queueResult.success
    return json({ success, queued: queueResult.success, delivered, eventId, sheet: sheetResult, database: queueResult }, success ? 200 : 502)
  } catch (error) {
    console.error('[v0] Sendflow webhook error:', error)
    return json({ success: false, error: String(error) }, 500)
  }
}

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
