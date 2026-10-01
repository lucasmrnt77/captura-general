import { NextRequest, NextResponse } from "next/server"
import crypto from "node:crypto"

const PIXEL_ID = process.env.META_PIXEL_ID_JUBILADOS || "4290138017915368"
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN_JUBILADOS

function hash(value: string) {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex")
}

export async function POST(request: NextRequest) {
  try {
    if (!ACCESS_TOKEN) {
      return NextResponse.json({ ok: false, error: "CAPI access token is not configured" }, { status: 503 })
    }

    const body = await request.json()
    const { eventId, phone, email, fbc, fbp, sourceUrl, segmento } = body

    if (typeof eventId !== "string" || !eventId.trim()) {
      return NextResponse.json({ ok: false, error: "eventId is required" }, { status: 400 })
    }

    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    const userAgent = request.headers.get("user-agent") || undefined

    const payload = {
      data: [
        {
          event_name: "Lead Jubilados Qualificado",
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          action_source: "website",
          event_source_url: typeof sourceUrl === "string" ? sourceUrl : undefined,
          user_data: {
            ...(typeof phone === "string" && phone ? { ph: [hash(phone)] } : {}),
            ...(typeof email === "string" && email ? { em: [hash(email)] } : {}),
            ...(clientIp ? { client_ip_address: clientIp } : {}),
            ...(userAgent ? { client_user_agent: userAgent } : {}),
            ...(typeof fbc === "string" && fbc ? { fbc } : {}),
            ...(typeof fbp === "string" && fbp ? { fbp } : {}),
          },
          custom_data: {
            ...(typeof segmento === "string" && segmento ? { segmento } : {}),
          },
        },
      ],
    }

    const response = await fetch(
      `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${encodeURIComponent(ACCESS_TOKEN)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    )

    const result = await response.json()

    if (!response.ok) {
      console.error("[v0] Meta CAPI error:", result)
      return NextResponse.json({ ok: false, error: result }, { status: 502 })
    }

    return NextResponse.json({ ok: true, result })
  } catch (error) {
    console.error("[v0] CAPI request error:", error)
    return NextResponse.json({ ok: false, error: "Unable to send CAPI event" }, { status: 500 })
  }
}
