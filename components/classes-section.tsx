"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export function ClassesSection({ classTwoImage, countryLanding = false }: { classTwoImage?: string; countryLanding?: boolean }) {
  const classes = [
    {
      number: 1,
      title: "La oportunidad real para generar",
      description: "ingresos extras desde tu casa",
      date: "7 de Diciembre",
      time: "20:00 hs (UY/ARG) | 19:00 hs (Miami EEUU)",
      image: "/images/aulas/aula-1.webp",
    },
    {
      number: 2,
      title: "El método para generar",
      description: "500 a 2.000 USD al mes",
      date: "8 de Diciembre",
      time: "20:00 hs (UY/ARG) | 19:00 hs (Miami EEUU)",
      image: classTwoImage ?? "/images/aulas/aula-2.webp",
    },
    {
      number: 3,
      title: "Cómo aplicar el método",
      description: "para generar ingresos recurrentes",
      date: "9 de Diciembre",
      time: "20:00 hs (UY/ARG) | 19:00 hs (Miami EEUU)",
      image: "/images/aulas/aula-3.webp",
    },
    {
      number: 4,
      title: "Cómo personas comunes aplicaron",
      description: "el método y cambiaron su vida",
      date: "10 de Diciembre",
      time: "20:00 hs (UY/ARG) | 19:00 hs (Miami EEUU)",
      image: "/images/aulas/aula-4.webp",
    },
  ]

  const handleRegistrationClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <section className="bg-white py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-2xl font-montserrat leading-tight text-black sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl">
              <span className="font-normal">Lo que aprenderás en </span>
              <span className="font-bold text-[#00D084]">4 Clases</span>
              <br />
              <span className="font-bold">Gratis y En Vivo</span>
            </h2>
          </div>
        </div>
      </section>

      <section id="classes-section" className="bg-black py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 md:gap-8">
            {classes.map((classItem) => (
              <Image
                key={classItem.number}
                src={classItem.image}
                alt={`Clase ${classItem.number} del evento`}
                width={1200}
                height={800}
                sizes="(max-width: 768px) calc(100vw - 2rem), 1152px"
                className="block h-auto w-full rounded-2xl object-contain"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-6 md:py-8">
        <div className="container mx-auto px-10 md:px-6">
          <div className="text-center">
            <Button
              size="lg"
              className="text-sm md:text-xl px-4 md:px-10 py-6 md:py-8 pulse-green-button w-full max-w-md whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#00D084] focus:ring-offset-2 focus:ring-offset-gray-900"
              onClick={handleRegistrationClick}
            >
              {countryLanding ? "¡QUIERO ASEGURAR MI CUPO AHORA!" : "¡QUIERO ASEGURAR MI CUPO!"}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
