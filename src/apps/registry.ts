import CalculatorApp from "./CalculatorApp";
import CustomApp from "./CustomApp";
import WelcomeApp from "./WelcomeApp";
import type { AppDefinition, AppId } from "./types";

export const appRegistry: Record<AppId, AppDefinition> = {
  welcome: {
    description: "Choose which application to open in this tab.",
    id: "welcome",
    isVisibleInLauncher: false,
    name: "Welcome",
    component: WelcomeApp,
  },
  custom: {
    description: "A starter app with its own local state per tab.",
    id: "custom",
    isVisibleInLauncher: true,
    name: "Custom App",
    component: CustomApp,
  },
  calculator: {
    description: "A simple calculator with state isolated per tab.",
    id: "calculator",
    isVisibleInLauncher: true,
    name: "Calculator",
    component: CalculatorApp,
  },
};
