import { NextRequest, NextResponse } from 'next/server'
import { searchLead } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const telefono = request.nextUrl.searchParams.get('phone')

    if (!telefono) {
      return NextResponse.json(
        { success: false, error: 'Teléfono requerido' },
        { status: 400 }
      )
    }

    const result = await searchLead(telefono)

    return NextResponse.json(result)
  } catch (error) {
    console.error('[v0] API search error:', error)
    return NextResponse.json(
      { success: false, error: 'Error al buscar registro' },
      { status: 500 }
    )
  }
}
