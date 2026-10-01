"use client"

export function Statistics({ safe = false }: { safe?: boolean }) {
  const stats = safe
    ? [
        {
          number: "+8",
          label: "AÑOS DE EXPERIENCIA",
          description: "EN LOS MERCADOS FINANCIEROS",
        },
        {
          number: "1483",
          label: "PERSONAS",
          description: "FORMADAS",
        },
        {
          number: "+23.000",
          label: "PERSONAS CAPACITADAS",
          description: "GRATUITAMENTE",
        },
      ]
    : [
        {
          number: "+23.000",
          label: "PERSONAS CAPACITADAS",
          description: "GRATUITAMENTE",
        },
        {
          number: "1483",
          label: "ALUMNOS",
          description: "FORMADOS",
        },
        {
          number: "+8",
          label: "AÑOS DE EXPERIENCIA",
          description: "EN LOS MERCADOS FINANCIEROS",
        },
      ]

  return (
    <>
      <section className="py-6 md:py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl font-montserrat text-center leading-tight max-w-3xl mx-auto">
            <span className="text-black font-bold">Números que hablan</span>
            <br />
            <span className="text-black font-normal">por sí solos</span>
          </h2>
        </div>
      </section>

      <section id="statistics" className="py-8 md:py-20 bg-black">
        <div className="container mx-auto px-10 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 min-h-[180px] md:min-h-[200px] flex flex-col justify-center"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#00D084] mb-3 drop-shadow-lg">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base font-bold text-white mb-2 uppercase leading-tight px-2">
                  {stat.label}
                </div>
                <div className="text-white/90 leading-tight uppercase text-xs md:text-sm px-2">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
