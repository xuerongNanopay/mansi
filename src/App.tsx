import { type ReactNode, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

type AppTab = {
  id: string;
  title: string;
};

type TabsViewProps = {
  activeTab: AppTab;
  tabs: AppTab[];
  onCloseTab: (tabId: string) => void;
  onSelectTab: (tabId: string) => void;
  children: ReactNode;
};

type ActiveTabContentProps = {
  greetMsg: string;
  title: string;
  onGreet: () => void;
  onNameChange: (name: string) => void;
};

function TabsView({
  activeTab,
  tabs,
  onCloseTab,
  onSelectTab,
  children,
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

      <div className="tab-panel" role="tabpanel">
        {children}
      </div>
    </section>
  );
}

function ActiveTabContent({
  greetMsg,
  title,
  onGreet,
  onNameChange,
}: ActiveTabContentProps) {
  return (
    <>
      <h1>{title}</h1>

      <div className="row">
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          onGreet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => onNameChange(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </>
  );
}

// function Tab

// function AppSearchMenu() {
//   return (
//     <>

//     </>
//   )
// }

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [appName, setAppName] = useState("");
  const [tabs, setTabs] = useState<AppTab[]>([
    { id: "welcome", title: "Welcome" },
  ]);
  const [activeTabId, setActiveTabId] = useState("welcome");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  function createNewAppTab() {
    const title = appName.trim() || `App ${tabs.length + 1}`;
    const newTab = {
      id: crypto.randomUUID(),
      title,
    };

    setTabs((currentTabs) => [...currentTabs, newTab]);
    setActiveTabId(newTab.id);
    setAppName("");
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
          tabs={tabs}
          onCloseTab={closeTab}
          onSelectTab={setActiveTabId}
        >
          <ActiveTabContent
            greetMsg={greetMsg}
            title={activeTab.title}
            onGreet={greet}
            onNameChange={setName}
          />
        </TabsView>
      </main>
    </>
  );
}

export default App;
