"use client"

import Image from "next/image"
import { useDeferredGtm } from "@/hooks/use-deferred-gtm"

export function AboutMartin({ safe = false }: { safe?: boolean }) {
  const { loadGtm } = useDeferredGtm()

  const handleRegistrationClick = () => {
    loadGtm()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <section className="py-6 md:py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl font-montserrat text-center leading-tight max-w-3xl mx-auto">
            <span className="text-black font-normal">¿Quién es </span>
            <span className="text-[#00D084] font-normal">Martín Morales</span>
            <br />
            <span className="text-black font-bold">y por qué te puede</span>
            <br />
            <span className="text-black font-bold">ayudar?</span>
          </h2>
        </div>
      </section>

      <section id="about-martin" className="py-12 md:py-20 bg-black">
        <div className="container mx-auto px-6 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="border-4 border-[#00D084] rounded-lg overflow-hidden shadow-2xl">
                    <div className="aspect-[3/4] w-full max-w-lg mx-auto">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/design-mode-images-492944-f87780454bdd69b4f4b99bd1d7aaa638-281-29-281-29-z8MOBtRmF4LLOxGawSf7mq6YvZbNQW.webp"
                        alt="Martín Morales - Trader Profesional en After Market 2024"
                        width={600}
                        height={800}
                        sizes="(max-width: 1024px) 100vw, 600px"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="space-y-6 text-[14px] text-white leading-relaxed font-[system-ui,Roboto,sans-serif]">
                  <p>
                    Martín Morales es trader profesional y creador de TraderDelite, una academia creada para{" "}
                    {safe ? (
                      <>enseñar a personas comunes cómo funcionan los mercados financieros</>
                    ) : (
                      <>ayudar a personas comunes a generar una segunda fuente de ingresos con los mercados financieros</>
                    )}
                    , incluso si nunca invirtieron antes y sin necesidad de grandes conocimientos previos.
                  </p>

                  <p>
                    Con más de{" "}
                    <span className="text-[#00D084] font-semibold">8 años de experiencia</span> en los mercados financieros,
                    Martín se especializa en enseñar {safe ? "los mercados financieros" : "el trading"} de forma simple, clara y aplicable a la vida real
                    , pensada para personas con trabajo, familia y poco tiempo.
                  </p>

                  <p>
                    A través de sus entrenamientos,{" "}
                    capacitó gratuitamente a{" "}
                    <span className="text-[#00D084] font-semibold">más de 23.000 personas</span>{" "}
                    {safe ? "interesadas en aprender sobre los mercados financieros" : "que buscaban aprender a generar ingresos extra"}, y acompañó de forma paga a{" "}
                    <span className="text-[#00D084] font-semibold">más de 1483 alumnos</span>{" "}
                    que decidieron profundizar y aplicar este camino con mayor compromiso.
                  </p>

                  <p>
                    Su enfoque no se basa en promesas mágicas ni en hacerse rico de la noche a la mañana.
                    Martín enseña un paso a paso claro y estructurado para que cualquier persona pueda entender cómo funcionan los mercados financieros
                    , sin dejar su trabajo ni cambiar su rutina de un día para el otro.
                  </p>

                  <p>
                    Con una comunidad activa y un enfoque{" "}
                    honesto, práctico y sin humo
                    {safe ? (
                      <>
                        , Martín acompaña a personas reales en su proceso de aprendizaje sobre los mercados financieros, con contenido educativo y de fácil comprensión.
                      </>
                    ) : (
                      <>
                        , Martín ha ayudado a personas reales a generar como complemento a su sueldo o pensando en una jubilación más tranquila.
                      </>
                    )}
                  </p>
                </div>

                <div className="mt-6 md:mt-8">
                  <button
                    onClick={handleRegistrationClick}
                    className="block w-full max-w-sm mx-auto text-center pulse-green-button py-2 md:py-4 px-4 md:px-8 text-base md:text-xl focus:outline-none focus:ring-2 focus:ring-[#00D084]"
                  >
                    QUIERO MI CUPO GRATIS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
