"use client"

import { Button } from "@/components/ui/button"
import { useDeferredGtm } from "@/hooks/use-deferred-gtm"

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path d="M8 12l3 3 5-5" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function PainPoints({ safe = false, pruebaJubilados = false, jubiladosBullets = false }: { safe?: boolean; pruebaJubilados?: boolean; jubiladosBullets?: boolean }) {
  const { loadGtm } = useDeferredGtm()

  const handleRegistrationClick = () => {
    loadGtm()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <section className="py-6 md:py-8 bg-white">
        <div className="container mx-auto px-10 md:px-6">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl font-montserrat text-black leading-tight font-bold">
              {pruebaJubilados ? "ESTE ENTRENAMIENTO ES PARA VOS SI..." : "ESTE EVENTO ES PARA VOS SI..."}
            </h2>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16 bg-black">
        <div className="container mx-auto px-10 md:px-6">
          <div className="max-w-5xl mx-auto">
            {pruebaJubilados || jubiladosBullets ? (
              <>
                  <div className="mx-auto max-w-[45ch] space-y-5 text-left md:space-y-5">
                  <div className="flex items-start gap-[14px]"><CheckCircle className="mt-0.5 h-7 w-7 shrink-0 text-[#00D084] md:h-8 md:w-8" /><p className="max-w-3xl text-center text-sm leading-relaxed text-white md:text-base lg:text-lg xl:text-xl">Estás a <strong className="font-bold">algunos años de jubilarte</strong> y sabés que con eso solo no te va a alcanzar</p></div>
                  <div className="flex items-start gap-[14px]"><CheckCircle className="mt-0.5 h-7 w-7 shrink-0 text-[#00D084] md:h-8 md:w-8" /><p className="max-w-3xl text-center text-sm leading-relaxed text-white md:text-base lg:text-lg xl:text-xl">Querés <strong className="font-bold">una alternativa que no dependa de tu edad</strong> ni de conseguir otro trabajo</p></div>
                  <div className="flex items-start gap-[14px]"><CheckCircle className="mt-0.5 h-7 w-7 shrink-0 text-[#00D084] md:h-8 md:w-8" /><p className="max-w-3xl text-center text-sm leading-relaxed text-white md:text-base lg:text-lg xl:text-xl">Tenés <strong className="font-bold">1 o 2 horas por día</strong> y querés aprovecharlas sin dejar lo que hacés hoy</p></div>
                  <div className="flex items-start gap-[14px]"><CheckCircle className="mt-0.5 h-7 w-7 shrink-0 text-[#00D084] md:h-8 md:w-8" /><p className="max-w-3xl text-center text-sm leading-relaxed text-white md:text-base lg:text-lg xl:text-xl">Buscás empezar con <strong className="font-bold">una inversión baja y controlada</strong>, sin poner en riesgo tus ahorros</p></div>
                  <div className="flex items-start gap-[14px]"><CheckCircle className="mt-0.5 h-7 w-7 shrink-0 text-[#00D084] md:h-8 md:w-8" /><p className="max-w-3xl text-center text-sm leading-relaxed text-white md:text-base lg:text-lg xl:text-xl">Estás dispuesto a <strong className="font-bold">aprender una habilidad nueva</strong>, aunque nunca hayas invertido</p></div>
                </div>
                <div className="mt-12 border-t border-white/10 pt-8 md:mt-16 md:pt-10">
                  <h3 className="mb-6 text-center font-montserrat text-2xl font-bold text-white md:mb-10 md:text-4xl">NO ES PARA VOS SI...</h3>
<div className="mx-auto max-w-[45ch] space-y-5 text-left md:space-y-5">
                    {[
                      "Buscás plata fácil o resultados de un día para el otro",
                      "No estás dispuesto a dedicarle tiempo a aprender",
                      "Querés que otro haga el trabajo por vos",
                    ].map((text) => (
                      <div className="flex items-start gap-[14px]" key={text}>
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-start justify-center text-2xl font-normal leading-none text-[#B4534F] md:h-8 md:w-8">×</span>
                        <p className="text-center text-sm leading-relaxed text-white md:text-base lg:text-lg xl:text-xl">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-6 md:space-y-10">
                <div className="flex items-center gap-4 md:gap-6"><CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-[#00D084]" /><p className="text-sm md:text-base lg:text-lg xl:text-xl font-montserrat leading-relaxed text-white">{safe ? <>Querés <span className="font-bold">aprender cómo funcionan los mercados financieros</span> desde cero</> : <>Buscás <span className="font-bold">generar una segunda fuente de ingresos.</span></>}</p></div>
                <div className="flex items-center gap-4 md:gap-6"><CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-[#00D084]" /><p className="text-sm md:text-base lg:text-lg xl:text-xl font-montserrat leading-relaxed text-white">{safe ? <>Buscás <span className="font-bold">entender los conceptos básicos de la inversión</span> de forma clara y responsable</> : <>Querés empezar con <span className="font-bold">una inversión baja</span> (de 800 a 1000 USD) y controlada, sin poner en riesgo tus ahorros</>}</p></div>
                <div className="flex items-center gap-4 md:gap-6"><CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-[#00D084]" /><p className="text-sm md:text-base lg:text-lg xl:text-xl font-montserrat leading-relaxed text-white">Tenés <span className="font-bold">1 o 2 horas por día</span> {safe ? "para dedicar a tu formación" : "que podrías aprovechar para generar ingresos"}</p></div>
                <div className="flex items-center gap-4 md:gap-6"><CheckCircle className="w-7 h-7 md:w-8 md:h-8 text-[#00D084]" /><p className="text-sm md:text-base lg:text-lg xl:text-xl font-montserrat leading-relaxed text-white">{safe ? <>Querés <span className="font-bold">adquirir nuevos conocimientos y habilidades financieras</span></> : <>Querés <span className="font-bold">más libertad de tiempo y dinero</span>, sin depender de un jefe ni de un lugar físico</>}</p></div>
              </div>
            )}

            <div className="mt-12 flex justify-center md:mt-16">
              <Button
                size="lg"
                className={`${pruebaJubilados ? "mx-auto block" : ""} text-sm md:text-xl px-3 md:px-12 py-6 md:py-8 pulse-green-button w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-[#00D084]`}
                onClick={handleRegistrationClick}
              >
                QUIERO MI CUPO GRATIS
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
