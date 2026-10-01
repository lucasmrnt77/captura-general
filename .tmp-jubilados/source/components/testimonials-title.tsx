export default function TestimonialsTitle({ pruebaJubilados = false }: { pruebaJubilados?: boolean }) {
  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black leading-tight text-balance">
            {pruebaJubilados ? <><span className="text-[#00D084]">Ellos</span> <span className="font-bold">ya lo están haciendo</span></> : <><span className="text-[#00D084]">Personas</span> <span className="font-bold">que ya están generando resultados</span></>}
          </h2>
        </div>
      </div>
    </section>
  )
}
