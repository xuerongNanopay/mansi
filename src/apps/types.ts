import type { ComponentType } from "react";

export type AppId = "welcome" | "custom";

export type AvailableApp = {
  id: AppId;
  name: string;
  description: string;
};

export type AppComponentProps = {
  availableApps: AvailableApp[];
  openAppInTab: (tabId: string, appId: AppId) => void;
  tabId: string;
  title: string;
};

export type AppDefinition = {
  description: string;
  id: AppId;
  isVisibleInLauncher: boolean;
  name: string;
  component: ComponentType<AppComponentProps>;
};
