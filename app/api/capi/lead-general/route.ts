import { NextResponse } from "next/server"

const PIXEL_ID = process.env.META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN

export async function POST(request: Request) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return NextResponse.json({ ok: false, error: "Meta CAPI is not configured" }, { status: 503 })
  }

  try {
    const body = await request.json()
    const eventId = typeof body.event_id === "string" ? body.event_id : ""
    const sourceUrl = typeof body.event_source_url === "string" ? body.event_source_url : ""

    if (!eventId || !sourceUrl) {
      return NextResponse.json({ ok: false, error: "event_id and event_source_url are required" }, { status: 400 })
    }

    const userData: Record<string, string> = {
      client_ip_address: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "",
      client_user_agent: request.headers.get("user-agent") || "",
    }

    if (typeof body.fbc === "string" && body.fbc) userData.fbc = body.fbc
    if (typeof body.fbp === "string" && body.fbp) userData.fbp = body.fbp

    const response = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${encodeURIComponent(ACCESS_TOKEN)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [{
            event_name: "Lead General",
            event_time: Math.floor(Date.now() / 1000),
            event_id: eventId,
            action_source: "website",
            event_source_url: sourceUrl,
            user_data: userData,
          }],
        }),
      },
    )

    if (!response.ok) {
      console.error("[v0] Meta General CAPI request failed", response.status)
      return NextResponse.json({ ok: false }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    console.error("[v0] Meta General CAPI request error")
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
