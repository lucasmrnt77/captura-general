import { Landing } from "@/components/jubilados/landing-page"

export const dynamic = "force-static"
export const revalidate = false

export default function Prueba2JubiladosPage() {
  return <Landing safeMode={false} pressBanner pruebaJubilados pruebaDosJubilados prueba2Promise />
}
