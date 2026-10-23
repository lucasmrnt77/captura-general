import { NextResponse, type NextRequest } from "next/server"
import { COOKIE_DIVISAO, DURACAO_COOKIE, diaUruguai, ehInternacional, escolherVariacao, paginaServida } from "@/lib/divisao"

/**
 * Link único: "/" mostra a variação do teste da vez no mesmo endereço (ver lib/divisao.ts).
 * Só roda em "/". As outras páginas continuam fixas, em cache, sem passar por aqui.
 * middleware.ts (edge, perto da pessoa) e não proxy.ts: no Next 16 o proxy roda em Node e a página
 * servida por ele caía de ~99 para ~68 no PageSpeed. A Trader (edge) tira 100.
 */
export function middleware(req: NextRequest) {
  const q = req.nextUrl.searchParams
  const e = escolherVariacao({
    dia: diaUruguai(),
    cookie: req.cookies.get(COOKIE_DIVISAO)?.value,
    forcada: q.get("variacao"),
    previa: q.get("previa"),
    r: Math.random(),
  })
  if (!e) return NextResponse.next()

  let res: NextResponse
  if (e.caminho === "/") {
    res = NextResponse.next() // página principal: o next.config.mjs cuida do /intl
  } else {
    const url = req.nextUrl.clone()
    url.pathname = paginaServida(e.caminho, ehInternacional(q.get("pais"), req.headers.get("x-vercel-ip-country"), false))
    res = NextResponse.rewrite(url)
  }
  res.headers.set("x-tde-variacao", e.caminho)
  if (e.cookie) res.cookies.set(COOKIE_DIVISAO, e.cookie, { path: "/", maxAge: DURACAO_COOKIE, sameSite: "lax", secure: true })
  return res
}

export const config = { matcher: "/" }
