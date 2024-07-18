import { type RouteObject } from "react-router-dom";

export interface MetaProps {
  key?: string;
  icon?: string;
  title?: string;
  activeMenu?: string;
  isLink?: string;
  isHide?: boolean; // 是否开启tab图标
  isFull?: boolean;
  isAffix?: boolean; // 是否开启tab关闭的图标
  isKeepAlive?: boolean;
}

export type RouteObjectType = Omit<RouteObject, "children"> & {
  meta?: MetaProps;
  children?: RouteObjectType[];
};
