import { useState, useEffect } from "react";
import { RouterProvider as Router, createHashRouter, type RouteObject } from "react-router-dom";
import { shallowEqual } from "react-redux";
import warppedStaticRouter from "./modules/staticRouter";
import useMessage from "@/hooks/useMessage";
import useTheme from "@/hooks/useTheme";
import { useSelector } from "@/redux";
import { RouteObjectType } from "./interface";
import { RootState } from "@/redux";
import NotFound from "@/components/Error/404";
import converToDynamicRouterFormat from "./helper/ConvertRouter";

const RouterProvider: React.FC = () => {
  /* 处理theme */
  const { initTheme } = useTheme();
  initTheme();
  useMessage();
  /* 获取有权限的路由 */
  const authMenuList = useSelector((state: RootState) => state.auth.authMenuList, shallowEqual);
  /* 获取静态路由信息 */
  const [routerList, setRouterList] = useState<RouteObjectType[]>(warppedStaticRouter);

  useEffect(() => {
    const dynamicRouter = converToDynamicRouterFormat(authMenuList);

    // 静态路由和动态路由组合
    const allRouter = authMenuList.length ? [dynamicRouter, ...warppedStaticRouter] : warppedStaticRouter;

    // 要防止404刷新页面，请在末尾添加 * 路由, 目前感觉没有什么用
    allRouter.forEach(item => item.path === "*" && (item.element = <NotFound />));

    // 设置路由
    setRouterList(allRouter);
  }, [authMenuList]);

  return <Router router={createHashRouter(routerList as RouteObject[])} />;
};

export default RouterProvider;
