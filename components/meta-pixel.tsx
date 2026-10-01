'use client'

import { usePathname } from "next/navigation"
import Script from "next/script"

const LANDING_PATHS = new Set(["/", "/pag1", "/pag2", "/pag3", "/Prueba1", "/Prueba2", "/Prueba3", "/Prueba4"])

export function MetaPixel() {
  const pathname = usePathname()

  if (!LANDING_PATHS.has(pathname)) return null

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
        (window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '4290138017915368');
        fbq('track', 'PageView');
      `}
    </Script>
  )
}
