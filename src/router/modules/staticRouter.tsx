import { Navigate, useRoutes, type RouteObject } from "react-router-dom";
import { HOME_URL, LOGIN_URL } from "@/config";
// import { RouteObjectType } from "../interface";
import Login from "@/views/Login/index";
import Home from "@/views/Home";
import NotAuth from "@/components/Error/403";
import NotFound from "@/components/Error/404";
import NotNetwork from "@/components/Error/500";
import useMessage from "@/hooks/useMessage";

/**
 * staticRouter
 */
const staticRouter: RouteObject[] = [
  {
    path: "/home/index",
    element: <Home />
  },
  {
    path: "/",
    element: <Navigate to={HOME_URL} />
  },
  {
    path: LOGIN_URL,
    element: <Login />
    // meta: {
    //   title: "登录"
    // }
  },
  {
    path: "/403",
    element: <NotAuth />
    // meta: {
    //   title: "403页面"
    // }
  },
  {
    path: "/404",
    element: <NotFound />
    // meta: {
    //   title: "404页面"
    // }
  },
  {
    path: "/500",
    element: <NotNetwork />
    // meta: {
    //   title: "500页面"
    // }
  },
  {
    path: "*",
    element: <Navigate to="/404" />
  }
];

const Router = () => {
  useMessage();
  const routes = useRoutes(staticRouter);
  return routes;
};

export default Router;
