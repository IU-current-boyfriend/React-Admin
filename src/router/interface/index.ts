import { type RouteObject } from "react-router-dom";

export interface MetaProps {
  key?: string;
  icon?: string;
  title?: string;
  activeMenu?: string;
  isLink?: string;
  isHide?: boolean;
  isFull?: boolean;
  isAffix?: boolean;
  isKeepAlice?: boolean;
}

export type RouteObjectType = Omit<RouteObject, "children"> & {
  meta?: MetaProps;
  children?: RouteObjectType[];
};
