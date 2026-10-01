import { NextResponse, type NextRequest } from "next/server"

const LOCAL = new Set(["AR", "UY", "CL"])

export function middleware(req: NextRequest) {
  const country = (req.headers.get("x-vercel-ip-country") || "").toUpperCase()
  const forced = req.nextUrl.searchParams.get("__geo")

  const showIntl = forced ? forced === "intl" : country !== "" && !LOCAL.has(country)

  if (!showIntl) {
    const res = NextResponse.next()
    res.headers.set("x-geo", country || "unknown")
    return res
  }

  const url = req.nextUrl.clone()
  url.pathname = "/intl"
  url.searchParams.delete("__geo")
  const res = NextResponse.rewrite(url)
  res.headers.set("x-geo", country)
  return res
}

export const config = {
  matcher: ["/"],
}
