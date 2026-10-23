import { JS_SORTEIO } from "@/lib/sorteio"

/** Script do sorteio do link único — vai antes do conteúdo para escolher a variação antes de pintar. */
export function Sorteio() {
  return <script dangerouslySetInnerHTML={{ __html: JS_SORTEIO }} />
}
