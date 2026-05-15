import type { ComponentType } from "react";

export type AppId = "custom" | "calculator";

export type AppComponentProps = {
  tabId: string;
  title: string;
};

export type WelcomeAppProps = AppComponentProps & {
  openAppInTab: (tabId: string, appId: AppId) => void;
};

export type AppDefinition = {
  description: string;
  id: AppId;
  name: string;
  component: ComponentType<AppComponentProps>;
};
