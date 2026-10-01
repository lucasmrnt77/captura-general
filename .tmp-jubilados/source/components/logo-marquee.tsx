import styles from "./LogoMarquee.module.css";

// Cada logo lleva su propia altura de visualización (h), ajustada a ojo
// para que todos pesen visualmente igual. No los uniformes: "EL PAIS" es
// una serif negrita que domina si la agrandás, y TN son dos letras
// macizas que desaparecen si la achicás.
// width/height son las dimensiones reales del archivo (evitan que el
// layout salte mientras cargan las imágenes).
const LOGOS = [
  { file: "tn.png",               alt: "TN",                h: 38, w: 256, hh: 114 },
  { file: "canal10.png",          alt: "Canal 10",          h: 42, w: 380, hh: 94  },
  { file: "infobae.png",          alt: "Infobae",           h: 31, w: 394, hh: 93  },
  { file: "elpais.png",           alt: "El País",           h: 24, w: 516, hh: 72  },
  { file: "montevideoportal.png", alt: "Montevideo Portal", h: 44, w: 466, hh: 132 },
  { file: "clarin.png",           alt: "Clarín",            h: 33, w: 288, hh: 74  },
] as const;

export default function LogoMarquee() {
  return (
    <section className={styles.press}>
      <p className={styles.label}>Hablan de nosotros</p>

      <div className={styles.marquee}>
        <ul className={styles.track}>
          {LOGOS.map((logo) => {
            return (
              <li
                key={logo.file}
                className={styles.item}
                style={{ "--h": `${logo.h}px` } as React.CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/logos/${logo.file}`}
                  alt={logo.alt}
                  width={logo.w}
                  height={logo.hh}
                  loading="lazy"
                  decoding="async"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
