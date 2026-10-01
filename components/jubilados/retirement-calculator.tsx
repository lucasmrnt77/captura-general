import { Button } from "@/components/ui/button"
import { ArrowBigUpDash, HelpCircle, TrendingUp } from "lucide-react"

const defaultCards = [
  { title: "Ahorrar no alcanza", text: "Guardar te protege del gasto, no de la inflación." },
  { title: "El tiempo juega en contra", text: "Cada año quieto es un año que compra menos." },
  { title: "La pregunta no es cuánto", text: "No se trata de cuánto ahorrás, sino de qué hacés con lo que tenés." },
]

const prueba4Cards = [
  { title: "Un sueldo tiene techo", text: "Podés trabajar más horas, pero no infinitas." },
  { title: "La meta también se mueve", text: "Todo lo grande cuesta más cada año que pasa." },
  { title: "La pregunta no es cuánto ganás", text: "Es cuántas cosas trabajan para vos." },
]

export function RetirementCalculator({ prueba4Copy = false }: { prueba4Copy?: boolean }) {
  const cards = prueba4Copy ? prueba4Cards : defaultCards

  return (
    <section className="bg-black px-5 py-14 text-white md:px-8 md:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-center font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#20d681]">{prueba4Copy ? "PENSÁ EN TU META" : "PENSÁ EN TU DINERO"}</p>
        <h2 className="mt-3 text-center font-poppins text-3xl font-bold leading-tight md:text-5xl">{prueba4Copy ? "HACÉ LA CUENTA DE VERDAD" : "HACÉ LA CUENTA DE TUS AHORROS"}</h2>
        <p className="mt-3 text-center text-sm leading-6 text-gray-300 md:text-lg">Es más simple de lo que parece, y más duro también.</p>

        <div className="mx-auto mt-10 flex w-full items-end gap-1 overflow-hidden sm:gap-2">
          <div className="flex min-h-40 min-w-0 flex-1 flex-col justify-between rounded-xl border border-gray-500/40 bg-[#171C24] p-3 sm:min-h-48 sm:p-5 md:p-7">
            <p className="text-[8px] font-medium uppercase tracking-[0.08em] text-gray-300 sm:text-[10px] md:text-xs">{prueba4Copy ? "LO QUE PODÉS AHORRAR POR AÑO" : "LO QUE GUARDASTE HACE 10 AÑOS"}</p>
            <div className="mt-auto pt-4"><p className={`${prueba4Copy ? "text-lg sm:text-4xl md:text-5xl" : "text-4xl sm:text-5xl md:text-7xl"} font-bold leading-none text-white`}>{prueba4Copy ? "2.400" : "100%"}</p>{prueba4Copy ? <p className="mt-2 text-sm font-normal text-gray-300">dólares</p> : null}</div>
          </div>
          <div className="flex shrink-0 items-center justify-center text-xl font-light text-gray-300 sm:text-3xl md:text-5xl">→</div>
          <div className="flex min-h-40 min-w-0 flex-1 flex-col justify-between rounded-xl border border-gray-500/40 bg-[#171C24] p-3 sm:min-h-48 sm:p-5 md:p-7">
            <p className="text-[8px] font-medium uppercase tracking-[0.08em] text-[#B4534F] sm:text-[10px] md:text-xs">{prueba4Copy ? "LO QUE CUESTA UNA CASA" : "LO QUE COMPRA HOY"}</p>
            <div className="mt-auto pt-4"><p className={`${prueba4Copy ? "text-lg sm:text-4xl md:text-5xl" : "text-3xl sm:text-4xl md:text-6xl"} font-bold leading-none text-[#B4534F]`}>{prueba4Copy ? "150.000" : "75%"}</p>{prueba4Copy ? <p className="mt-2 text-sm text-gray-300">dólares</p> : null}{!prueba4Copy && <p className="mt-2 text-[9px] text-gray-300 sm:text-[11px] md:text-sm">aproximadamente</p>}</div>
          </div>
          <div className="flex shrink-0 items-center justify-center text-xl font-light text-gray-300 sm:text-3xl md:text-5xl">→</div>
          <div className="flex min-h-40 min-w-0 flex-1 flex-col justify-between rounded-xl border border-[#20d681]/50 bg-[#171C24] p-3 sm:min-h-48 sm:p-5 md:p-7">
            <p className="text-[8px] font-medium uppercase tracking-[0.08em] text-[#20d681] sm:text-[10px] md:text-xs">SI APRENDÉS A GESTIONAR TU DINERO</p>
            <div className="mt-auto pt-4"><p className={`${prueba4Copy ? "text-lg sm:text-4xl md:text-5xl" : "text-5xl sm:text-6xl md:text-7xl"} font-bold leading-none text-[#20d681]`}>?</p>{prueba4Copy ? <p aria-hidden="true" className="mt-2 text-sm text-transparent">&nbsp;</p> : null}</div>
          </div>
        </div>

        <p className="mt-6 text-center text-base font-bold leading-7 text-[#20d681] md:text-lg">LA TERCERA DEPENDE DE VOS</p>
        <p className="mt-10 text-center text-lg font-medium leading-7 text-white md:text-2xl">{prueba4Copy ? "A ese ritmo, son 62 años." : "Tu plata no bajó de número. Bajó de valor."}</p>
        <p className="mt-4 text-center text-sm leading-6 text-gray-300 md:text-base">{prueba4Copy ? "No es que ahorres poco. Es que un solo ingreso no da para más. La cuenta no cambia ahorrando distinto: cambia sumando algo que trabaje además de vos." : "Y mientras está quieta, sigue bajando. No importa si son 500 dólares o 50.000: parado, todo pierde."}</p>

        <div className="mx-auto mt-10 w-full max-w-xl space-y-7 px-5 md:space-y-8 md:px-6">
          {cards.map((card, index) => {
            const Icon = prueba4Copy ? [ArrowBigUpDash, TrendingUp, HelpCircle][index] : null
            return <article key={card.title} className="rounded-xl border border-white/10 bg-[#171C24] p-7 md:p-8"><h3 className="flex items-center gap-3 font-poppins text-lg font-bold text-white md:text-xl">{Icon && <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-[#20d681]" />}{card.title}</h3><p className="mt-4 text-sm leading-6 text-gray-300 md:text-base">{card.text}</p></article>
          })}
        </div>

        <p className="mt-10 text-center text-xl font-medium leading-8 text-white md:text-3xl">{prueba4Copy ? <>Hay dos caminos: seguir esperando, o <span className="text-[#20d681]">sumar un ingreso que no dependa de tus horas.</span></> : <>Hay dos caminos: dejarla quieta, o <span className="text-[#20d681]">aprender a gestionarla.</span></>}</p>
        <div className="mt-8 flex justify-center"><Button size="lg" className="mx-auto block w-full max-w-sm px-3 py-6 text-sm md:px-12 md:py-8 md:text-xl pulse-green-button focus:outline-none focus:ring-2 focus:ring-[#00D084]">QUIERO MI CUPO GRATIS</Button></div>
      </div>
    </section>
  )
}
