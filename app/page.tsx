import { LandingPage } from "@/components/landing-page"
import { VARIANTES } from "@/lib/variantes"

// Página fixa (cache da Vercel). Versão local (Argentina, Uruguai e Chile); o resto do mundo
// recebe /intl pela rewrite do next.config.mjs (sem middleware). Para testar: ?pais=AR ou ?pais=US.
// Link único: traz todas as variações (lib/variantes.tsx) e o sorteio escolhe uma no navegador (lib/sorteio.ts).
export const dynamic = "force-static"

export default function Page() {
  return <LandingPage safeMode={false} countryLanding landingVisita="/" variantes={VARIANTES} />
}
