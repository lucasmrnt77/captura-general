import { NextResponse } from "next/server"
import { headers } from "next/headers"

// Endpoint liviano usado por el hero (client-side) para autoseleccionar el
// código de país en el desplegable de WhatsApp. No afecta el renderizado
// estático de la landing principal porque se llama desde el navegador.
export async function GET() {
  const h = await headers()
  const country = (h.get("x-vercel-ip-country") || "").toUpperCase()
  return NextResponse.json({ country })
}
