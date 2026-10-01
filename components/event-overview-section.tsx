"use client"

import { Button } from "@/components/ui/button"

export function EventOverviewSection() {
  const handleRegistrationClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <section className="py-12 md:py-24 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="py-12 md:py-16 mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white">
            Descubre los detalles del evento
          </h2>
        </div>

        <div className="bg-white rounded-lg p-6 md:p-8 mb-16 max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-black">
            {"Lo que Aprenderás en "}
            <span className="text-[#00D084]">{"4 Clases"}</span>
            {" Gratis y En Vivo"}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16 px-4">
          {/* QUÉ */}
          <div className="bg-[#1a4d3a] border border-[#00D084]/40 rounded-xl p-6 backdrop-blur-sm">
            <div className="w-12 h-12 bg-[#00D084]/30 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#00D084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">QUÉ</h4>
            <p className="text-gray-200 text-sm leading-relaxed">
              4 clases en vivo donde aprenderás el método comprobado para generar ingresos de 500 a 2.000 USD mensuales
              invirtiendo en mercados financieros.
            </p>
          </div>

          {/* CUÁNDO */}
          <div className="bg-[#1a4d3a] border border-[#00D084]/40 rounded-xl p-6 backdrop-blur-sm">
            <div className="w-12 h-12 bg-[#00D084]/30 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#00D084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">CUÁNDO</h4>
            <div className="text-gray-200 text-sm leading-relaxed space-y-1">
              <p className="font-semibold">Del 7 al 10 de septiembre</p>
              <p>Se darán 4 clases en vivo,</p>
              <p>una por día a las:</p>
              <p>
                <span className="text-[#00D084]">20:00 hs</span> Uruguay / Argentina
              </p>
              <p>
                <span className="text-[#00D084]">19:00 hs</span> Miami
              </p>
            </div>
          </div>

          {/* DÓNDE */}
          <div className="bg-[#1a4d3a] border border-[#00D084]/40 rounded-xl p-6 backdrop-blur-sm">
            <div className="w-12 h-12 bg-[#00D084]/30 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#00D084]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">DÓNDE</h4>
            <div className="text-gray-200 text-sm leading-relaxed space-y-1">
              <p className="font-semibold">YouTube En Vivo</p>
              <p>
                Las sesiones se transmitirán en vivo por YouTube. <span className="text-[#00D084] font-semibold">El link te será enviado</span> una
                vez completes tu registro.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="text-sm md:text-xl px-8 md:px-12 py-6 md:py-8 pulse-green-button focus:outline-none focus:ring-2 focus:ring-[#00D084] focus:ring-offset-2 focus:ring-offset-black"
            onClick={handleRegistrationClick}
          >
            ¡QUIERO ASEGURAR MI CUPO!
          </Button>
        </div>
      </div>
    </section>
  )
}
