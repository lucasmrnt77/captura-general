import { getLeadFromCache } from "@/lib/db-redis"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const telefono = searchParams.get("telefono")

    if (!telefono) {
      return Response.json({ error: "Teléfono requerido" }, { status: 400 })
    }

    const lead = await getLeadFromCache(telefono)

    return Response.json({ lead })
  } catch (error) {
    console.error("[v0] Error en API cache:", error)
    return Response.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
