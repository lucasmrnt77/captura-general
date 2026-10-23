import type { ReactNode } from "react"

/**
 * Variações de copy das páginas de captura de teste (/v1, /v2, /v3).
 * Mesma página atual (versão AR/UY/CL); muda só o topo: título, subtítulo e botão.
 * Versão AR/UY/CL (com promessa de dinheiro). A versão internacional (resto do mundo) usa lib/variantes-intl.tsx.
 */
export type VarianteCaptura = {
  landing: string
  titulo: ReactNode
  subtitulo: ReactNode
  botao: string
}

const verde = "font-bold text-[#00D084]"

export const VARIANTES: Record<"v1" | "v2" | "v3", VarianteCaptura> = {
  // Controle: igual à página principal de hoje
  v1: {
    landing: "/v1",
    titulo: (
      <>
        {"Aprendé a invertir en los "}
        <span className="font-bold text-white">mercados financieros</span>
        {" para generar "}
        <span className="font-bold text-white">ingresos extra</span>
        {" de "}
        <span className={verde}>500 a 2.000 dólares al mes</span>
      </>
    ),
    subtitulo: (
      <>
        <strong>Sin experiencia previa</strong>, <strong>sin dejar tu trabajo</strong> y <strong>adaptado a tu rutina</strong>.
      </>
    ),
    botao: "QUIERO REGISTRARME GRATIS",
  },
  // Foco no formato: 4 clases, desde cero
  v2: {
    landing: "/v2",
    titulo: (
      <>
        {"En "}
        <span className={verde}>4 clases gratuitas</span>
        {" aprendé a invertir "}
        <span className="font-bold text-white">desde cero</span>
        {" y empezá a generar "}
        <span className="font-bold text-white">500 a 2.000 dólares extra al mes</span>
      </>
    ),
    subtitulo: (
      <>
        Un paso a paso <strong>en vivo y online</strong>, pensado para quien <strong>nunca invirtió</strong> y tiene poco tiempo.
      </>
    ),
    botao: "QUIERO MI LUGAR GRATIS",
  },
  // Pregunta directa al dolor
  v3: {
    landing: "/v3",
    titulo: (
      <>
        {"¿Querés un "}
        <span className={verde}>ingreso extra de 500 a 2.000 dólares</span>
        {" al mes "}
        <span className="font-bold text-white">sin dejar tu trabajo</span>
        {"?"}
      </>
    ),
    subtitulo: (
      <>
        Aprendé a invertir en los mercados financieros en un <strong>entrenamiento gratuito</strong>, aunque{" "}
        <strong>nunca hayas invertido</strong>.
      </>
    ),
    botao: "SÍ, QUIERO PARTICIPAR GRATIS",
  },
}
