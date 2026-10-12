import type { Metadata } from "next"
import { Suspense } from "react"
import { GraciasLancamento } from "@/components/lancamento/gracias"

export const metadata: Metadata = { robots: { index: false, follow: false } }

export default function Page() {
  return (
    <Suspense>
      <GraciasLancamento variante="a" />
    </Suspense>
  )
}
