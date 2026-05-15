import type { AppComponentProps } from "./types";

function WelcomeApp({
  availableApps,
  openAppInTab,
  tabId,
  title,
}: AppComponentProps) {
  return (
    <div className="welcome-app">
      <h1>{title}</h1>
      <p>Select an application to open in this tab.</p>

      <div className="app-picker">
        {availableApps.map((app) => (
          <button
            className="app-picker-item"
            key={app.id}
            type="button"
            onClick={() => openAppInTab(tabId, app.id)}
          >
            <span className="app-picker-name">{app.name}</span>
            <span className="app-picker-description">{app.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default WelcomeApp;
