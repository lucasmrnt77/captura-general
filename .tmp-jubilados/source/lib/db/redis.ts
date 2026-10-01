import { kv } from '@vercel/kv'

const RETRY_QUEUE_PREFIX = 'leads:retry:'
const CACHE_PREFIX = 'leads:cache:'
const CACHE_TTL = 300 // 5 minutos

export async function addToRetryQueue(data: any) {
  try {
    const id = `${Date.now()}-${Math.random()}`
    await kv.lpush(RETRY_QUEUE_PREFIX + 'queue', JSON.stringify({ id, data }))
    return { success: true }
  } catch (error) {
    console.error('[v0] Redis retry queue error:', error)
    return { success: false, error }
  }
}

export async function getRetryQueue() {
  try {
    const items = await kv.lrange(RETRY_QUEUE_PREFIX + 'queue', 0, -1)
    return { success: true, data: items }
  } catch (error) {
    console.error('[v0] Redis get queue error:', error)
    return { success: false, error }
  }
}

export async function removeFromRetryQueue(id: string) {
  try {
    await kv.del(RETRY_QUEUE_PREFIX + id)
    return { success: true }
  } catch (error) {
    console.error('[v0] Redis remove queue error:', error)
    return { success: false, error }
  }
}

export async function cacheLeadData(telefono: string, data: any) {
  try {
    await kv.setex(
      CACHE_PREFIX + telefono,
      CACHE_TTL,
      JSON.stringify(data)
    )
    return { success: true }
  } catch (error) {
    console.error('[v0] Redis cache error:', error)
    return { success: false, error }
  }
}

export async function getCachedLead(telefono: string) {
  try {
    const cached = await kv.get(CACHE_PREFIX + telefono)
    if (cached) {
      return { success: true, data: JSON.parse(cached as string) }
    }
    return { success: true, data: null }
  } catch (error) {
    console.error('[v0] Redis get cache error:', error)
    return { success: false, error }
  }
}

export async function preventDuplicateSubmission(telefono: string) {
  try {
    const key = `leads:submit:${telefono}`
    const exists = await kv.get(key)
    
    if (exists) {
      return { success: false, isDuplicate: true }
    }
    
    // Marca como enviado por 60 segundos
    await kv.setex(key, 60, 'true')
    return { success: true, isDuplicate: false }
  } catch (error) {
    console.error('[v0] Redis duplicate check error:', error)
    return { success: false, error, isDuplicate: false }
  }
}
