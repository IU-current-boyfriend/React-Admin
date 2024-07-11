import type { SizeType } from "antd/es/config-provider/SizeContext";
/**
 * UserState
 */

import { RouteObjectType } from "@/router/interface";

export type LayoutType = "vertical" | "classic" | "transverse" | "columns";

export type LanguageType = "zh" | "en" | null;

export interface UserState {
  token: string;
  userInfo: { name: string };
}

/* GlobalState */
export interface GlobalState {
  layout: LayoutType;
  componentSize: SizeType;
  compactAlgorithm: boolean;
  borderRadius: number;
  language: LanguageType;
  maximize: boolean;
  primary: string;
  isDark: boolean;
  isGrey: boolean;
  isWeak: boolean;
  isCollapse: boolean;
  breadcrumb: boolean;
  breadcrumbIcon: boolean;
  tabs: boolean;
  tabsIcon: boolean;
  footer: boolean;
  themeDrawerVisible: boolean;
}

/**
 * AuthState
 */

export interface AuthState {
  authButtonList: {
    [key: string]: string[];
  };
  authMenuList: RouteObjectType[];
  showMenuList: RouteObjectType[];
  flatMenuList: RouteObjectType[];
  breadcrumbAllList: {
    [key: string]: RouteObjectType[];
  };
}
