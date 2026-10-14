import type { Metadata } from "next"
import { LandingPage } from "@/components/landing-page"
import { VARIANTES } from "@/lib/variantes"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
}

// Página fixa (cache da Vercel). Versão local (Argentina, Uruguai e Chile); a internacional fica em /v2-intl.
// Quem decide é a rewrite do next.config.mjs, pelo país do visitante. Para testar: ?pais=AR ou ?pais=US.
export const dynamic = "force-static"

export default function Page() {
  return <LandingPage safeMode={false} countryLanding variante={VARIANTES.v2} landingVisita="/v2" />
}
