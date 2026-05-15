import { useState } from "react";
import type { AppComponentProps } from "../types";
import styles from "./Custom.module.css";

function Custom({ title }: AppComponentProps) {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.counterApp}>
      <section className={styles.counterPanel}>
        <p className={styles.eyebrow}>{title}</p>
        <output className={styles.count} aria-label="Counter value">
          {count}
        </output>

        <div className={styles.counterControls}>
          <button type="button" onClick={() => setCount((current) => current - 1)}>
            -
          </button>
          <button type="button" onClick={() => setCount(0)}>
            Reset
          </button>
          <button type="button" onClick={() => setCount((current) => current + 1)}>
            +
          </button>
        </div>
      </section>
    </div>
  );
}

export default Custom;
