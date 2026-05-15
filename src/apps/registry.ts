import CalculatorApp from "./CalculatorApp";
import CustomApp from "./CustomApp";
import SolarApp from "./SolarApp";
import type { AppDefinition, AppId } from "./types";

export const appRegistry: Record<AppId, AppDefinition> = {
  custom: {
    description: "A starter app with its own local state per tab.",
    id: "custom",
    name: "Custom App",
    component: CustomApp,
  },
  calculator: {
    description: "A simple calculator with state isolated per tab.",
    id: "calculator",
    name: "Calculator",
    component: CalculatorApp,
  },
  solar: {
    description: "A solar-themed painted background.",
    id: "solar",
    name: "Solar Paint",
    component: SolarApp,
  },
};
