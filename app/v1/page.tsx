import type { Metadata } from "next"
import { LandingPage } from "@/components/landing-page"
import { VARIANTES } from "@/lib/variantes"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
}

// Página fixa (servida do cache da Vercel, sem montar a cada visita).
// Esta é a versão local (Argentina, Uruguai e Chile). A internacional fica em /v1-intl;
// quem decide é a regra de rewrite do next.config.mjs, pelo país do visitante, sem rodar código.
// Para testar: ?pais=AR (local) ou ?pais=US (internacional).
export const dynamic = "force-static"

export default function Page() {
  return <LandingPage safeMode={false} countryLanding variante={VARIANTES.v1} landingVisita="/v1" />
}
