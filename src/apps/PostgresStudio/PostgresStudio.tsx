import type { AppComponentProps } from "../types";
import styles from "./PostgresStudio.module.css";

function PostgresStudio({ title }: AppComponentProps) {
  return (
    <div className={styles.postgresStudioApp}>
      <aside className={styles.configBar} aria-label="Database configuration and tables">
        <section className={styles.configSection} aria-label="Database configuration">
          <h2>Database Config</h2>
        </section>

        <section className={styles.tablesSection} aria-label="Database tables">
          <h2>Tables</h2>
        </section>
      </aside>

      <main className={styles.workspace}>
        <section className={styles.emptyState}>
          <p className={styles.eyebrow}>PostgreSQL Client</p>
          <h1>{title}</h1>
        </section>
      </main>
    </div>
  );
}

export default PostgresStudio;
