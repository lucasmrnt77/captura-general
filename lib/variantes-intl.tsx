import type { VarianteCaptura } from "@/lib/variantes"

/**
 * Variações da VERSÃO INTERNACIONAL (todos os países menos Argentina, Uruguai e Chile).
 * SEM promessa de dinheiro (a Meta revisa as páginas a partir dos EUA e bloqueia promessas de ganho).
 * As variações de AR/UY/CL, com promessa de dinheiro, ficam em lib/variantes.tsx.
 * Mesmas chaves: quem cai na /v2 vê a v2 local (AR/UY/CL) ou a v2 daqui (resto do mundo).
 */
const verde = "font-bold text-[#00D084]"

export const VARIANTES_INTL: Record<"v1" | "v2" | "v3" | "v4", VarianteCaptura> = {
  // Controle: igual à página internacional de hoje
  v1: {
    landing: "/v1",
    titulo: (
      <>
        {"Aprendé cómo funcionan los "}
        <span className="font-bold">mercados financieros</span>
        {" en esta "}
        <span className={verde}>formación gratuita</span>
        {" desde cero"}
      </>
    ),
    subtitulo: (
      <>
        {"Un paso a paso real y probado, incluso por personas "}
        <strong>sin conocimientos previos y con poco tiempo.</strong>
      </>
    ),
    botao: "QUIERO MI CUPO GRATIS",
  },
  // Foco no formato: 4 clases, desde cero
  v2: {
    landing: "/v2",
    titulo: (
      <>
        {"En "}
        <span className={verde}>4 clases gratuitas</span>
        {" aprendé "}
        <span className="font-bold text-white">desde cero</span>
        {" cómo funcionan los mercados financieros"}
      </>
    ),
    subtitulo: (
      <>
        Un paso a paso <strong>en vivo y online</strong>, pensado para quien <strong>nunca invirtió</strong> y tiene poco tiempo.
      </>
    ),
    botao: "QUIERO MI LUGAR GRATIS",
  },
  // Pregunta directa
  v3: {
    landing: "/v3",
    titulo: (
      <>
        {"¿Querés "}
        <span className={verde}>aprender a invertir</span>
        {" en los mercados financieros "}
        <span className="font-bold text-white">aunque nunca lo hayas hecho</span>
        {"?"}
      </>
    ),
    subtitulo: (
      <>
        Sumate a un <strong>entrenamiento gratuito y online</strong>, explicado desde cero y <strong>adaptado a tu rutina</strong>.
      </>
    ),
    botao: "SÍ, QUIERO PARTICIPAR GRATIS",
  },
  // Mesmo ângulo da D local, sem promessa de dinheiro
  v4: {
    landing: "/v4",
    titulo: (
      <>
        {"No se trata de ahorrar más, sino de "}
        <span className="font-bold text-white">qué hacés con tu dinero</span>
        {". Aprendé cómo funcionan los "}
        <span className={verde}>mercados financieros</span>
        {" desde cero"}
      </>
    ),
    subtitulo: (
      <>
        Un paso a paso <strong>en vivo y online</strong>, pensado para quien <strong>nunca invirtió</strong> y tiene poco tiempo.
      </>
    ),
    botao: "QUIERO MI CUPO GRATIS",
  },
}
