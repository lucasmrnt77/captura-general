"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import Script from "next/script"
import { leadDaSessao } from "@/lib/lead-sessao"
import { tde, comLimite, TRACKING_URL } from "@/lib/tracking"
import { LINK_GRUPO_GERAL, LANCAMENTO_TESTE } from "@/lib/lancamento"

/**
 * Página de gracias das páginas de teste (A, B e C).
 * - Abre: "Lead General" pelo serviço de tracking (pixel + servidor com o mesmo event_id).
 * - Cada resposta escolhida é gravada na hora no painel (substitui o ActualizadorPorRespuestaIndividual).
 * - No botão: o serviço de tracking decide se é "Lead Qualificado"; a decisão (sim/não) vai para o painel.
 * - O grupo é aberto pelo redirecionador do painel (troca de grupo quando enche).
 */
export type VarianteGracias = "a" | "b" | "c"

const RESPOSTAS: Record<string, string> = {
  no_imposible: "No, hoy sería imposible",
  no_pero_podria: "No hoy, pero podría organizarme para conseguirlo",
  si_puedo: "Sí, podría hacerlo sin problema",
}

const TEXTOS: Record<VarianteGracias, { faixa: string; titulo: React.ReactNode; progresso: number; subtitulo: React.ReactNode; detalhe: string; foto: boolean; progressivo: boolean; botao: string }> = {
  // A — controle (igual à /gracias-video4)
  a: {
    faixa: "PASO 2 DE 3 · CASI LISTO",
    titulo: <>¡Ya casi estás adentro! <span className="text-[#00D084]">Te falta el último paso</span></>,
    progresso: 85,
    subtitulo: <>Con estas respuestas <span className="text-[#00D084]">preparo las clases</span></>,
    detalhe: "Las adapto a lo que necesita la mayoría. Tardás 20 segundos y te van a servir mucho más.",
    foto: true,
    progressivo: true,
    botao: "UNIRME AL GRUPO",
  },
  // B — reforça que o lugar já está garantido
  b: {
    faixa: "TU LUGAR ESTÁ RESERVADO",
    titulo: <>¡Listo, ya tenés tu lugar! <span className="text-[#00D084]">Ahora entrá al grupo oficial</span></>,
    progresso: 90,
    subtitulo: <>Respondé <span className="text-[#00D084]">3 preguntas rápidas</span> y te llevo al grupo</>,
    detalhe: "Ahí te mando los links de las 4 clases. Con tus respuestas adapto el contenido a tu nivel.",
    foto: true,
    progressivo: true,
    botao: "ENTRAR AL GRUPO OFICIAL",
  },
  // C — compacta: sem foto e com as 3 perguntas visíveis de uma vez
  c: {
    faixa: "ÚLTIMO PASO",
    titulo: <>Confirmá tu lugar en <span className="text-[#00D084]">20 segundos</span></>,
    progresso: 95,
    subtitulo: <>3 preguntas y <span className="text-[#00D084]">listo</span></>,
    detalhe: "Tus respuestas me ayudan a preparar las clases para vos.",
    foto: false,
    progressivo: false,
    botao: "CONFIRMAR Y UNIRME AL GRUPO",
  },
}

/** Envia ao painel (pelo servidor da landing). Nunca trava a página. */
function gravarPerfil(dados: Record<string, unknown>) {
  try {
    void fetch("/api/leads/perfil", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
      keepalive: true,
    }).catch(() => {})
  } catch {}
}

/**
 * Planilha do lançamento de dezembro (Apps Script) — o mesmo envio da página de obrigado de setembro
 * (/gracias-video4): cada pergunta vai na hora em que é escolhida.
 */
// ActualizadorPorRespuestaIndividualDiciembre → planilha "Pagina de Captura General - Diciembre"
const SCRIPT_PREGUNTA = "https://script.google.com/macros/s/AKfycbxBrQ0S_AXKZ48T79LlhA7whguWZE-KlC-F57qu_SDNCSWm8VXuGsVJH5Jmskrmcgzr/exec"

function enviarPlanilha(url: string, dados: Record<string, unknown>, tipo = "text/plain;charset=utf-8") {
  try {
    void fetch(url, { method: "POST", mode: "no-cors", keepalive: true, headers: { "Content-Type": tipo }, body: JSON.stringify(dados) }).catch(() => {})
  } catch {}
}

export function GraciasLancamento({ variante }: { variante: VarianteGracias }) {
  const t = TEXTOS[variante]
  const searchParams = useSearchParams()
  const telefone = searchParams.get("tel") ?? leadDaSessao().telefono ?? ""
  const pais = (searchParams.get("country") ?? "").toUpperCase()
  const email = searchParams.get("email") ?? leadDaSessao().email
  const teste = searchParams.get("tde_teste") === "1"
  const lancamento = teste ? LANCAMENTO_TESTE : undefined

  const [faixa, setFaixa] = useState("")
  const [genero, setGenero] = useState("")
  const [resposta, setResposta] = useState("")
  const [showError, setShowError] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [avisoTeste, setAvisoTeste] = useState("")
  const enviouRef = useRef(false)
  const leadRef = useRef(false)

  const mostrarGenero = !t.progressivo || !!faixa
  const mostrarResposta = !t.progressivo || !!genero

  useEffect(() => {
    if (leadRef.current) return
    leadRef.current = true
    void tde("lead", { telefone, email, pais: pais || undefined }).then((res) => {
      if (!res?.event_id) return
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: "Lead General PageView", event_id: res.event_id })
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const preguntasEnviadas = useRef(new Set<string>())
  const escolher = (campo: "age_range" | "gender" | "respuesta", valor: string, texto?: string) => {
    if (!valor || !telefone) return
    gravarPerfil({ telefono: telefone, lancamento, [campo]: campo === "respuesta" ? RESPOSTAS[valor] ?? valor : valor })
    // Planilha (como em setembro): pergunta 1/2/3 com o texto da opção, uma vez por resposta
    if (teste) return
    const pregunta = campo === "age_range" ? "1" : campo === "gender" ? "2" : "3"
    const respuesta = texto ?? valor
    const chave = `${pregunta}:${respuesta}`
    if (preguntasEnviadas.current.has(chave)) return
    preguntasEnviadas.current.add(chave)
    enviarPlanilha(SCRIPT_PREGUNTA, { telefono: telefone, pregunta, respuesta })
  }

  const enviar = async () => {
    if (!faixa || !genero || !resposta) {
      setShowError(true)
      return
    }
    if (enviouRef.current) return
    enviouRef.current = true
    setShowError(false)
    setEnviado(true)

    // Lead Qualificado: a regra fica no serviço de tracking. Espera no máximo 2,5 s.
    const res = await comLimite(
      tde("qualificar", { telefone, email, pais: pais || undefined, idade: faixa, genero, resposta }),
      2500,
    )

    if (!teste && telefone) {
      // Banco antigo, igual à /gracias-video4 de setembro
      try {
        void fetch("/api/leads/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ telefono: telefone, age_range: faixa, gender: genero, video_id: pais === "UY" ? "X8fXMfEF27s" : "QKaIpxSOAPQ", respuesta: RESPOSTAS[resposta] }),
        }).catch(() => {})
      } catch {}
    }

    gravarPerfil({
      telefono: telefone,
      lancamento,
      age_range: faixa,
      gender: genero,
      respuesta: RESPOSTAS[resposta],
      ...(typeof res?.qualificado === "boolean" ? { qualificado: res.qualificado } : {}),
      // Clicou em "unirme al grupo": é o que o painel conta como lead nos testes de página
      clique_grupo: true,
    })

    if (res?.qualificado && res.event_id) {
      const dados = { event_id: res.event_id, event_category: "conversion", event_label: "respuesta_encuesta_trading", landing_page: "trading_desde_cero", country: pais, age_range: faixa, gender: genero, respuesta: resposta, lead_type: "qualified" }
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: "Lead General Qualificado", ...dados })
    }

    if (teste) {
      setAvisoTeste(`Modo teste: ${res?.qualificado ? "Lead Qualificado enviado" : res ? "não qualificado (só Lead General)" : "sem resposta do tracking"}. O grupo não é aberto em teste.`)
      return
    }
    const aba = window.open(LINK_GRUPO_GERAL, "_blank")
    if (!aba) window.location.href = LINK_GRUPO_GERAL
  }

  const campo = (vazio: boolean) =>
    `w-full p-3 rounded-lg bg-zinc-900 border text-white text-sm md:text-base appearance-none cursor-pointer ${showError && vazio ? "border-red-500" : "border-zinc-700"} focus:outline-none focus:border-green-500 transition-colors`

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Script src={`${TRACKING_URL}/t.js`} data-landing="general" strategy="afterInteractive" />
      <div className="bg-[#00D084] py-3 px-4 text-center">
        <p className="text-xs md:text-sm font-bold tracking-wide text-white">{t.faixa}</p>
      </div>

      <main className="flex-1 flex flex-col items-center justify-start px-4 py-8 max-w-2xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-center text-white text-balance">{t.titulo}</h1>
        <div className="w-full max-w-[600px] h-8 rounded-full bg-zinc-800 overflow-hidden mb-0 relative">
          <div className="h-full rounded-full bg-[#00D084] flex items-center justify-center" style={{ width: `${t.progresso}%` }}>
            <span className="text-sm font-bold text-white">{t.progresso}%</span>
          </div>
        </div>

        {t.foto && (
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tincho-lm3pAs1Y2oLeWAmbT3FKq5t3J3RAad.jpg"
            alt="Tincho, instructor del evento"
            width={240}
            height={240}
            loading="eager"
            className="my-5 h-auto w-full max-w-[200px] rounded-full object-cover md:max-w-[240px]"
          />
        )}

        <h2 className={`text-xl md:text-2xl font-semibold mb-1 text-center text-white text-balance ${t.foto ? "" : "mt-6"}`}>{t.subtitulo}</h2>
        <p className="mb-0 text-center text-base font-normal text-zinc-300">{t.detalhe}</p>
        <p className="mt-2 mb-5 text-center text-[13px] font-normal text-zinc-300">Tus respuestas son anónimas</p>

        <div className="w-full space-y-6 mb-6">
          <div>
            <label htmlFor="edad" className="text-sm md:text-base text-white mb-3 block font-semibold">1. ¿Cuál es tu rango de edad?</label>
            <select id="edad" value={faixa} onChange={(e) => { setFaixa(e.target.value); escolher("age_range", e.target.value, e.target.options[e.target.selectedIndex]?.text); setShowError(false) }} className={campo(!faixa)}>
              <option value="">Seleccionar opción</option>
              <option value="menor_25">Menor de 25</option>
              <option value="25_34">25 a 34 años</option>
              <option value="35_44">35 a 44 años</option>
              <option value="45_54">45 a 54 años</option>
              <option value="55_64">55 a 64 años</option>
              <option value="mayor_65">+65</option>
            </select>
          </div>

          {mostrarGenero && (
            <div className="animate-in fade-in duration-200">
              <label htmlFor="sexo" className="text-sm md:text-base text-white mb-3 block font-semibold">2. ¿Cuál es tu sexo?</label>
              <select id="sexo" value={genero} onChange={(e) => { setGenero(e.target.value); escolher("gender", e.target.value, e.target.options[e.target.selectedIndex]?.text); setShowError(false) }} className={campo(!genero)}>
                <option value="">Seleccionar opción</option>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
              </select>
            </div>
          )}

          {mostrarResposta && (
            <div className="animate-in fade-in duration-200">
              <label htmlFor="capital" className="text-sm md:text-base text-white mb-1 block font-semibold">
                3. En caso de interesarte en iniciar en este mundo, ¿contarías con un capital inicial de 800 a 1000 USD?
              </label>
              <p className="mb-2 text-left text-[13px] font-normal text-zinc-300">
                Solo para saber desde dónde arrancás. Ese dinero no es para mí, queda en tu cuenta y lo manejás vos.
              </p>
              <select id="capital" value={resposta} onChange={(e) => { setResposta(e.target.value); escolher("respuesta", e.target.value, e.target.options[e.target.selectedIndex]?.text); setShowError(false) }} className={campo(!resposta)}>
                <option value="">Seleccionar opción</option>
                <option value="no_imposible">{RESPOSTAS.no_imposible}</option>
                <option value="no_pero_podria">{RESPOSTAS.no_pero_podria}</option>
                <option value="si_puedo">{RESPOSTAS.si_puedo}</option>
              </select>
            </div>
          )}

          {showError && <p className="text-[#00D084] text-sm text-center">Por favor, completa todas las preguntas antes de continuar</p>}
        </div>

        {(faixa && genero && resposta) || !t.progressivo ? (
          <>
            <p className="mt-4 text-center text-sm leading-relaxed">
              <span className="font-bold text-[#00FF00]">Unite al Grupo Oficial del evento para finalizar tu inscripción.</span>{" "}
              <span className="font-normal text-zinc-300">(Ahí recibirás los links de las clases)</span>
            </p>
            <button
              type="button"
              onClick={enviar}
              disabled={enviado}
              className="mt-3 flex items-center justify-center gap-2 w-full bg-[#00FF00] hover:bg-[#00DD00] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 px-8 rounded-full transition-colors pulse-green-button whitespace-nowrap text-base"
            >
              {enviado ? "PROCESANDO..." : t.botao}
            </button>
            {avisoTeste && <p role="status" data-teste-resultado className="mt-3 text-center text-sm text-amber-300">{avisoTeste}</p>}
            <a
              href="https://wa.me/59896356425?text=Hola,%20estoy%20necesitando%20ayuda%20para%20registrarme%20al%20evento"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex min-h-[60px] w-full items-center justify-center rounded-full border border-zinc-400 bg-transparent px-8 py-4 text-center text-[13px] font-bold text-zinc-300 whitespace-nowrap transition-colors hover:border-zinc-200 hover:text-white"
            >
              CONTACTAR A SOPORTE
            </a>
          </>
        ) : null}
      </main>
    </div>
  )
}
