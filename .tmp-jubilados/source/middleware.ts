import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase()
  const isArgentinaOrUruguay = country === "AR" || country === "UY"

  if (!isArgentinaOrUruguay) {
    const url = request.nextUrl.clone()
    url.pathname = "/intl"
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/"],
}
