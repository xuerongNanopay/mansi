import { appRegistry } from "./registry";
import type { WelcomeAppProps } from "./types";
import styles from "./WelcomeApp.module.css";

function WelcomeApp({
  openAppInTab,
  tabId,
  title,
}: WelcomeAppProps) {
  const availableApps = Object.values(appRegistry);

  return (
    <div className={styles.welcomeApp}>
      <h1>{title}</h1>
      <p>Select an application to open in this tab.</p>

      <div className={styles.appPicker}>
        {availableApps.map((app) => (
          <button
            className={styles.appPickerItem}
            key={app.id}
            type="button"
            onClick={() => openAppInTab(tabId, app.id)}
          >
            <span className={styles.appPickerName}>{app.name}</span>
            <span className={styles.appPickerDescription}>{app.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default WelcomeApp;
