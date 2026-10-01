import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Poppins } from "next/font/google"
import { Suspense } from "react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { DeferredTracking } from "@/components/deferred-tracking"
import { MetaPixel } from "@/components/meta-pixel"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "700"],
})

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
})

export const metadata: Metadata = {
  title: "Formación Online Gratuita sobre Mercados Financieros",
  description:
    "Capacitación educativa y gratuita sobre el funcionamiento de los mercados financieros, pensada para personas que quieren aprender desde cero.",
  keywords: "formación, educación financiera, mercados financieros, aprendizaje, curso online, desde cero",
  openGraph: {
    title: "Formación Online Gratuita sobre Mercados Financieros",
    description:
      "Capacitación educativa y gratuita sobre el funcionamiento de los mercados financieros, para aprender desde cero.",
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
      <head>
        <MetaPixel />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://www.facebook.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
      </head>
      <body className={`font-sans ${montserrat.variable} ${poppins.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <DeferredTracking />
        <SpeedInsights />
      </body>
    </html>
  )
}
