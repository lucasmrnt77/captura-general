import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Poppins } from "next/font/google"
import "./globals.css"

// El GTM ID se resuelve en el cliente según el dominio (ver hooks/use-deferred-gtm.ts)
// y se carga recién cuando el usuario hace clic en un botón de registro. Esto
// evita llamar a headers() en el layout, lo que permite que "/" y "/intl" se
// sirvan como HTML estático.

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "700"],
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Entrenamiento Gratuito y Online sobre los Mercados Financieros",
  description:
    "Sumate a nuestro entrenamiento educativo, gratuito y online para conocer los fundamentos de los mercados financieros desde cero.",
  keywords: "mercados financieros, educación financiera, formación, aprendizaje, finanzas, curso online",
  openGraph: {
    title: "Entrenamiento Gratuito y Online sobre los Mercados Financieros",
    description:
      "Entrenamiento educativo, gratuito y online para conocer los fundamentos de los mercados financieros desde cero.",
    type: "website",
  },
  robots: "index, follow",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${montserrat.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
