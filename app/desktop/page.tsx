import type { Metadata } from "next"
import { LandingPageDesktop } from "@/components/desktop/landing-page-desktop"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
}

// 12/11/2026: cópia da página principal da General (versão AR/UY/CL, mesma promessa do "/") com a estrutura
// ajustada para o desktop. Página fixa (cache da Vercel). Não entra no sorteio do link único.
export const dynamic = "force-static"

export default function Page() {
  return <LandingPageDesktop landingVisita="/desktop" />
}
