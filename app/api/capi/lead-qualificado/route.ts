import { createHash } from "node:crypto"
import { NextResponse } from "next/server"

const PIXEL_ID = process.env.META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN_GENERAL

function normalizePhoneForMeta(phone: string): string {
  let normalized = phone.replace(/\D/g, "")

  if (normalized.startsWith("54") && normalized[2] !== "9") {
    normalized = `549${normalized.slice(2)}`
  }

  if (normalized.startsWith("5980")) {
    normalized = `598${normalized.slice(4)}`
  }

  return normalized
}

function sanitizeEventSourceUrl(sourceUrl: string) {
  try {
    const url = new URL(sourceUrl)
    for (const key of ["email", "correo", "name", "nombre", "tel", "telefono", "phone", "phonenumber"]) {
      url.searchParams.delete(key)
    }
    return url.toString()
  } catch {
    return sourceUrl
  }
}

function sha256(value: string) {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex")
}

export async function POST(request: Request) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json({ ok: false, error: "Meta CAPI is not configured" }, { status: 503 })
  }

  try {
    const body = await request.json()
    const eventId = typeof body.event_id === "string" ? body.event_id : ""
    const phone = typeof body.phone === "string" ? body.phone : ""
    const email = typeof body.email === "string" ? body.email.trim() : ""
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 256) : ""
    const eventSourceUrl = typeof body.event_source_url === "string" ? body.event_source_url : ""

    if (!eventId || (!phone && !email)) {
      return NextResponse.json({ ok: false, error: "event_id and contact are required" }, { status: 400 })
    }

    const userData: Record<string, unknown> = {
      client_ip_address: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
      client_user_agent: request.headers.get("user-agent"),
    }

    const normalizedPhone = normalizePhoneForMeta(phone)
    if (normalizedPhone) userData.ph = [sha256(normalizedPhone)]
    if (email) userData.em = [sha256(email)]
    if (name) {
      const [firstName, ...lastNameParts] = name.split(/\s+/)
      if (firstName) userData.fn = [sha256(firstName)]
      const lastName = lastNameParts.join(" ")
      if (lastName) userData.ln = [sha256(lastName)]
    }
    if (typeof body.fbp === "string" && body.fbp) userData.fbp = body.fbp
    if (typeof body.fbc === "string" && body.fbc) userData.fbc = body.fbc

    const response = await fetch(`https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${encodeURIComponent(ACCESS_TOKEN)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{
          event_name: "Lead Qualificado",
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          action_source: "website",
          event_source_url: sanitizeEventSourceUrl(eventSourceUrl),
          user_data: userData,
          custom_data: {
            country: body.country,
            age_range: body.age_range,
            gender: body.gender,
            respuesta: body.respuesta,
            lead_type: "qualified",
          },
        }],
      }),
    })

    if (!response.ok) {
      console.error("[v0] Meta CAPI request failed", response.status)
      return NextResponse.json({ ok: false }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    console.error("[v0] Meta CAPI request error")
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
