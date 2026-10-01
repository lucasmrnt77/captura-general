import { NextRequest, NextResponse } from 'next/server'
import { updateLead } from '@/lib/db'
import { enviarPerfilParaPainel } from '@/lib/painel'

export async function POST(request: NextRequest) {
  try {
    const { 
      telefono, 
      respuesta, 
      age_range, 
      gender, 
      capital_amount, 
      video_id 
    } = await request.json()

    if (!telefono || !respuesta) {
      return NextResponse.json(
        { success: false, error: 'Teléfono y respuesta requeridos' },
        { status: 400 }
      )
    }

    // Painel Sendflow em paralelo, independente das outras BDs
    const [result] = await Promise.all([
      updateLead(telefono, respuesta, {
        age_range,
        gender,
        capital_amount,
        video_id,
      }),
      enviarPerfilParaPainel({ telefono, age_range, gender, respuesta, capital_amount }),
    ])

    return NextResponse.json({
      success: result.success,
      message: result.error || 'Respuesta guardada',
      details: {
        supabase: result.supabase,
        neon: result.neon,
        queued: result.queued,
      },
    })
  } catch (error) {
    console.error('[v0] API update error:', error)
    return NextResponse.json(
      { success: false, error: 'Error al actualizar registro' },
      { status: 500 }
    )
  }
}
