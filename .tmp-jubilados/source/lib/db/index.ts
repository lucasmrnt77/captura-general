import { saveLeadSupabase, updateLeadSupabase, searchLeadSupabase } from './supabase'
import { saveLeadNeon, updateLeadNeon, searchLeadNeon } from './neon'
import { addToRetryQueue, cacheLeadData, getCachedLead, preventDuplicateSubmission } from './redis'

export async function saveLead(data: any) {
  // Primero chequea duplicate submit
  const dupCheck = await preventDuplicateSubmission(data.telefono)
  if (dupCheck.isDuplicate) {
    return { success: false, error: 'Registro duplicado - intenta en 60 segundos' }
  }

  // Intenta guardar en ambas BDs
  const [supResult, neonResult] = await Promise.all([
    saveLeadSupabase(data),
    saveLeadNeon(data),
  ])

  // Si al menos una BD funcionó, es éxito
  if (supResult.success || neonResult.success) {
    // Cachea para búsqueda rápida después
    await cacheLeadData(data.telefono, data)

    // Si una falló, agrégalo a cola de reintentos
    if (!supResult.success) {
      await addToRetryQueue({
        action: 'save',
        service: 'supabase',
        data,
      })
    }
    if (!neonResult.success) {
      await addToRetryQueue({
        action: 'save',
        service: 'neon',
        data,
      })
    }

    return {
      success: true,
      supabase: supResult.success,
      neon: neonResult.success,
    }
  }

  // Si ambas fallaron, intenta Redis como último respaldo
  await addToRetryQueue({
    action: 'save',
    service: 'all',
    data,
  })

  return {
    success: false,
    error: 'No se pudo guardar en ninguna BD, en cola de reintentos',
    queued: true,
  }
}

export async function updateLead(telefono: string, respuesta: string, extra?: any) {
  const [supResult, neonResult] = await Promise.all([
    updateLeadSupabase(telefono, respuesta),
    updateLeadNeon(telefono, respuesta),
  ])

  if (supResult.success || neonResult.success) {
    await cacheLeadData(telefono, { respuesta, updated: true })

    if (!supResult.success) {
      await addToRetryQueue({
        action: 'update',
        service: 'supabase',
        telefono,
        respuesta,
      })
    }
    if (!neonResult.success) {
      await addToRetryQueue({
        action: 'update',
        service: 'neon',
        telefono,
        respuesta,
      })
    }

    return {
      success: true,
      supabase: supResult.success,
      neon: neonResult.success,
    }
  }

  await addToRetryQueue({
    action: 'update',
    service: 'all',
    telefono,
    respuesta,
  })

  return {
    success: false,
    error: 'No se pudo actualizar en ninguna BD',
    queued: true,
  }
}

export async function searchLead(telefono: string) {
  // Primero intenta Redis cache
  const cachedResult = await getCachedLead(telefono)
  if (cachedResult.success && cachedResult.data) {
    return { success: true, data: cachedResult.data, source: 'cache' }
  }

  // Si no está en cache, busca en BDs
  const [supResult, neonResult] = await Promise.all([
    searchLeadSupabase(telefono),
    searchLeadNeon(telefono),
  ])

  const data = supResult.data || neonResult.data

  if (data) {
    // Cachea el resultado
    await cacheLeadData(telefono, data)
    return {
      success: true,
      data,
      source: supResult.data ? 'supabase' : 'neon',
    }
  }

  return { success: false, error: 'Registro no encontrado' }
}

export { getCachedLead, preventDuplicateSubmission, getRetryQueue } from './redis'
