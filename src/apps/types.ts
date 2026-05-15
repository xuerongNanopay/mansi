import type { ComponentType } from "react";

export type AppId = "custom" | "calculator";

export type AppComponentProps = {
  openAppInTab: (tabId: string, appId: AppId) => void;
  tabId: string;
  title: string;
};

export type AppDefinition = {
  description: string;
  id: AppId;
  name: string;
  component: ComponentType<AppComponentProps>;
};
