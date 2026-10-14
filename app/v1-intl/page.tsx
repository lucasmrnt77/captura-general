import type { Metadata } from "next"
import { LandingPage } from "@/components/landing-page"
import { VARIANTES } from "@/lib/variantes"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
}

// Versão internacional da /v1 (resto do mundo e robô da Meta). Não tem link próprio:
// o visitante continua vendo /v1 no endereço; o next.config.mjs reescreve para cá.
export const dynamic = "force-static"

export default function Page() {
  return <LandingPage safeMode={true} countryLanding={false} variante={VARIANTES.v1} landingVisita="/v1" />
}
