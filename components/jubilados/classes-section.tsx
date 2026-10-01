"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useDeferredGtm } from "@/components/jubilados/use-deferred-gtm"

export function ClassesSection({ pruebaJubilados = false, prueba3Copy = false }: { pruebaJubilados?: boolean; prueba3Copy?: boolean }) {
  const { loadGtm } = useDeferredGtm()
  const classes = [
    {
      number: 1,
      title: prueba3Copy ? "Por qué con un solo ingreso no alcanza, y" : "La oportunidad real para generar",
      description: prueba3Copy ? "qué se puede hacer" : "ingresos extras desde tu casa",
      date: "7 de Septiembre",
      time: "20:00 hs (UY/ARG) | 19:00 hs (Miami EEUU)",
      image: "/jubilados/images/clase-1.png",
    },
    {
      number: 2,
      title: "El método para generar",
      description: "500 a 2.000 USD al mes",
      date: "8 de Septiembre",
      time: "20:00 hs (UY/ARG) | 19:00 hs (Miami EEUU)",
      image: pruebaJubilados ? "/jubilados/images/clase-2-jubilados.jpg" : "/jubilados/images/clase-2.png",
    },
    {
      number: 3,
      title: "Cómo aplicar el método",
      description: "para generar ingresos recurrentes",
      date: "9 de Septiembre",
      time: "20:00 hs (UY/ARG) | 19:00 hs (Miami EEUU)",
      image: "/jubilados/images/clase-3.png",
    },
    {
      number: 4,
      title: "Cómo personas comunes aplicaron",
      description: "el método y cambiaron su vida",
      date: "10 de Septiembre",
      time: "20:00 hs (UY/ARG) | 19:00 hs (Miami EEUU)",
      image: "/jubilados/images/clase-4.png",
    },
  ]

  const handleRegistrationClick = () => {
    loadGtm()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <section className="bg-white py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl font-montserrat text-black leading-tight">
            <span className="font-normal">Lo que aprenderás en</span>{" "}
            <span className="text-[#00D084] font-bold">4 Clases</span>
            <br />
            <span className="font-bold">Gratis y En Vivo</span>
          </h2>
          </div>
        </div>
      </section>

      <section id="classes-section" className="py-8 md:py-20 bg-black">
        <div className="container mx-auto px-10 md:px-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {classes.map((classItem, index) => (
              <div key={index}>
                <div className="hidden md:block w-full max-w-6xl mx-auto">
                  <Image
                    src={classItem.image || "/placeholder.svg"}
                    alt={`Clase ${classItem.number}: ${classItem.title}`}
                    width={960}
                    height={528}
                    sizes="(max-width: 768px) 100vw, 960px"
                    loading="lazy"
                    className="w-full h-auto rounded-2xl"
                  />
                </div>

                <div className="md:hidden w-full max-w-sm mx-auto">
                  <Image
                    src={classItem.image || "/placeholder.svg"}
                    alt={`Clase ${classItem.number}`}
                    width={960}
                    height={528}
                    sizes="100vw"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-6 md:py-8">
        <div className="container mx-auto px-10 md:px-6">
          <div className="text-center">
            <Button
              size="lg"
              className="text-sm md:text-xl px-3 md:px-12 py-6 md:py-8 pulse-green-button w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-[#00D084] focus:ring-offset-2 focus:ring-offset-gray-900"
              onClick={handleRegistrationClick}
            >
              QUIERO MI CUPO GRATIS
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
