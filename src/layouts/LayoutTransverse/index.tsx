import React from "react";
import { Layout } from "antd";
import { shallowEqual } from "react-redux";
import { RootState, useSelector } from "@/redux";
import ToolBarLeft from "../components/Header/ToolBarLeft";
import ToolBarRight from "../components/Header/ToolBarRight";
import LayoutMenu from "@/layouts/components/Menu";
import LayoutMain from "@/layouts/components/Main";
import logo from "@/assets/images/logo.svg";
import "./index.less";

const { Header, Sider } = Layout;

const LayoutVertical: React.FC = () => {
  const { isCollapse } = useSelector((state: RootState) => state.global, shallowEqual);
  return (
    <section className={`layout-transverse`}>
      <Sider width={210} collapsed={isCollapse}>
        <div className="logo">
          <img src={logo} alt="logo" className="logo-img" />
          {/* 伸缩框位置 */}
          {!isCollapse && <h2 className="logo-text">Hooks Admin</h2>}
        </div>
        <LayoutMenu />
      </Sider>
      <Layout>
        <Header>
          <ToolBarLeft />
          <ToolBarRight />
        </Header>
        <LayoutMain />
      </Layout>
    </section>
  );
};

export default LayoutVertical;
