'use client'

import { DollarSign, Calendar, Video } from 'lucide-react'

export function EventDetailsCards() {
  return (
    <>
      {/* Sección blanca con título */}
      <section className="bg-white py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black leading-tight">
              Todos los detalles del evento
            </h2>
          </div>
        </div>
      </section>

      {/* Sección con cards verdes */}
      <section className="py-12 md:py-16 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Card 1: QUÉ */}
            <div className="border-2 border-[#00D084] rounded-2xl p-6 md:p-8 bg-black">
              <div className="flex gap-4 md:gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-full border-2 border-[#00D084]">
                    <DollarSign className="h-6 w-6 md:h-7 md:w-7 text-[#00D084]" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">QUÉ</h3>
                  <div className="w-full h-1 bg-[#00D084] rounded mb-4"></div>
                  <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-0">
                    Aprenderás el <span className="font-bold text-[#00D084]">método</span> con el que generar <span className="font-bold text-[#00D084]">ingresos extra todos los meses</span> para mejorar tu calidad de vida y tener más <span className="font-bold text-[#00D084]">libertad financiera</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: CUÁNDO */}
            <div className="border-2 border-[#00D084] rounded-2xl p-6 md:p-8 bg-black">
              <div className="flex gap-4 md:gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-full border-2 border-[#00D084]">
                    <Calendar className="h-6 w-6 md:h-7 md:w-7 text-[#00D084]" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">CUÁNDO</h3>
                  <div className="w-full h-1 bg-[#00D084] rounded mb-4"></div>
                  <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-0">
                    Del <span className="font-bold text-[#00D084]">7 al 10 de Septiembre</span>. <span className="font-bold text-[#00D084]">4 clases en vivo</span> a las <span className="font-bold text-[#00D084]">20:00 HS</span> 🇺🇾 🇦🇷
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: DÓNDE */}
            <div className="border-2 border-[#00D084] rounded-2xl p-6 md:p-8 bg-black">
              <div className="flex gap-4 md:gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded-full border-2 border-[#00D084]">
                    <Video className="h-6 w-6 md:h-7 md:w-7 text-[#00D084]" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3">DÓNDE</h3>
                  <div className="w-full h-1 bg-[#00D084] rounded mb-4"></div>
                  <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-0">
                    Las sesiones en vivo serán transmitidas por <span className="font-bold text-[#00D084]">YouTube</span> para que puedas acceder <span className="font-bold text-[#00D084]">desde cualquier lugar</span> con un <span className="font-bold text-[#00D084]">celular o computadora</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Botón */}
          <div className="flex justify-center mt-12 px-4">
            <button 
              className="w-full text-sm md:text-xl py-6 md:py-8 pulse-green-button focus:outline-none focus:ring-2 focus:ring-[#00D084] focus:ring-offset-2 focus:ring-offset-black"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              ¡QUIERO ASEGURAR MI CUPO!
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
