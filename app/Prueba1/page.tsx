import { Landing } from "@/components/jubilados/landing-page"

export const dynamic = "force-static"
export const revalidate = false

export default function Prueba1JubiladosPage() {
  return <Landing safeMode={false} pressBanner pruebaJubilados prueba1Copy prueba1Layout />
}
