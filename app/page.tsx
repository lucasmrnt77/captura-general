import { LandingPage } from "@/components/landing-page"

// Página fixa (cache da Vercel). Versão local (Argentina, Uruguai e Chile); o resto do mundo
// recebe /intl pela rewrite do next.config.mjs (sem middleware). Para testar: ?pais=AR ou ?pais=US.
export const dynamic = "force-static"

export default function Page() {
  return <LandingPage safeMode={false} countryLanding landingVisita="/" />
}
