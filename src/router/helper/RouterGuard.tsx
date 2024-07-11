import { useEffect } from "react";
import { useLocation, useMatches, useNavigate } from "react-router-dom";
import { RootState, useSelector } from "@/redux";
import { HOME_URL, LOGIN_URL } from "@/config";
import { MetaProps } from "../interface";
import { shallowEqual } from "react-redux";

interface RouterGuardProps {
  children?: JSX.Element;
}
const RouterGuard = (props: RouterGuardProps) => {
  // 获取当前路由的信息, 形式为[{id, data}]
  const matches = useMatches();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // 挂载navigate提供给非react组件或者react hook函数使用
  window.$navigate = navigate;

  // 获取凭证
  const token = useSelector((state: RootState) => state.user.token, shallowEqual);

  useEffect(() => {
    // 设置页面的表头
    const meta = matches[matches.length - 1].data as MetaProps;
    if (meta) {
      const title = import.meta.env.VITE_GLOB_APP_TITLE;
      document.title = meta?.title ? `${meta.title} - ${title}` : title;
    }
    // 凭证token存在，不能回到login页面
    if (token && pathname === LOGIN_URL) return navigate(HOME_URL);

    // 凭证不存在，不能去到任何页面
    if (!token && pathname !== LOGIN_URL) return navigate(LOGIN_URL, { replace: true });
  }, [matches]);

  return props.children;
};

export default RouterGuard;
