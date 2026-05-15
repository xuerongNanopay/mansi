import { useState } from "react";
import { appRegistry } from "./apps/registry";
import type { AppId, AvailableApp } from "./apps/types";
import "./App.css";

type AppTab = {
  id: string;
  title: string;
  appId: AppId;
};

type TabsViewProps = {
  activeTab: AppTab;
  availableApps: AvailableApp[];
  tabs: AppTab[];
  onCloseTab: (tabId: string) => void;
  onOpenAppInTab: (tabId: string, appId: AppId) => void;
  onSelectTab: (tabId: string) => void;
};

function TabsView({
  activeTab,
  availableApps,
  tabs,
  onCloseTab,
  onOpenAppInTab,
  onSelectTab,
}: TabsViewProps) {
  return (
    <section className="tab-view">
      <div className="tab-list" role="tablist" aria-label="App tabs">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={tab.id === activeTab.id ? "tab active" : "tab"}
            role="tab"
            aria-selected={tab.id === activeTab.id}
          >
            <button
              className="tab-label"
              type="button"
              onClick={() => onSelectTab(tab.id)}
              title={tab.title}
            >
              {tab.title}
            </button>
            <button
              className="tab-close"
              type="button"
              aria-label={`Close ${tab.title}`}
              disabled={tabs.length === 1}
              onClick={() => onCloseTab(tab.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>

      {tabs.map((tab) => {
        const AppComponent = appRegistry[tab.appId].component;

        return (
          <div
            // Ensure existing view do not get re-render.
            key={tab.id}
            className={tab.id === activeTab.id ? "tab-panel active" : "tab-panel"}
            role="tabpanel"
            hidden={tab.id !== activeTab.id}
          >
            <AppComponent
              availableApps={availableApps}
              openAppInTab={onOpenAppInTab}
              tabId={tab.id}
              title={tab.title}
            />
          </div>
        );
      })}
    </section>
  );
}

function App() {
  const availableApps = Object.values(appRegistry)
    .filter((app) => app.isVisibleInLauncher)
    .map(({ description, id, name }) => ({ description, id, name }));
  const [appName, setAppName] = useState("");
  const [tabs, setTabs] = useState<AppTab[]>([
    { id: "welcome", title: "Welcome", appId: "welcome" },
  ]);
  const [activeTabId, setActiveTabId] = useState("welcome");

  function createNewAppTab() {
    const title = "welcome";
    const newTab = {
      id: crypto.randomUUID(),
      title,
      appId: "welcome" as const,
    };

    setTabs((currentTabs) => [...currentTabs, newTab]);
    setActiveTabId(newTab.id);
    setAppName("");
  }

  function openAppInTab(tabId: string, appId: AppId) {
    const app = appRegistry[appId];

    setTabs((currentTabs) =>
      currentTabs.map((tab) =>
        tab.id === tabId
          ? {
              ...tab,
              appId,
              title: app.name,
            }
          : tab,
      ),
    );
  }

  function closeTab(tabId: string) {
    if (tabs.length === 1) {
      return;
    }

    const closingTabIndex = tabs.findIndex((tab) => tab.id === tabId);
    const nextTabs = tabs.filter((tab) => tab.id !== tabId);

    setTabs(nextTabs);

    if (activeTabId === tabId) {
      const nextActiveTab = nextTabs[Math.min(closingTabIndex, nextTabs.length - 1)];
      setActiveTabId(nextActiveTab.id);
    }
  }

  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

  return (
    <>
      <nav className="top-nav">
        <div className="nav-drag-region" data-tauri-drag-region />
        <div className="nav-search">
          <input
            id="directory-input"
            value={appName}
            onChange={(e) => setAppName(e.currentTarget.value)}
            placeholder="Search application..."
          />
          <button
            className="nav-add-button"
            type="button"
            aria-label="Create app tab"
            onClick={() => createNewAppTab()}
          >
            +
          </button>
        </div>
        <div className="nav-drag-region" data-tauri-drag-region />
      </nav>

      <main className="container">
        <TabsView
          activeTab={activeTab}
          availableApps={availableApps}
          tabs={tabs}
          onCloseTab={closeTab}
          onOpenAppInTab={openAppInTab}
          onSelectTab={setActiveTabId}
        />
      </main>
    </>
  );
}

export default App;
