import { useState } from "react";
import type { AppComponentProps } from "./types";

function CustomApp({ title }: AppComponentProps) {
  const [note, setNote] = useState("");
  const [count, setCount] = useState(0);

  return (
    <div className="app-tab-content">
      <h1>{title}</h1>
      <p>This app tab is its own mounted application instance.</p>

      <div className="app-tab-controls">
        <input
          value={note}
          onChange={(e) => setNote(e.currentTarget.value)}
          placeholder="Type here, switch tabs, then come back..."
        />
        <button type="button" onClick={() => setCount((current) => current + 1)}>
          Count {count}
        </button>
      </div>
    </div>
  );
}

export default CustomApp;
