"use client"

import { telefoneComPais } from "@/lib/telefone-pais"
import type React from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect, useRef } from "react"
import { getDateAndTimeGMT3 } from "@/lib/date-utils"
import { useDeferredGtm } from "@/components/jubilados/use-deferred-gtm"
import LogoMarquee from "@/components/jubilados/logo-marquee"

function getThankYouPath(_phone: string): string {
  return "/gracias-video4"
}

const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={2}></rect>
    <line x1="16" y1="2" x2="16" y2="6" strokeWidth={2}></line>
    <line x1="8" y1="2" x2="8" y2="6" strokeWidth={2}></line>
    <line x1="3" y1="10" x2="21" y2="10" strokeWidth={2}></line>
  </svg>
)

const AlertCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={2}></circle>
    <line x1="12" y1="8" x2="12" y2="12" strokeWidth={2}></line>
    <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth={2}></line>
  </svg>
)

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9" strokeWidth={2}></circle>
    <polyline points="12 6 12 12 16 14" strokeWidth={2}></polyline>
  </svg>
)

const countries = [
  { code: "UY", name: "Uruguay", dial: "+598", flag: "\u{1F1FA}\u{1F1FE}", placeholder: "99 123 456" },
  { code: "AR", name: "Argentina", dial: "+54", flag: "\u{1F1E6}\u{1F1F7}", placeholder: "11 2345 6789" },
  { code: "BR", name: "Brasil", dial: "+55", flag: "\u{1F1E7}\u{1F1F7}", placeholder: "11 98765 4321" },
  { code: "CL", name: "Chile", dial: "+56", flag: "\u{1F1E8}\u{1F1F1}", placeholder: "9 8765 4321" },
  { code: "PY", name: "Paraguay", dial: "+595", flag: "\u{1F1F5}\u{1F1FE}", placeholder: "981 234567" },
  { code: "MX", name: "M\u00e9xico", dial: "+52", flag: "\u{1F1F2}\u{1F1FD}", placeholder: "55 1234 5678" },
  { code: "CO", name: "Colombia", dial: "+57", flag: "\u{1F1E8}\u{1F1F4}", placeholder: "300 123 4567" },
  { code: "PE", name: "Per\u00fa", dial: "+51", flag: "\u{1F1F5}\u{1F1EA}", placeholder: "987 654 321" },
  { code: "EC", name: "Ecuador", dial: "+593", flag: "\u{1F1EA}\u{1F1E8}", placeholder: "99 123 4567" },
  { code: "VE", name: "Venezuela", dial: "+58", flag: "\u{1F1FB}\u{1F1EA}", placeholder: "412 123 4567" },
  { code: "US", name: "Estados Unidos", dial: "+1", flag: "\u{1F1FA}\u{1F1F8}", placeholder: "202 555 0123" },
  { code: "ES", name: "Espa\u00f1a", dial: "+34", flag: "\u{1F1EA}\u{1F1F8}", placeholder: "612 34 56 78" },
]

function formatPhoneNumber(phone: string, countryCode: string): string {
  // Regras do normalizar.ts (Argentina 549, Uruguay sem 0, EEUU 1, etc.) — iguais em todas as páginas
  const pais = countries.find((c) => c.code === countryCode)
  return telefoneComPais(phone, { nome: pais?.name ?? "", ddi: pais?.dial ?? "" })
}

export function HeroSection({ safe = false, pressBanner = false, pruebaJubilados = false, prueba1Copy = false, prueba2Promise = false, prueba3Copy = false, jubilacionPromise = false, enableGeolocation = false }: { safe?: boolean; pressBanner?: boolean; pruebaJubilados?: boolean; prueba1Copy?: boolean; prueba2Promise?: boolean; prueba3Copy?: boolean; jubilacionPromise?: boolean; enableGeolocation?: boolean }) {
  const [isVisible, setIsVisible] = useState(false)
  const [phone, setPhone] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  // Etiqueta de origen para Google Sheets: "Jub-<País detectado>".
  // Se calcula en el cliente (a partir del país por IP) para poder servir esta
  // página como HTML estático y cacheado sin perder el dato por visitante.
  const [originLabel, setOriginLabel] = useState("Jub-Desconocido")
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [dropdownStyle, setDropdownStyle] = useState<{ top?: number; bottom?: number; left: number; width: number }>({
    left: 0,
    width: 220,
  })
  const countryButtonRef = useRef<HTMLButtonElement>(null)
  const { loadGtm } = useDeferredGtm()

  useEffect(() => {
    setIsVisible(true)

    if (!enableGeolocation) return

    fetch("/api/get-country")
      .then((response) => response.json())
      .then((data) => {
        const detectedCountry = countries.find((c) => c.code === data.country)
        if (detectedCountry) setSelectedCountry(detectedCountry)
        if (data.country) {
          try {
            const countryName = new Intl.DisplayNames(["es"], { type: "region" }).of(data.country) ?? data.country
            setOriginLabel(`Jub-${countryName}`)
          } catch {
            setOriginLabel(`Jub-${data.country}`)
          }
        }
      })
      .catch(() => {})
  }, [enableGeolocation])

  useEffect(() => {
    if (!showPhoneModal) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowPhoneModal(false)
        setShowCountryDropdown(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [showPhoneModal])

  useEffect(() => {
    if (!showCountryDropdown) return

    const updatePosition = () => {
      const button = countryButtonRef.current
      if (!button) return

      const rect = button.getBoundingClientRect()
      const dropdownHeight = 240 // max-h-60
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top

      if (spaceBelow >= dropdownHeight || spaceBelow >= spaceAbove) {
        // Suficiente espacio abajo (o más que arriba): abrir hacia abajo
        setDropdownStyle({ top: rect.bottom + 4, left: rect.left, width: Math.max(rect.width, 220) })
      } else {
        // Abrir hacia arriba
        setDropdownStyle({ bottom: window.innerHeight - rect.top + 4, left: rect.left, width: Math.max(rect.width, 220) })
      }
    }

    updatePosition()

    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition, true)

    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition, true)
    }
  }, [showCountryDropdown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    loadGtm()
    setPhoneError("")

    if (!phone) {
      setPhoneError("Por favor, ingresa tu n\u00famero de WhatsApp")
      return
    }

    const phoneRegex = /^\d{6,15}$/
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      setPhoneError("Por favor, ingresa un n\u00famero de tel\u00e9fono v\u00e1lido")
      return
    }

    const urlParams = new URLSearchParams(window.location.search)
    const campaign = urlParams.get("utm_campaign") || "Directo"
    const content = urlParams.get("utm_content") || "N/A"
    const source = urlParams.get("utm_source") || ""
    const medium = urlParams.get("utm_medium") || ""
    const term = urlParams.get("utm_term") || ""

    const { fecha, hora } = getDateAndTimeGMT3()

    // Formatear telefono (eliminar 0 inicial para UY, solo numeros)
    const cleanPhone = formatPhoneNumber(phone, selectedCountry.code)

    const assignedThankYouPage = getThankYouPath(cleanPhone)
    const landingOrigin = window.location.pathname || "/"
    const paginaCaptura = selectedCountry.name === "Uruguay" ? "Gen-Uruguay" : selectedCountry.name === "Argentina" ? "Gen-Argentina" : "Gen-Otro"

    const data = {
      action: "register",
      fecha: fecha,
      hora: hora,
      telefono: cleanPhone,
      pais: selectedCountry.name,
      pagina_captura: paginaCaptura,
      campana: campaign,
      anuncio: content,
      utm_source: source,
      utm_medium: medium,
      utm_term: term,
      landing: landingOrigin,
      video: "Video1",  // Nombre de la variable de entorno
      pag_gracias: assignedThankYouPage
    }

    try {
      // Guardar en Supabase/Neon mediante el endpoint server-side, en paralelo
      // con Google Sheets para no perder leads si el Sheet falla.
      fetch("/api/leads/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telefono: data.telefono,
          pais: data.pais,
          fecha: data.fecha,
          hora: data.hora,
          pagina_captura: data.pagina_captura,
          campana: data.campana,
          anuncio: data.anuncio,
          utm_source: data.utm_source,
          utm_medium: data.utm_medium,
          utm_term: data.utm_term,
        }),
        keepalive: true,
      }).then(async (response) => {
        if (!response.ok) {
          console.error("[v0] Error guardando lead en Supabase/Neon:", response.status)
          return
        }
        console.log("[v0] Lead guardado en Supabase/Neon")
      }).catch((error) => console.error("[v0] Error en guardado server-side:", error))

      // Guardar directamente en Google Sheets (sin API intermedia)
      const scriptUrl = "/api/save-to-sheets"
      
      console.log("[v0] DEBUG: Iniciando envío a Google Sheets")
      console.log("[v0] DEBUG: URL =", scriptUrl)
      console.log("[v0] DEBUG: Datos =", JSON.stringify(data, null, 2))
      
      fetch(scriptUrl, {
        method: "POST",
        
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        keepalive: true,
      })
        .then(() => console.log("[v0] DEBUG: Fetch enviado (no-cors no devuelve respuesta)"))
        .catch(err => console.error("[v0] ERROR en fetch:", err))

      // Enviar al webhook de Make.com
      const webhookUrl = "https://hook.us2.make.com/l4frrrgfm8tenowm3vn1k65wnyof9fvz"
      
      const webhookData = {
        telefono: data.telefono,
        fecha: fecha,
        hora: hora,
      }

      // Enviar webhook en paralelo sin bloquear (keepalive permite que continúe después de navegar)
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookData),
        keepalive: true,
      })
        .catch(err => console.error("[v0] ❌ ERROR WEBHOOK:", err))

      // Redirigir inmediatamente sin esperar
      const params = new URLSearchParams()
      params.set("tel", cleanPhone)
      if (campaign !== "Directo") params.set("utm_campaign", campaign)
      if (content !== "N/A") params.set("utm_content", content)

      window.location.href = `${assignedThankYouPage}?${params.toString()}`
    } catch (error) {
      console.error("[v0] Form submit error:", error)
      // Continuar de todas formas
      const params = new URLSearchParams()
      params.set("tel", cleanPhone)
      window.location.href = `${assignedThankYouPage}?${params.toString()}`
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d\s]/g, "")
    setPhone(value)
    if (phoneError) {
      setPhoneError("")
    }
  }

  return (
    <section className="relative">
      {!pressBanner && (
        <div className="bg-[#00D084] text-white text-center py-4 md:py-6">
          <div className="text-base md:text-lg font-bold tracking-wide px-4">ENTRENAMIENTO GRATUITO Y ONLINE</div>
        </div>
      )}

      <div className="relative bg-black w-full flex items-center justify-center pt-0 pb-4">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bannerweb_3%20%281%29-L0xdewgFWRQessbHzghREWfbIUXeDx.jpg"
          alt="La Semana del Inversionista"
          width={1920}
          height={700}
          loading="lazy"
          sizes="100vw"
          className="w-full h-auto object-contain max-w-full"
        />
      </div>

      <div className={`bg-black px-4 -mt-8 md:-mt-12 lg:-mt-16 relative z-10 ${pressBanner ? "pb-0" : "pb-8"}`}>
        <div className="container max-w-4xl px-2">
          <h1
            className={`text-[21px] md:text-4xl lg:text-5xl font-poppins mb-4 md:mb-6 text-white leading-tight text-center ${prueba3Copy ? "max-w-4xl" : "max-w-3xl"} ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            {safe ? (
              <>
                {"Aprend\u00e9 los "}
                <span className="font-bold">{"fundamentos de los mercados financieros"}</span>
                {" en un entrenamiento "}
                <span className="font-bold text-[#00D084]">{"gratuito y online"}</span>
              </>
            ) : jubilacionPromise ? (
              <>
                {"Con la jubilación vas a cobrar "}
                <span className="font-bold text-white">{"cerca de la mitad"}</span>
                {", "}
                <span className="font-bold text-[#20d681]">{"aprendé a invertir y preparate hoy"}</span>
                {"."}
              </>
  ) : prueba3Copy ? (
  <>
  {"Aprendé a invertir en los "}
  <span className="font-bold text-white">{"mercados financieros"}</span>
  {", la habilidad con la que otros se acercan a "}
  <span className="font-bold text-white">{"su casa propia"}</span>
  {" generando "}
  <span className="font-bold text-[#20d681]">{"de 500 a 2.000 dólares al mes"}</span>
  </>
            ) : prueba1Copy || prueba2Promise ? (
              <>
                {"Aprendé a invertir en los "}
                <span className="font-bold text-white">{"mercados financieros"}</span>
                {", la habilidad con la que otros "}
                <span className="font-bold text-white">{"hacen rendir su dinero"}</span>
                {" y generan "}
                <span className="font-bold text-[#20d681]">{"de 500 a 2.000 dólares al mes"}</span>
              </>
            ) : pruebaJubilados ? (
              <>
                {"Aprendé a "}
                <span className="font-bold text-white">{"invertir en los mercados financieros"}</span>
                {" y "}
                <span className="font-bold text-[#20d681]">{"preparate hoy para tu jubilación"}</span>
              </>
            ) : (
              <>
                {"Aprendé a "}
                <span className="font-bold text-white">{"invertir en los mercados financieros"}</span>
                {" y generá "}
                <span className="font-bold text-[#00D084]">{"de 500 a 2.000 dólares al mes"}</span>
                {" para no depender de tu jubilación"}
              </>
            )}
          </h1>

          <p
            className={`text-[11px] md:text-base font-poppins text-white mb-8 md:mb-10 leading-relaxed text-center ${prueba3Copy ? "text-base max-w-4xl" : "max-w-3xl"} mx-auto px-2 ${isVisible ? "animate-fade-in-up" : "opacity-0"} delay-200`}
          >
            {safe ? (
              <>
                {"Un programa 100% educativo, pensado para principiantes que quieren dar sus "}
                <strong>primeros pasos, incluso sin conocimientos previos</strong>.
              </>
            ) : jubilacionPromise ? (
              <>
                {"No importa si "}
                <strong>{"nunca invertiste ni la edad que tengas"}</strong>
                {". Se aprende "}
                <strong>{"desde cero"}</strong>
                {", en "}
                <strong>{"60 a 90 minutos por día"}</strong>
                {" y "}
                <strong>{"sin dejar tu trabajo"}</strong>
                {"."}
              </>
  ) : prueba3Copy ? (
  <>
  {"Sin experiencia, "}
  <strong>{"sin gran capital"}</strong>
  {" y "}
  <strong>{"sin dejar tu trabajo"}</strong>
  {"."}
  </>
            ) : prueba1Copy || prueba2Promise ? (
              <>
                {"Sin experiencia, sin "}
                <strong>{"gran capital"}</strong>
                {" y "}
                <strong>{"adaptado a tu rutina"}</strong>
                {"."}
              </>
            ) : pruebaJubilados ? (
              <>
                {"Una habilidad que se aprende "}
                <strong>{"sin experiencia"}</strong>
                {", en "}
                <strong>{"60 a 90 minutos por día"}</strong>
                {" y "}
                <strong>{"compatible con tu trabajo"}</strong>
                {"."}
              </>
            ) : (
              <>
                {"Una "}
                <strong>{"habilidad"}</strong>
                {" que se aprende sin experiencia, sin dejar tu trabajo y sin grandes capitales para empezar"}
              </>
            )}
          </p>

          <div className={`mb-6 md:mb-8 max-w-md mx-auto ${isVisible ? "animate-fade-in-up" : "opacity-0"} delay-400`}>
            <Button
              id="main-cta-button"
              size="lg"
              className="text-sm md:text-xl px-4 md:px-10 py-6 md:py-8 font-bold w-full max-w-sm mx-auto pulse-green-button relative z-10"
              onClick={() => {
                loadGtm()
                setPhoneError("")
                setShowPhoneModal(true)
              }}
            >
              QUIERO MI CUPO GRATIS
            </Button>
            {pressBanner && (
              <p className="mt-3 text-center text-xs font-normal text-gray-300">
                100% gratuito y online · 4 clases en vivo
              </p>
            )}
          </div>

          {showPhoneModal && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 py-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="phone-modal-title"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                  setShowPhoneModal(false)
                  setShowCountryDropdown(false)
                }
              }}
            >
              <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-gray-700 bg-[#171717] p-5 shadow-2xl md:p-7">
                <button
                  type="button"
                  aria-label="Cerrar ventana"
                  onClick={() => {
                    setShowPhoneModal(false)
                    setShowCountryDropdown(false)
                  }}
                  className="absolute right-4 top-3 text-3xl leading-none text-gray-400 transition-colors hover:text-white"
                >
                  ×
                </button>

                <form onSubmit={handleSubmit} className="pt-3">
                  <h2 id="phone-modal-title" className="pr-8 text-center text-xl font-bold leading-tight text-white md:text-2xl">
                    Asegurá tu lugar en el entrenamiento gratuito
                  </h2>
                  <p className="mt-3 text-center text-sm leading-relaxed text-gray-300 md:text-base">
                    Ingresá tu WhatsApp. Ya que por ese medio enviaremos el acceso a las 4 clases y las novedades del evento.
                  </p>

                  <div className="mt-6">
                    <label htmlFor="phone-number" className="sr-only">
                      Número de WhatsApp
                    </label>
                    <div className="flex gap-2">
                      <div className="relative shrink-0">
                        <button
                          ref={countryButtonRef}
                          type="button"
                          aria-label="Seleccionar país"
                          aria-expanded={showCountryDropdown}
                          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                          className="flex h-[52px] items-center gap-2 rounded-lg border-2 border-gray-600 bg-[#2a2a2a] px-3 text-white transition-colors hover:border-[#00D084] md:px-4"
                        >
                          <span className="text-xl">{selectedCountry.flag}</span>
                          <span className="text-base font-medium">{selectedCountry.dial}</span>
                          <ChevronDown className="h-4 w-4" />
                        </button>
                        {showCountryDropdown && (
                          <>
                            <div
                              className="fixed inset-0 z-[109]"
                              onClick={() => setShowCountryDropdown(false)}
                              aria-hidden="true"
                            />
                            <div
                              className="fixed z-[110] max-h-60 overflow-y-auto rounded-lg border-2 border-gray-600 bg-[#2a2a2a] shadow-2xl"
                              style={{
                                top: dropdownStyle.top,
                                bottom: dropdownStyle.bottom,
                                left: dropdownStyle.left,
                                width: dropdownStyle.width,
                              }}
                            >
                              {countries.map((country) => (
                                <button
                                  key={country.code}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(country)
                                    setShowCountryDropdown(false)
                                  }}
                                  className="flex w-full items-center gap-3 px-4 py-2 text-left text-white transition-colors hover:bg-[#3a3a3a]"
                                >
                                  <span className="text-xl">{country.flag}</span>
                                  <span className="flex-1 text-sm">{country.name}</span>
                                  <span className="text-sm text-gray-400">{country.dial}</span>
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <Input
                        id="phone-number"
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder={selectedCountry.placeholder}
                        autoFocus
                        className={`h-[52px] min-w-0 flex-1 rounded-lg border-2 bg-[#2a2a2a] px-4 text-base text-white placeholder:text-gray-500 transition-colors ${
                          phoneError ? "border-red-500 focus:border-red-500" : "border-gray-600 focus:border-[#00D084]"
                        }`}
                      />
                    </div>
                    {phoneError && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-red-500">
                        <AlertCircle className="h-4 w-4 shrink-0 text-[#00D084]" />
                        <span>{phoneError}</span>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="mt-6 w-full px-4 py-6 text-sm font-bold pulse-green-button md:text-base"
                  >
                    ASEGURAR MI CUPO GRATIS
                  </Button>
                </form>
              </div>
            </div>
          )}

          {pressBanner ? (
            <>
              <div className="mb-24 flex w-fit max-w-[320px] items-center justify-center gap-2 px-3 py-2 border-2 border-gray-300 rounded-full mx-auto text-gray-300">
                <Calendar className="h-5 w-5 text-gray-300 flex-shrink-0" />
                <span className="text-[12px] font-montserrat font-medium whitespace-nowrap">7 al 10 de Septiembre</span>
              </div>
              <div className="relative left-1/2 w-screen -translate-x-1/2">
                <LogoMarquee geo />
              </div>
            </>
          ) : (
            <div
              className={`flex flex-col gap-4 items-center justify-center text-white mb-8 md:mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"} delay-500`}
            >
              {/* Fecha */}
              <div className="flex items-center justify-center gap-3 px-5 py-2 border-2 border-[#00D084] rounded-full max-w-xs mx-auto">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-[#00D084] flex-shrink-0" />
                <span className="text-[12px] md:text-sm font-montserrat font-medium">7 al 10 de Septiembre</span>
              </div>

              {/* Horario */}
              <div className="flex items-start justify-start gap-3 px-5 py-2 border-2 border-[#00D084] rounded-full max-w-xs mx-auto">
                <Clock className="w-5 h-5 md:w-6 md:h-6 text-[#00D084] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[12px] md:text-sm font-montserrat font-medium leading-none">20:00 HS 🇺🇾 🇦🇷</span>
                  <span className="text-[12px] md:text-sm font-montserrat font-medium leading-none">19:00 HS 🇨🇱 🇺🇸 Miami</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
