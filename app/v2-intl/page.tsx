import type { Metadata } from "next"
import { LandingPage } from "@/components/landing-page"
import { VARIANTES } from "@/lib/variantes"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
}

// Versão internacional da /v2 (resto do mundo e robô da Meta). O visitante continua vendo /v2 no endereço.
export const dynamic = "force-static"

export default function Page() {
  return <LandingPage safeMode={true} countryLanding={false} variante={VARIANTES.v2} landingVisita="/v2" />
}
