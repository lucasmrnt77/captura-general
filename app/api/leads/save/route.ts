import { NextRequest, NextResponse } from 'next/server'
import { saveLead } from '@/lib/db'
import { enviarParaPainel } from '@/lib/painel'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Painel Sendflow em paralelo, independente das outras BDs
    const [result] = await Promise.all([saveLead(data), enviarParaPainel(data)])

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
