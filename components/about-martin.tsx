"use client"

import Image from "next/image"

export function AboutMartin({ safeMode = false, countryLanding = false }: { safeMode?: boolean; countryLanding?: boolean }) {
  const handleRegistrationClick = () => {
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
                        width={731}
                        height={975}
                        sizes="(max-width: 1024px) min(100vw - 3rem, 32rem), 50vw"
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="space-y-6 text-[14px] text-white leading-relaxed font-[system-ui,Roboto,sans-serif]">
                  <p>
                    <span className="text-[#00D084] font-semibold">Martín Morales</span> es trader profesional y creador
                    de <span className="text-[#00D084] font-semibold">TraderDelite</span>, una academia creada para ayudar a{" "}
                    <span className="text-[#00D084] font-semibold">
                      {safeMode
                        ? "personas comunes a entender cómo funcionan los mercados financieros"
                        : "personas comunes a generar una segunda fuente de ingresos con los mercados financieros"}
                    </span>
                    , incluso si nunca invirtieron antes y sin necesidad de grandes conocimientos previos.
                  </p>

                  <p>
                    Con más de{" "}
                    <span className="text-[#00D084] font-semibold">8 años de experiencia</span> en los mercados financieros,
                    Martín se especializa en enseñar el trading de forma{" "}
                    <span className="text-[#00D084] font-semibold">
                      simple, clara y aplicable a la vida real
                    </span>
                    , pensada para personas con trabajo, familia y poco tiempo.
                  </p>

                  <p>
                    A través de sus entrenamientos,{" "}
                    <span className="text-[#00D084] font-semibold">
                      capacitó gratuitamente a más de 23.000 personas
                    </span>{" "}
                    que buscaban aprender a generar ingresos extra, y acompañó de forma paga a{" "}
                    <span className="text-[#00D084] font-semibold">
                      más de 1483 alumnos
                    </span>{" "}
                    que decidieron profundizar y aplicar este camino con mayor compromiso.
                  </p>

                  <p>
                    Su enfoque no se basa en promesas mágicas ni en hacerse rico de la noche a la mañana.
                    Martín enseña un{" "}
                    <span className="text-[#00D084] font-semibold">
                      paso a paso claro y estructurado
                    </span>{" "}
                    para que cualquier persona pueda entender{" "}
                    <span className="text-[#00D084] font-semibold">
                      cómo funcionan los mercados financieros y cómo empezar desde cero
                    </span>
                    , sin dejar su trabajo ni cambiar su rutina de un día para el otro.
                  </p>

                  <p>
                    Con una comunidad activa y un enfoque{" "}
                    <span className="text-[#00D084] font-semibold">
                      honesto, práctico y sin humo
                    </span>
                    {safeMode ? (
                      <>
                        , Martín acompaña a personas reales a{" "}
                        <span className="text-[#00D084] font-semibold">
                          comprender los mercados financieros y dar sus primeros pasos con criterio
                        </span>
                        , a su propio ritmo y sin cambiar su rutina de un día para el otro.
                      </>
                    ) : (
                      <>
                        , Martín ha ayudado a personas reales a generar{" "}
                        <span className="text-[#00D084] font-semibold">
                          ingresos extra de entre 500 y 2.000 dólares mensuales
                        </span>
                        , como complemento a su sueldo o pensando en una jubilación más tranquila.
                      </>
                    )}
                  </p>
                </div>

                <div className="mt-6 md:mt-8">
                  <button
                    onClick={handleRegistrationClick}
                    className="block w-full max-w-sm mx-auto text-center pulse-green-button py-2 md:py-4 px-4 md:px-8 text-base md:text-xl focus:outline-none focus:ring-2 focus:ring-[#00D084] focus:ring-offset-2 focus:ring-offset-black "
                  >
                    {countryLanding ? "¡QUIERO ASEGURAR MI CUPO AHORA!" : "¡QUIERO ASEGURAR MI CUPO!"}
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
