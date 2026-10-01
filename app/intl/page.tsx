import { LandingPage } from "@/components/landing-page"

export const dynamic = "force-static"
export const revalidate = false
export const metadata = { robots: { index: false, follow: false } }

export default function Page() {
  return <LandingPage safeMode={true} />
}
