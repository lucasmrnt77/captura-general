import type { Metadata } from "next"
import { Landing } from "@/components/landing-page"

// Versión estática de la landing para visitantes fuera de Argentina y Uruguay
// (y para revisores automáticos, ej. Meta). El middleware reescribe "/" hacia
// esta ruta según el país detectado por IP.
export const dynamic = "force-static"
export const revalidate = false

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function IntlPage() {
  return <Landing safeMode={true} />
}
