import type { Metadata } from "next"
import ClientGraciasPage from "./client-page"

export const metadata: Metadata = {
  title: "Asegura tu cupo - La Única Ruta del Trader",
  description: "Únete al grupo VIP de WhatsApp del evento",
}

export default function GraciasPage() {
  return <ClientGraciasPage />
}
