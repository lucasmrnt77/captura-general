import { NextRequest, NextResponse } from "next/server"
import crypto from "node:crypto"

const PIXEL_ID = process.env.META_PIXEL_ID_JUBILADOS || "4290138017915368"
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN_JUBILADOS

function getClientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
}

export async function POST(request: NextRequest) {
  try {
    if (!ACCESS_TOKEN) {
      return NextResponse.json({ ok: false, error: "CAPI access token is not configured" }, { status: 503 })
    }

    const body = await request.json()
    const { event_id, fbc, fbp, event_source_url } = body

    if (typeof event_id !== "string" || !event_id.trim()) {
      return NextResponse.json({ ok: false, error: "event_id is required" }, { status: 400 })
    }

    const userAgent = request.headers.get("user-agent") || undefined
    const clientIp = getClientIp(request)
    const payload = {
      data: [
        {
          event_name: "Lead Jubilados",
          event_time: Math.floor(Date.now() / 1000),
          event_id,
          action_source: "website",
          event_source_url: typeof event_source_url === "string" ? event_source_url : undefined,
          user_data: {
            ...(clientIp ? { client_ip_address: clientIp } : {}),
            ...(userAgent ? { client_user_agent: userAgent } : {}),
            ...(typeof fbc === "string" && fbc ? { fbc } : {}),
            ...(typeof fbp === "string" && fbp ? { fbp } : {}),
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
      console.error("[v0] Meta CAPI PageView error:", result)
      return NextResponse.json({ ok: false, error: result }, { status: 502 })
    }

    return NextResponse.json({ ok: true, result })
  } catch (error) {
    console.error("[v0] CAPI PageView request error:", error)
    return NextResponse.json({ ok: false, error: "Unable to send CAPI PageView event" }, { status: 500 })
  }
}
