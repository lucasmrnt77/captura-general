import type { Metadata } from "next"
import { LandingPage } from "@/components/landing-page"
import { VARIANTES } from "@/lib/variantes"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
}

// Versão internacional da /v4 (resto do mundo e robô da Meta). O visitante continua vendo /v4 no endereço.
export const dynamic = "force-static"

export default function Page() {
  return <LandingPage safeMode={true} countryLanding={false} variante={VARIANTES.v4} landingVisita="/v4" />
}
