import { COOKIE_DIVISAO, DURACAO_COOKIE, TESTES_DIVISAO, VARIACOES_EXISTENTES } from "@/lib/divisao"

/**
 * Sorteio do link único NO NAVEGADOR (sem servidor no caminho): "/" é uma página fixa em cache,
 * com o texto de todas as variações; este script (≈1 KB, no topo da página) escolhe a variação
 * antes de a tela pintar e marca <html data-v="v2">. O CSS (globals.css) mostra só a escolhida.
 * Mesmas regras de lib/divisao.ts: teste da vez pela data (Uruguai), pesos, cookie (quem volta vê a
 * mesma), ?variacao=v2 força, ?previa=AAAA-MM-DD simula o dia. Sem JS: fica a página principal.
 */
export const JS_SORTEIO = `(function(c){try{
var d=document.documentElement,q=new URLSearchParams(location.search),D=/^\\d{4}-\\d{2}-\\d{2}$/;
function n(x){return("/"+String(x).trim().replace(/^\\/+|\\/+$/g,"")).toLowerCase()}
var ex=c.e.map(n);
function s(v){d.setAttribute("data-v",v==="/"?"principal":v.slice(1))}
function p(x){var o=[];for(var k in x.variacoes){var w=Number(x.variacoes[k]),kk=n(k);if(ex.indexOf(kk)>=0&&w>0)o.push([kk,w])}return o}
var f=q.get("variacao");if(f&&ex.indexOf(n(f))>=0){s(n(f));return}
var pv=q.get("previa")||"",sim=D.test(pv),dia=sim?pv:new Date().toLocaleDateString("en-CA",{timeZone:"America/Montevideo"});
var t=null;c.t.slice().sort(function(a,b){return a.inicio<b.inicio?-1:a.inicio>b.inicio?1:0}).forEach(function(x){if(D.test(x.inicio)&&x.inicio<=dia&&p(x).length)t=x});
if(!t){s("/");return}
var ps=p(t),key=t.inicio+"~"+t.nome,m=document.cookie.match(new RegExp("(?:^|; )"+c.c+"=([^;]*)")),sv=null;
if(m){try{sv=decodeURIComponent(m[1])}catch(e){}}
if(!sim&&sv){var i=sv.lastIndexOf("|");if(i>0&&sv.slice(0,i)===key&&ps.some(function(x){return x[0]===sv.slice(i+1)})){s(sv.slice(i+1));return}}
var tot=0;ps.forEach(function(x){tot+=x[1]});var a=Math.random()*tot,ch=ps[ps.length-1][0];
for(var j=0;j<ps.length;j++){if(a<ps[j][1]){ch=ps[j][0];break}a-=ps[j][1]}
s(ch);if(!sim)document.cookie=c.c+"="+encodeURIComponent(key+"|"+ch)+"; path=/; max-age="+c.d+"; samesite=lax; secure";
}catch(e){}})(${JSON.stringify({ t: TESTES_DIVISAO, e: VARIACOES_EXISTENTES, c: COOKIE_DIVISAO, d: DURACAO_COOKIE })})`
