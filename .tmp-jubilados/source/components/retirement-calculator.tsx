import { Button } from "@/components/ui/button"

const cards = [
  {
    title: "La cuenta no cierra",
    text: "No es vivir peor un tiempo. Es un ingreso que ya no vuelve a subir.",
  },
  {
    title: "El tiempo juega en contra",
    text: "Cada año que pasa es un año menos para prepararte.",
  },
  {
    title: "Trabajar más no es la salida",
    text: "A esa edad conseguir trabajo es difícil, y si la idea era descansar, no es opción.",
  },
]

export function RetirementCalculator() {
  return (
    <section className="bg-black px-5 py-14 text-white md:px-8 md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-center font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#20d681]">PENSÁ EN TU JUBILACIÓN</p>
        <h2 className="mt-3 text-center font-poppins text-3xl font-bold leading-tight md:text-5xl">HACÉ LA CUENTA DE TU JUBILACIÓN</h2>
        <p className="mt-3 text-center text-sm leading-6 text-gray-300 md:text-lg">Es más simple de lo que parece, y más duro también.</p>

        <div className="relative mx-auto mt-10 flex w-full max-w-xl items-end justify-between gap-2 overflow-hidden">
          <div className="flex min-h-48 w-[43%] min-w-0 flex-col justify-between rounded-xl border border-gray-500/40 bg-[#171C24] p-4 md:p-9">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-gray-300 md:text-xs md:tracking-[0.16em]">LO QUE GANÁS HOY</p>
            <p className="mt-auto pt-4 text-6xl font-bold leading-none text-white md:text-7xl">100%</p>
          </div>
          <div className="flex w-[14%] shrink-0 items-center justify-center pb-8 text-4xl font-light text-gray-300 md:text-5xl">→</div>
          <div className="flex min-h-48 w-[43%] min-w-0 flex-col justify-between rounded-xl border border-gray-500/40 bg-[#171C24] p-4 md:p-9">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#B4534F] md:text-xs md:tracking-[0.16em]">LO QUE VAS A COBRAR JUBILADO</p>
            <div className="mt-auto pt-4">
              <p className="text-5xl font-bold leading-none text-[#B4534F] md:text-6xl">50%</p>
              <p className="mt-2 text-left text-[11px] text-gray-300 md:text-sm">aproximadamente</p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-base font-bold leading-7 text-[#B4534F] md:text-lg">ASÍ QUEDA TU INGRESO</p>
        <p className="mt-10 text-center text-lg font-medium leading-7 text-white md:text-2xl">Vas a trabajar 40 años para vivir con la mitad.</p>
        <p className="mt-4 text-center text-sm leading-6 text-gray-300 md:text-base">Esa mitad que falta no es un número. Es el supermercado, los remedios, el regalo a los nietos. Y no pasa una vez: es todos los meses, por el resto de tu vida.</p>

        <div className="mx-auto mt-10 w-full max-w-xl space-y-5 px-5 md:px-0">
          {cards.map((card) => (
            <article key={card.title} className="rounded-xl border border-white/10 bg-[#171C24] p-5 md:p-6">
              <h3 className="font-poppins text-lg font-bold text-white md:text-xl">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-300 md:text-base">{card.text}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-xl font-medium leading-8 text-white md:text-3xl">Hay dos caminos: resignarte, o <span className="text-[#20d681]">empezar a prepararte ahora.</span></p>
        <div className="mt-8 flex justify-center"><Button size="lg" className="mx-auto block w-full max-w-sm px-3 py-6 text-sm md:px-12 md:py-8 md:text-xl pulse-green-button focus:outline-none focus:ring-2 focus:ring-[#00D084]">QUIERO MI CUPO GRATIS</Button></div>
      </div>
    </section>
  )
}
