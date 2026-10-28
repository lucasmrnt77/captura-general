import { jsSorteio } from "@/lib/sorteio"

/** Script do sorteio do link único — vai antes do conteúdo para escolher a variação antes de pintar. */
export function Sorteio({ pais = null }: { pais?: string | null }) {
  return <script dangerouslySetInnerHTML={{ __html: jsSorteio(pais) }} />
}
