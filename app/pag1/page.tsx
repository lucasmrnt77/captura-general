import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: "/" },
}
import { resolveSafeMode } from "@/lib/geo"

export default async function Pag1Page({
  searchParams,
}: {
  searchParams: Promise<{ pais?: string | string[] }>
}) {
  const sp = await searchParams
  const { safeMode } = await resolveSafeMode(sp)

  return (
    <main className="min-h-screen bg-black">
      <HeroSection safeMode={safeMode} />
    </main>
  )
}
