import { Layout } from "antd";
import { createRef, useEffect, useContext } from "react";
import { shallowEqual } from "react-redux";
import { useLocation, useOutlet } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { RootState, useSelector, useDispatch } from "@/redux";
import { setGlobalState } from "@/redux/modules/global";
import { useDebounceFn } from "ahooks";
import { RouteObjectType } from "@/router/interface";
import { RefreshContext } from "@/context/Refresh";
import Maximize from "./components/Maximize";
import LayoutTabs from "@/layouts/components/Tabs";
import LayoutFooter from "@/layouts/components/Footer";
import "./index.less";

/**
 *
 * 添加nodeRef属性的路由信息配置数组类型
 *
 */
type RouteTypeWithNodeRef = {
  nodeRef?: React.Ref<HTMLElement> | undefined;
} & RouteObjectType;

const { Content } = Layout;

const LayoutMain: React.FC = () => {
  const outlet = useOutlet();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { flatMenuList } = useSelector(
    (state: RootState) => ({
      flatMenuList: state.auth.flatMenuList
    }),
    shallowEqual
  );
  const { isCollapse, maximize } = useSelector(
    (state: RootState) => ({
      isCollapse: state.global.isCollapse,
      maximize: state.global.maximize
    }),
    shallowEqual
  );
  const { outletShow } = useContext(RefreshContext);

  // 之前在做Hooks-Admin项目的时候，这里使用SwitchTransition组件时候，会渲染两次组件，原因在于没有给做动画的每个元素添加nodeRef属性
  const menuList: RouteTypeWithNodeRef[] = flatMenuList.map(item => ({ ...item, nodeRef: createRef() }));
  const { nodeRef } = menuList.find(route => route.path === pathname) ?? {};

  // 监听window的变化，伸缩菜单
  const { run } = useDebounceFn(
    () => {
      const screenWidth = document.body.clientWidth;
      if (!isCollapse && screenWidth < 1200) {
        dispatch(setGlobalState({ key: "isCollapse", value: true }));
      }
      if (isCollapse && screenWidth > 1200) {
        dispatch(setGlobalState({ key: "isCollapse", value: false }));
      }
    },
    { wait: 100 }
  );

  useEffect(() => {
    window.addEventListener("resize", run, false);
    return () => window.removeEventListener("resize", run, false);
  }, []);

  // 监视当前页面是否最大化，动态添加类
  useEffect(() => {
    const root = document.getElementById("root") as HTMLElement;
    if (maximize) root.classList.add("main-maximize");
    else root.classList.remove("main-maximize");
  }, [maximize]);

  return (
    <>
      <Maximize />
      <LayoutTabs />
      <SwitchTransition>
        <CSSTransition classNames="fade" key={pathname} nodeRef={nodeRef} timeout={3000} exit={false} unmountOnExit>
          <Content ref={nodeRef}>{outletShow && outlet}</Content>
        </CSSTransition>
      </SwitchTransition>
      <LayoutFooter />
    </>
  );
};

export default LayoutMain;
