import type { ReactNode } from "react"

/**
 * Variações da página General — versão AR/UY/CL (com promessa de dinheiro). Teste de headline do Emi (23/10):
 * A = /v1, B = /v2, C = /v3, D = /v4. Muda só o texto da promessa e o que vai em destaque; tamanho,
 * tipografia e estilos do hero são os mesmos. Subpromessa e botão iguais nas quatro (só a headline é testada).
 * Verde = o mesmo do fundo do botão CTA (#20d681). A versão internacional (resto do mundo) usa lib/variantes-intl.tsx.
 */
export type VarianteCaptura = {
  landing: string
  titulo: ReactNode
  subtitulo: ReactNode
  botao: string
}

const branco = "font-bold text-white"
const verde = "font-bold text-[#20d681]"

const SUBPROMESA = (
  <>
    <strong className={branco}>Sin experiencia previa</strong>{", "}<strong className={branco}>adaptado a tu rutina</strong>{" y "}
    <strong className={branco}>con un capital bajo para empezar</strong>{"."}
  </>
)
const BOTAO = "QUIERO REGISTRARME GRATIS"

export const VARIANTES: Record<"v1" | "v2" | "v3" | "v4", VarianteCaptura> = {
  // A
  v1: {
    landing: "/v1",
    titulo: (
      <>
        {"Aprendé a invertir en los "}
        <span className={branco}>mercados financieros</span>
        {" para generar "}
        <span className={branco}>ingresos extra</span>
        {" de "}
        <span className={verde}>500 a 2.000 dólares al mes</span>
      </>
    ),
    subtitulo: SUBPROMESA,
    botao: BOTAO,
  },
  // B
  v2: {
    landing: "/v2",
    titulo: (
      <>
        {"Aprendé a invertir en los "}
        <span className={branco}>mercados financieros</span>
        {", la habilidad con la que otros generan "}
        <span className={verde}>500 a 2.000 dólares al mes</span>{" "}
        <span className={branco}>sin dejar su trabajo</span>
      </>
    ),
    subtitulo: SUBPROMESA,
    botao: BOTAO,
  },
  // C
  v3: {
    landing: "/v3",
    titulo: (
      <>
        {"Aprendé a invertir en los "}
        <span className={branco}>mercados financieros</span>
        {" y "}
        <span className={branco}>hacé rendir tu dinero</span>
        {" generando "}
        <span className={verde}>500 a 2.000 dólares extra por mes</span>
      </>
    ),
    subtitulo: SUBPROMESA,
    botao: BOTAO,
  },
  // D
  v4: {
    landing: "/v4",
    titulo: (
      <>
        {"No se trata de ahorrar más, sino de "}
        <span className={branco}>qué hacés con tu dinero</span>
        {". Aprendé a invertir en los "}
        <span className={branco}>mercados financieros</span>
        {" y generá "}
        <span className={verde}>500 a 2.000 extra por mes</span>
      </>
    ),
    subtitulo: SUBPROMESA,
    botao: BOTAO,
  },
}
