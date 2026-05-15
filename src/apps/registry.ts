import Calculator from "./Calculator";
import Custom from "./Custom";
import Solar from "./Solar";
import type { AppDefinition, AppId } from "./types";

export const appRegistry: Record<AppId, AppDefinition> = {
  custom: {
    description: "A starter app with its own local state per tab.",
    id: "custom",
    name: "Custom App",
    component: Custom,
  },
  calculator: {
    description: "A simple calculator with state isolated per tab.",
    id: "calculator",
    name: "Calculator",
    component: Calculator,
  },
  solar: {
    description: "A solar-themed painted background.",
    id: "solar",
    name: "Solar Paint",
    component: Solar,
  },
};
