import { LINK_UNICO_ATIVO } from "@/lib/divisao"
import { LandingPage } from "@/components/landing-page"
import { VARIANTES_INTL } from "@/lib/variantes-intl"

export const dynamic = "force-static"
export const revalidate = false
export const metadata = { robots: { index: false, follow: false } }

export default function Page() {
  return <LandingPage safeMode={true} landingVisita="/" variantes={LINK_UNICO_ATIVO ? VARIANTES_INTL : undefined} />
}
