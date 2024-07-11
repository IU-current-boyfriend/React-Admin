import { Navigate } from "react-router-dom";
import { HOME_URL, LOGIN_URL } from "@/config";
import Login from "@/views/Login/index";
import NotAuth from "@/components/Error/403";
import NotFound from "@/components/Error/404";
import NotNetwork from "@/components/Error/500";
import RouterGuard from "../helper/RouterGuard";
import { RouteObjectType } from "../interface";

/**
 * staticRouter
 */
export const staticRouter: RouteObjectType[] = [
  {
    path: "/",
    element: <Navigate to={HOME_URL} />
  },
  {
    path: LOGIN_URL,
    element: <Login />,
    meta: {
      title: "登录"
    }
  },
  {
    path: "/403",
    element: <NotAuth />,
    meta: {
      title: "403页面"
    }
  },
  {
    path: "/404",
    element: <NotFound />,
    meta: {
      title: "404页面"
    }
  },
  {
    path: "/500",
    element: <NotNetwork />,
    meta: {
      title: "500页面"
    }
  },
  {
    path: "*",
    element: <Navigate to="/404" />
  }
];

/**
 * 创建关于Route配置的高阶函数
 *
 */
const warppedStaticRouter = staticRouter.map(route => {
  return {
    ...route,
    element: <RouterGuard>{route.element as JSX.Element}</RouterGuard>,
    loader: () => {
      return { ...route.meta };
    }
  };
});

export default warppedStaticRouter;
