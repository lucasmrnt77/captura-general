import styles from "./GeoLogoMarquee.module.css"

const LOGOS = [
  { file: "tn.png", alt: "TN", width: 256, height: 114 },
  { file: "canal10.png", alt: "Canal 10", width: 380, height: 94 },
  { file: "infobae.png", alt: "Infobae", width: 394, height: 93 },
  { file: "elpais.png", alt: "El País", width: 516, height: 72 },
  { file: "montevideoportal.png", alt: "Montevideo Portal", width: 466, height: 132 },
  { file: "clarin.png", alt: "Clarín", width: 288, height: 74 },
] as const

export function GeoLogoMarquee() {
  return (
    <section className={styles.press} aria-label="Hablan de nosotros">
      <p className={styles.label}>Hablan de nosotros</p>
      <ul className={styles.track}>
        {LOGOS.map((logo) => (
          <li key={logo.file} className={styles.item}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/jubilados/logos/${logo.file}`}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              loading="lazy"
              decoding="async"
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
