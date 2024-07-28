import { SIDEBAR_DICTIONARY } from "../utils";

export type SidebarRouteKey = keyof typeof SIDEBAR_DICTIONARY.ROUTES;
export type SidebarRouteValue = (typeof SIDEBAR_DICTIONARY.ROUTES)[SidebarRouteKey];

export interface SidebarButtonConfig {
  icon: string;
  config: SidebarRouteValue;
}
