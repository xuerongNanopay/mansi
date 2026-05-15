import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [appName, setAppName] = useState("");
  const [listPath, setListPath] = useState<string[]>([]);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  async function readDirectory(path: string) {
    setListPath(await invoke<string[]>("list_files", { path }));
  }

  async function createNewAppTab() {
    console.log("print - createNewAppType")
  }

  return (
    <>
      <nav className="top-nav">
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
            aria-label="Read directory"
            onClick={() => createNewAppTab()}
          >
            +
          </button>
        </div>
      </nav>

      <main className="container">
        <h1>Welcome to Mansi</h1>

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
            greet();
          }}
        >
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="submit">Greet</button>
        </form>
        <p>{greetMsg}</p>

        <ul className="directory-list">
          {listPath.map((path) => (
            <li key={path}>{path}</li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
