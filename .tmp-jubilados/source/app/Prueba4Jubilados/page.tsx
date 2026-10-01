import { Landing } from "@/components/landing-page"

export const dynamic = "force-static"
export const revalidate = false

export default function Prueba4JubiladosPage() {
  return <Landing safeMode={false} pressBanner pruebaJubilados pruebaDosJubilados jubilacionPromise />
}
