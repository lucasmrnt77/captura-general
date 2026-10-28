import { LINK_UNICO_ATIVO } from "@/lib/divisao"
import { LandingPage } from "@/components/landing-page"
import { VARIANTES } from "@/lib/variantes"

// "/" de quem é da Argentina (rewrite no next.config.mjs): mesma página principal, com o sorteio
// usando os pesos da Argentina (porPais.AR em lib/divisao.ts). O endereço continua sendo "/".
export const dynamic = "force-static"
export const metadata = { robots: { index: false, follow: false } }

export default function Page() {
  return <LandingPage safeMode={false} countryLanding landingVisita="/" pais="AR" variantes={LINK_UNICO_ATIVO ? VARIANTES : undefined} />
}
