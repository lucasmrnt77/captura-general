import { NextRequest, NextResponse } from 'next/server'
import { saveLead } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const result = await saveLead(data)

    return NextResponse.json({
      success: result.success,
      message: result.error || 'Registro guardado',
      details: {
        supabase: result.supabase,
        neon: result.neon,
        queued: result.queued,
      },
    })
  } catch (error) {
    console.error('[v0] API save error:', error)
    return NextResponse.json(
      { success: false, error: 'Error al guardar registro' },
      { status: 500 }
    )
  }
}
