import type { Metadata } from "next"
import { LandingPage } from "@/components/landing-page"
import { resolveSafeMode } from "@/lib/geo"
import { VARIANTES } from "@/lib/variantes"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
}

// Geo: Argentina, Uruguay e Chile veem a versão local; o resto do mundo, a internacional.
// Para testar: ?pais=CL, ?pais=US etc.
export default async function Page({ searchParams }: { searchParams: Promise<{ pais?: string | string[] }> }) {
  const { safeMode } = await resolveSafeMode(await searchParams)
  return <LandingPage safeMode={safeMode} countryLanding={!safeMode} variante={VARIANTES.v2} landingVisita="/v2" />
}
