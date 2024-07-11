/**
 * UserState
 */

import { RouteObjectType } from "@/router/interface";

export interface UserState {
  token: string;
  userInfo: { name: string };
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
