import { LandingPage } from "@/components/landing-page"

export const dynamic = "force-dynamic"

export default function Page() {
  return <LandingPage safeMode={false} countryLanding />
}
