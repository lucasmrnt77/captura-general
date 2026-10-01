"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useDeferredGtm } from "@/hooks/use-deferred-gtm"

function GraciasVideoContent() {
  const searchParams = useSearchParams()
  const { loadGtm } = useDeferredGtm()
  const [fbp, setFbp] = useState<string>("")
  const [fbc, setFbc] = useState<string>("")
  const [phoneFromUrl, setPhoneFromUrl] = useState<string>("")
  const [country, setCountry] = useState<string>("AR")
  const videoId = "ywkg7dZnxYA"
  
  // Estados para las 4 preguntas
  const [ageRange, setAgeRange] = useState<string>("")
  const [gender, setGender] = useState<string>("")
  const [capitalAmount, setCapitalAmount] = useState<string>("")
  const [capitalQuestion, setCapitalQuestion] = useState<string>("")
  
  const [showError, setShowError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isVideoLoading, setIsVideoLoading] = useState(true)
  const pageViewSentRef = useRef(false)

  useEffect(() => {
    loadGtm()
  }, [loadGtm])

  useEffect(() => {
    if (pageViewSentRef.current) return
    pageViewSentRef.current = true

    const eventId = crypto.randomUUID()
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      return parts.length === 2 ? parts.pop()?.split(";").shift() ?? "" : ""
    }

    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({
      event: "Lead Jubilados PageView",
      event_id: eventId,
    })

    void fetch("/api/capi/lead-jubilados-pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_id: eventId,
        fbc: getCookie("_fbc"),
        fbp: getCookie("_fbp"),
        event_source_url: window.location.href,
      }),
      keepalive: true,
    }).catch((error) => console.error("[v0] Jubilados PageView CAPI error:", error))
  }, [])

  useEffect(() => {
    // Obtener datos rápidamente sin esperar
    const tel = searchParams.get("tel") ?? ""
    const countryParam = searchParams.get("country") ?? "AR"
    
    setPhoneFromUrl(tel)
    setCountry(countryParam)

    // Cookies en paralelo sin bloquear
    if (typeof document !== "undefined") {
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) return parts.pop()?.split(";").shift() ?? ""
        return ""
      }

      setFbp(getCookie("_fbp"))
      setFbc(getCookie("_fbc"))
    }
  }, [searchParams])

  const getResponseText = (value: string): string => {
    const options: Record<string, string> = {
      no_imposible: "No, hoy sería imposible",
      no_pero_podria: "No hoy, pero podría organizarme para conseguirlo",
      si_puedo: "Sí, podría hacerlo sin problema",
    }
    return options[value] || value
  }

  const shouldSendEventToMeta = (
    country: string,
    capitalQuestion: string,
    gender: string,
    ageRange: string
  ): boolean => {
    // Uruguay: enviar TODOS los eventos
    if (country.toUpperCase() === "UY") {
      return true
    }

    // Argentina y otros países: aplicar filtros
    // Caso 1: "Sí, podría hacerlo sin problema" → ENVIAR TODOS
    if (capitalQuestion === "si_puedo") {
      return true
    }

    // Caso 2: "No hoy, pero podría organizarme" → ENVIAR SOLO con filtros demográficos
    if (capitalQuestion === "no_pero_podria") {
      if (gender === "hombre") {
        // HOMBRES: todas las edades EXCEPTO +65
        return ageRange !== "mayor_65"
      } else if (gender === "mujer") {
        // MUJERES: SOLO 35-44 años
        return ageRange === "35_44"
      }
    }

    // Caso 3: "No, hoy sería imposible" → NO ENVIAR
    return false
  }

  const handleSubmitResponse = async () => {
    // Validar que todos los campos estén completos
    if (!ageRange || !gender || !capitalQuestion) {
      setShowError(true)
      return
    }

    setShowError(false)
    setSubmitted(true)

    try {
      const capitalResponseText = getResponseText(capitalQuestion)

      // 1. Actualizar en la BD (Supabase, Neon, Redis) con TODOS los campos
      fetch("/api/leads/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telefono: phoneFromUrl,
          age_range: ageRange,
          gender: gender,
          video_id: videoId,
          respuesta: capitalResponseText,
        }),
      }).catch(err => {
        console.error('[v0] DB error:', err)
      })

      // 2. Actualizar en Google Sheets
      const scriptUrl = "https://script.google.com/macros/s/AKfycby9c-wcZHlnN7F9k9GOZtAqxF5z14EtHmGKcln-jRK2tc1AZfRV0L0exJH-akgy-SAM/exec"
      
      const payload = {
        telefono: phoneFromUrl,
        edad: ageRange,
        genero: gender,
        respuesta: capitalResponseText,
      }
      
      console.log("[v0] Actualizando Google Sheets con:", payload)
      
      fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(err => {
        console.log("[v0] Sheet update error:", err)
      })

      // 3. Eventos de conversión - Aplicar lógica condicional por país
      const shouldSendEvent = shouldSendEventToMeta(country, capitalQuestion, gender, ageRange)

      console.log("[v0] GTM Decision:", {
        country,
        capitalQuestion,
        gender,
        ageRange,
        shouldSend: shouldSendEvent,
      })

      if (shouldSendEvent) {
        // ENVIAR evento de registro a Meta y GTM
        if (typeof window !== "undefined" && (window as any).dataLayer) {
          ;(window as any).dataLayer.push({
            event: "Emi - General Qualificado",
            event_category: "conversion",
            event_label: "respuesta_encuesta_trading",
            landing_page: "trading_desde_cero",
            country: country,
            age_range: ageRange,
            gender: gender,
            respuesta: capitalQuestion,
            lead_type: "qualified",
          })
        }

      }

    } catch (error) {
      console.error("[v0] Error:", error)
      setSubmitted(false)
    }

    // Evento de Meta/GTM para el CTA calificado. El request va en paralelo
    // para no demorar la apertura inmediata de WhatsApp.
    const eventId = crypto.randomUUID()
    const cookies = document.cookie.split("; ").reduce<Record<string, string>>((acc, item) => {
      const [key, ...value] = item.split("=")
      if (key) acc[key] = decodeURIComponent(value.join("="))
      return acc
    }, {})
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({
      event: "Lead Jubilados Qualificado",
      event_id: eventId,
      event_category: "conversion",
      lead_type: "jubilados_qualificado",
    })
    void fetch("/api/capi/lead-jubilados-qualificado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventId,
        fbc: cookies._fbc,
        fbp: cookies._fbp,
        sourceUrl: window.location.href,
        segmento: "jubilados_qualificado",
      }),
      keepalive: true,
    }).catch((error) => console.error("[v0] CAPI event error:", error))

    // Abre WhatsApp INMEDIATAMENTE sin mostrar cartel
    window.open("https://chat.whatsapp.com/CJGPOYBMEQcLCMfL1pX61T", "_blank")
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header rojo */}
      <div className="bg-red-600 py-6 px-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">
          {"CUIDADO! TU CUPO"} <span className="underline">{"AÚN NO ESTÁ ASEGURADO"}</span>
        </h1>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 py-8 max-w-2xl mx-auto w-full">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-white">
          {"⚠️ Mira el video para finalizar tu inscripción"}
        </h2>

        {/* Video YouTube */}
        <div 
          className="w-full mb-8 rounded-lg overflow-hidden shadow-2xl bg-black relative"
          style={{ aspectRatio: "16/9" }}
        >
          {isVideoLoading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 rounded-lg">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-[#00D084] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-white text-sm md:text-base font-semibold">Cargando video...</p>
              </div>
            </div>
          )}
          {/* iframe con autoplay */}
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&controls=0&rel=0&modestbranding=1&fs=0&cc_load_policy=0&iv_load_policy=3`}
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            className="w-full h-full"
            allowFullScreen
            onLoad={() => setIsVideoLoading(false)}
          ></iframe>
        </div>

        {/* Preguntas */}
        <div className="w-full space-y-6 mb-6">
          {/* Pregunta 1: Rango de edad */}
          <div>
            <label className="text-sm md:text-base text-white mb-3 block font-semibold">
              1. ¿Cuál es tu rango de edad?
            </label>
            <select
              value={ageRange}
              onChange={(e) => {
                setAgeRange(e.target.value)
                setShowError(false)
              }}
              className={`w-full p-3 rounded-lg bg-zinc-900 border text-white text-sm md:text-base appearance-none cursor-pointer ${
                showError && !ageRange ? "border-red-500" : "border-zinc-700"
              } focus:outline-none focus:border-green-500 transition-colors`}
              aria-label="Seleccionar rango de edad"
            >
              <option value="">Seleccionar opción</option>
              <option value="menor_25">Menor de 25</option>
              <option value="25_34">25 a 34 años</option>
              <option value="35_44">35 a 44 años</option>
              <option value="45_54">45 a 54 años</option>
              <option value="55_64">55 a 64 años</option>
              <option value="mayor_65">+65</option>
            </select>
          </div>

          {/* Pregunta 2: Sexo */}
          <div>
            <label className="text-sm md:text-base text-white mb-3 block font-semibold">
              2. ¿Cuál es tu sexo?
            </label>
            <select
              value={gender}
              onChange={(e) => {
                setGender(e.target.value)
                setShowError(false)
              }}
              className={`w-full p-3 rounded-lg bg-zinc-900 border text-white text-sm md:text-base appearance-none cursor-pointer ${
                showError && !gender ? "border-red-500" : "border-zinc-700"
              } focus:outline-none focus:border-green-500 transition-colors`}
              aria-label="Seleccionar sexo"
            >
              <option value="">Seleccionar opción</option>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
            </select>
          </div>

          {/* Pregunta 3: Opciones del video */}
          <div>
            <p className="text-sm md:text-base text-white mb-3 block font-semibold">
              {"3. En caso de interesarte en iniciar en este mundo, contarías con un capital inicial de 800 a 1000 USD?"}
            </p>
            <select
              value={capitalQuestion}
              onChange={(e) => {
                setCapitalQuestion(e.target.value)
                setShowError(false)
              }}
              className={`w-full p-3 rounded-lg bg-zinc-900 border text-white text-sm md:text-base appearance-none cursor-pointer ${
                showError && !capitalQuestion ? "border-red-500" : "border-zinc-700"
              } focus:outline-none focus:border-green-500 transition-colors`}
              aria-label="Seleccionar respuesta video"
            >
              <option value="">Seleccionar opción</option>
              <option value="no_imposible">No, hoy sería imposible</option>
              <option value="no_pero_podria">No hoy, pero podría organizarme para conseguirlo</option>
              <option value="si_puedo">Sí, podría hacerlo sin problema</option>
            </select>
          </div>

          {showError && (
            <p className="text-red-500 text-sm text-center">
              Por favor, completa todas las preguntas antes de continuar
            </p>
          )}
        </div>

        {!submitted ? (
          <button
            onClick={handleSubmitResponse}
            className="flex items-center justify-center gap-2 w-full bg-[#00FF00] hover:bg-[#00DD00] text-black font-bold text-lg py-4 px-8 rounded-full transition-colors pulse-green-button"
          >
            UNIRME AL GRUPO
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 w-full bg-[#00FF00] text-black font-bold text-lg py-4 px-8 rounded-full opacity-50 cursor-not-allowed">
            PROCESANDO...
          </div>
        )}

        <div className="mt-12 space-y-4 w-full">
          <p className="text-[#FF0000] text-sm text-center">Si no logras acceder, contacta a mi equipo de soporte</p>

          <div className="flex justify-center">
            <a
              href="https://wa.me/59899860812?text=Hola%2C%20estoy%20teniendo%20problemas%20para%20acceder%20al%20evento"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#FF0000] hover:bg-[#DD0000] text-white font-bold text-base py-3 px-6 rounded transition-colors"
            >
              Contactar a soporte
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GraciasVideoPage() {
  return <GraciasVideoContent />
}
