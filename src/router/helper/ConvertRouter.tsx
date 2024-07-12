import { lazy } from "react";
import { RouteObjectType } from "../interface";
import LazyComponent from "./LazyComponent";
import LayoutIndex from "@/layouts";
import RouterGuard from "./RouterGuard";
import { getFlatMenuList } from "@/utils";

// type C = Parameters<typeof lazy>;

// 获取路由对应的组件模块, Parameters返回的是元组类型，所以需要通过[number]类型获取
const modules = import.meta.glob("@/views/**/*.tsx") as Record<string, Parameters<typeof lazy>[number]>;

const converToDynamicRouterFormat = (authMenuList: RouteObjectType[]) => {
  // 扁平化路由
  const flatMenuList = getFlatMenuList(authMenuList);
  // 扁平化路由之后，还是带有children属性，删除掉
  flatMenuList.forEach(item => {
    item.children && delete item.children;
    // 注册路由,将路由和组件对应
    if (item.element && typeof item.element === "string") {
      const Component = LazyComponent(lazy(modules["/src/views" + item.element + ".tsx"]));
      item.element = <RouterGuard>{Component}</RouterGuard>;
      item.loader = () => {
        return {
          ...item.meta
        };
      };
    }
  });
  // 组装动态路由
  const dynamicRouter: RouteObjectType = {
    element: <LayoutIndex />,
    children: flatMenuList
  };

  return dynamicRouter;
};

export default converToDynamicRouterFormat;
