import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    console.log("[v0] API route called")

    const body = await request.json()
    console.log("[v0] Received body:", JSON.stringify(body))

    const { email, campaign, content } = body

    if (!email) {
      console.log("[v0] ERROR: No email provided")
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    const now = new Date()
    const fecha = now.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    const hora = now.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    const timestamp = now.toISOString()

    const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL

    console.log("[v0] Google Sheets URL configured:", !!scriptUrl)

    if (!scriptUrl) {
      console.log("[v0] ERROR: GOOGLE_SHEETS_SCRIPT_URL environment variable not configured")
      return NextResponse.json(
        {
          success: false,
          message: "Google Sheets URL not configured",
        },
        { status: 500 },
      )
    }

    const payload = {
      fecha,
      hora,
      correo: email,
      campana: campaign || "Directo",
      anuncio: content || "N/A",
      timestamp,
    }

    console.log("[v0] Sending to Google Sheets:", JSON.stringify(payload))

    // Fire and forget - don't await the response
    fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "follow",
    })
      .then(async (response) => {
        console.log("[v0] Google Sheets response status:", response.status)
        const responseText = await response.text()
        console.log("[v0] Google Sheets response:", responseText)
      })
      .catch((error) => {
        console.error("[v0] Error calling Google Sheets:", error)
      })

    // Return immediately
    return NextResponse.json({ success: true, message: "Data queued for saving" })
    // </CHANGE>
  } catch (error) {
    console.error("[v0] Error saving lead:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
