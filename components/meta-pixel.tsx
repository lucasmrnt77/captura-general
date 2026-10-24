/**
 * Pixel da Meta no <head>: o PageView sai no início do carregamento, antes do React.
 * O fbevents.js carrega em modo async, então não segura a página.
 * Só nas páginas de captura; as gracias usam o t.js do serviço de tracking.
 */
const PIXEL_ID = "1380310740734731"
const LANDING_PATHS = ["/", "/pag1", "/pag2", "/pag3", "/Prueba1", "/Prueba2", "/Prueba3", "/Prueba4", "/v1", "/v2", "/v3", "/v4", "/intl"]

// PageView só 1 vez por página: o GTM também manda um PageView (tag "trackSingle PageView") quando carrega,
// o que duplicava o evento no envio do formulário. O fbq abaixo ignora o 2º PageView do mesmo endereço.
const SNIPPET = `(function(){var p=location.pathname.replace(/\\/$/,"")||"/";if(${JSON.stringify(LANDING_PATHS)}.indexOf(p)<0)return;
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){var a=arguments,k=location.pathname;
if((a[0]==="track"&&a[1]==="PageView")||(a[0]==="trackSingle"&&a[2]==="PageView")){if(n._pv===k)return;n._pv=k}
n.callMethod?n.callMethod.apply(n,a):n.queue.push(a)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');fbq('track','PageView');})();`

export function MetaPixel() {
  return <script id="meta-pixel" dangerouslySetInnerHTML={{ __html: SNIPPET }} />
}
