import { Layout } from "antd";
import { createRef } from "react";
import { shallowEqual } from "react-redux";
import { useLocation, useOutlet } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { RootState, useSelector } from "@/redux";
import { RouteObjectType } from "@/router/interface";
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
  const { pathname } = useLocation();
  const flatMenuList = useSelector((state: RootState) => state.auth.flatMenuList, shallowEqual);

  // 之前在做Hooks-Admin项目的时候，这里使用SwitchTransition组件时候，会渲染两次组件，原因在于没有给做动画的每个元素添加nodeRef属性
  const menuList: RouteTypeWithNodeRef[] = flatMenuList.map(item => ({ ...item, nodeRef: createRef() }));
  const { nodeRef } = menuList.find(route => route.path === pathname) ?? {};

  return (
    <>
      <LayoutTabs />
      <SwitchTransition>
        <CSSTransition classNames="fade" key={pathname} nodeRef={nodeRef} timeout={3000} exit={false} unmountOnExit>
          <Content ref={nodeRef}>{outlet}</Content>
        </CSSTransition>
      </SwitchTransition>
      <LayoutFooter />
    </>
  );
};

export default LayoutMain;
