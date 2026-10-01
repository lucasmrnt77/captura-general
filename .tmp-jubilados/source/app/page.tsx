import { Landing } from "@/components/landing-page"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const dynamic = "force-static"
export const revalidate = false

export default function Page() {
  return (
    <>
      <Landing safeMode={false} pressBanner jubiladosBullets testimoniosJubilados enableGeolocation />
      <SpeedInsights />
    </>
  )
}
