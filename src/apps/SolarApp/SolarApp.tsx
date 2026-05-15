import type { AppComponentProps } from "../types";
import styles from "./SolarApp.module.css";

function SolarApp({ title }: AppComponentProps) {
  return (
    <div className={styles.solarApp}>
      <div className={styles.sun} />
      <div className={styles.ground} />
      <div className={styles.runner} aria-label="Running cat" role="img">
        <div className={styles.cat}>
          <span className={styles.tail} />
          <span className={styles.body} />
          <span className={styles.head} />
          <span className={styles.earOne} />
          <span className={styles.earTwo} />
          <span className={styles.legOne} />
          <span className={styles.legTwo} />
          <span className={styles.legThree} />
          <span className={styles.legFour} />
        </div>
      </div>
      <div className={styles.content}>
        <h1>{title}</h1>
        <p>Running at sunset</p>
      </div>
    </div>
  );
}

export default SolarApp;
