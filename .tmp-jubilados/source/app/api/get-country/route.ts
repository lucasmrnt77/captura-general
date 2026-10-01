import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { geolocation } from "@vercel/functions"

export async function GET(request: NextRequest) {
  const { country } = geolocation(request)

  return NextResponse.json({ country: country || request.headers.get("x-vercel-ip-country") || "UY" })
}
