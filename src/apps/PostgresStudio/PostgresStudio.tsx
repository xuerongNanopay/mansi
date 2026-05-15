import type { AppComponentProps } from "../types";
import styles from "./PostgresStudio.module.css";

function PostgresStudio({ title }: AppComponentProps) {
  return (
    <div className={styles.postgresStudioApp}>
      <section className={styles.emptyState}>
        <p className={styles.eyebrow}>PostgreSQL Client</p>
        <h1>{title}</h1>
      </section>
    </div>
  );
}

export default PostgresStudio;
