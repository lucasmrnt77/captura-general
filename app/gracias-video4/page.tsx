"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { isArgentina } from "@/lib/country"

function GraciasVideoContent() {
  const searchParams = useSearchParams()
  const [fbp, setFbp] = useState<string>("")
  const [fbc, setFbc] = useState<string>("")
  const [phoneFromUrl, setPhoneFromUrl] = useState<string>("")
  const [country, setCountry] = useState<string>("")
  const videoId = country.toUpperCase() === "UY" ? "X8fXMfEF27s" : "QKaIpxSOAPQ"
  // Estados para las 4 preguntas
  const [ageRange, setAgeRange] = useState<string>("")
  const [gender, setGender] = useState<string>("")
  const [capitalAmount, setCapitalAmount] = useState<string>("")
  const [capitalQuestion, setCapitalQuestion] = useState<string>("")
  const [genderRevealed, setGenderRevealed] = useState(false)
  const [capitalQuestionRevealed, setCapitalQuestionRevealed] = useState(false)
  
  const [showError, setShowError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const conversionSentRef = useRef(false)
  const questionEventsSentRef = useRef(new Set<string>())
  const sendQuestionEvent = (pregunta: "1" | "2" | "3", respuesta: string) => {
    const key = `${pregunta}:${respuesta}`
    if (questionEventsSentRef.current.has(key)) return
    questionEventsSentRef.current.add(key)
    try {
    try {
      const telefono = phoneFromUrl || searchParams.get("tel") || ""
      const body = JSON.stringify({ telefono, pregunta, respuesta })
      void fetch("https://script.google.com/macros/s/AKfycbxfW5fGaaQDSdK07m1DF1ggQCLht4u3AlebtZ4oCbqx49ZcLGX_XHcILAzEEDpmOgs/exec", {
        method: "POST",
        mode: "no-cors",
        keepalive: true,
        headers: { "Content-Type": "text/plain" },
        body,
      }).catch(() => {})
    } catch {}
    } catch {}
  }

  const generalPageviewSentRef = useRef(false)

  useEffect(() => {
    // Obtener datos rápidamente sin esperar
    const tel = searchParams.get("tel") ?? ""
    const countryParam = searchParams.get("country") ?? ""
    
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

  useEffect(() => {
    if (generalPageviewSentRef.current) return
    generalPageviewSentRef.current = true

    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      return parts.length === 2 ? parts.pop()?.split(";").shift() ?? "" : ""
    }

    const eventId = crypto.randomUUID()
    const fbp = getCookie("_fbp")
    const fbc = getCookie("_fbc")

    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: "Lead General PageView", event_id: eventId })

    void fetch("/api/capi/lead-general", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_id: eventId,
        fbc,
        fbp,
        event_source_url: window.location.href,
      }),
      keepalive: true,
    }).catch(() => {})
  }, [])

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

    // Caso 2: "No hoy, pero podría organizarme" → ENVIAR TODOS
    if (capitalQuestion === "no_pero_podria") {
      return true
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

    if (conversionSentRef.current) return
    conversionSentRef.current = true
    setShowError(false)
    setSubmitted(true)
    setRedirecting(true)

    const capitalResponseText = getResponseText(capitalQuestion)

      // 1. Actualizar en la BD (Supabase, Neon, Redis) con TODOS los campos
      try {
      fetch("/api/leads/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telefono: phoneFromUrl || searchParams.get("tel") || "",
          age_range: ageRange,
          gender: gender,
          video_id: videoId,
          respuesta: capitalResponseText,
        }),
      }).catch(err => {
        console.error('[v0] DB error:', err)
      })
      } catch (error) {
        console.error('[v0] DB setup error:', error)
      }

      // 2. Actualizar en Google Sheets
      const scriptUrl = "https://script.google.com/macros/s/AKfycby9c-wcZHlnN7F9k9GOZtAqxF5z14EtHmGKcln-jRK2tc1AZfRV0L0exJH-akgy-SAM/exec"
      
      const payload = {
        telefono: phoneFromUrl || searchParams.get("tel") || "",
        edad: ageRange,
        genero: gender,
        respuesta: capitalResponseText,
      }
      
      console.log("[v0] Actualizando Google Sheets con:", payload)
      
      fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(err => {
        console.log("[v0] Sheet update error:", err)
      })

  const eventId = crypto.randomUUID()
  const sendQualified = isArgentina(country, phoneFromUrl)
      ? capitalQuestion === "si_puedo" ||
        (capitalQuestion === "no_pero_podria" &&
          gender === "hombre" &&
          (ageRange === "35_44" || ageRange === "45_54" || ageRange === "55_64"))
      : capitalQuestion === "si_puedo" || capitalQuestion === "no_pero_podria"

  console.log("[DEBUG calificacion]", {
    country,
    phoneFromUrl,
    isAR: isArgentina(country, phoneFromUrl),
    capitalQuestion,
    gender,
    ageRange,
    sendQualified,
  })

  if (sendQualified) {
    console.log("[DEBUG CAPI] arrancando fetch a CAPI", Date.now())
    try {
      await Promise.race([
        fetch("/api/capi/lead-qualificado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_id: eventId,
          phone: phoneFromUrl,
          fbp,
          fbc,
          country,
          age_range: ageRange,
          gender,
          respuesta: capitalQuestion,
          event_source_url: window.location.href,
        }),
          keepalive: true,
        }),
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ])
      console.log("[DEBUG CAPI] terminó el await (fetch resolvió o venció el timeout)", Date.now())
    } catch (error) {
      console.error("[v0] Qualified CAPI error:", error)
    }

      // Evento para GTM (sin enviar datos directamente a Meta CAPI)
      if (sendQualified && typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: "Emi - General Qualificado",
          event_id: eventId,
          event_category: "conversion",
          event_label: "respuesta_encuesta_trading",
          landing_page: "trading_desde_cero",
          country: country,
          age_range: ageRange,
          gender: gender,
          respuesta: capitalQuestion,
          lead_type: "qualified",
        })

        window.dataLayer.push({
          event: "Lead General Qualificado",
          event_id: eventId,
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
  } else {
    console.log("[DEBUG CAPI] sendQualified es false, no se intenta CAPI")
  }

  console.log("[DEBUG] a punto de abrir WhatsApp", Date.now())
  window.open("https://chat.whatsapp.com/KtpVug57syVKpmxlfcLPID", "_blank")
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="bg-[#00D084] py-3 px-4 text-center">
        <p className="text-xs md:text-sm font-bold tracking-wide text-white">PASO 2 DE 3 · CASI LISTO</p>
      </div>

      <main className="flex-1 flex flex-col items-center justify-start px-4 py-8 max-w-2xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center text-white text-balance">
          ¡Ya casi estás adentro! <span className="text-[#00D084]">Te falta el último paso</span>
        </h1>
        <div className="w-full max-w-[600px] h-8 rounded-full bg-zinc-800 overflow-hidden mb-0 relative">
          <div className="h-full w-[85%] rounded-full bg-[#00D084] flex items-center justify-center">
            <span className="text-sm font-bold text-white">85%</span>
          </div>
        </div>

        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tincho-lm3pAs1Y2oLeWAmbT3FKq5t3J3RAad.jpg"
          alt="Tincho, instructor del evento"
          width={240}
          height={240}
          loading="eager"
          className="my-5 h-auto w-full max-w-[200px] rounded-full object-cover md:max-w-[240px]"
        />

        <h2 className="text-xl md:text-2xl font-semibold mb-1 text-center text-white text-balance">
          Con estas respuestas <span className="text-[#00D084]">preparo las clases</span>
        </h2>
        <p className="mb-0 text-center text-base font-normal text-zinc-300">
          Las adapto a lo que necesita la mayoría. Tardás 20 segundos y te van a servir mucho más.
        </p>
        <p className="mt-2 mb-5 text-center text-[13px] font-normal text-zinc-300">
          Tus respuestas son anónimas
        </p>
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
                if (e.target.value) { setGenderRevealed(true); sendQuestionEvent("1", e.target.options[e.target.selectedIndex].text) }
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
          {genderRevealed && <div className="animate-in fade-in duration-200">
            <label className="text-sm md:text-base text-white mb-3 block font-semibold">
              2. ¿Cuál es tu sexo?
            </label>
            <select
              value={gender}
              onChange={(e) => {
                setGender(e.target.value)
                if (e.target.value) setCapitalQuestionRevealed(true)
                if (e.target.value) sendQuestionEvent("2", e.target.options[e.target.selectedIndex].text)
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
          </div>}

          {/* Pregunta 3: Opciones del video */}
          {capitalQuestionRevealed && <div className="animate-in fade-in duration-200">
            <p className="text-sm md:text-base text-white mb-1 block font-semibold">
              {"3. En caso de interesarte en iniciar en este mundo, contarías con un capital inicial de 800 a 1000 USD?"}
            </p>
            <p className="mb-2 text-left text-[13px] font-normal text-zinc-300">
              Solo para saber desde dónde arrancás. Ese dinero no es para mí, queda en tu cuenta y lo manejás vos.
            </p>
            <select
              value={capitalQuestion}
              onChange={(e) => {
                setCapitalQuestion(e.target.value)
                if (e.target.value) sendQuestionEvent("3", e.target.options[e.target.selectedIndex].text)
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
          </div>}

          {showError && (
            <p className="text-[#00D084] text-sm text-center">
              Por favor, completa todas las preguntas antes de continuar
            </p>
          )}
        </div>

        {ageRange && gender && capitalQuestion && <>
        <p className="mt-4 text-center text-sm leading-relaxed">
          <span className="font-bold text-[#00FF00]">Unite al Grupo Oficial del evento para finalizar tu inscripción.</span>{" "}
          <span className="font-normal text-zinc-300">(Ahí recibirás los links de las clases)</span>
        </p>
        {(!submitted ? (
            <button
            type="button"
            onClick={handleSubmitResponse}
            disabled={submitted}
            className="mt-3 flex items-center justify-center gap-2 w-full bg-[#00FF00] hover:bg-[#00DD00] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold text-lg py-4 px-8 rounded-full transition-colors pulse-green-button whitespace-nowrap text-base"
          >
            {submitted ? "Redirigiendo..." : "UNIRME AL GRUPO"}
          </button>
        ) : (
          <div className="mt-3 flex items-center justify-center gap-2 w-full bg-[#00FF00] text-black font-bold text-lg py-4 px-8 rounded-full opacity-50 cursor-not-allowed">
            PROCESANDO...
          </div>
        ))}
        <a
          href="https://wa.me/59896593587?text=Hola,%20estoy%20necesitando%20ayuda%20para%20registrarme%20al%20evento"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex min-h-[60px] w-full items-center justify-center rounded-full border border-zinc-400 bg-transparent px-8 py-4 text-center text-[13px] font-bold text-zinc-300 whitespace-nowrap transition-colors hover:border-zinc-200 hover:text-white"
        >
          CONTACTAR A SOPORTE
        </a>
        </>}
      </main>
    </div>
  )
}

export default function GraciasVideoPage() {
  return <GraciasVideoContent />
}
