import React from "react";
import { Layout } from "antd";
import LayoutHeader from "@/layouts/components/Header";
import LayoutMenu from "@/layouts/components/Menu";
import LayoutMain from "@/layouts/components/Main";
import logo from "@/assets/images/logo.svg";
import "./index.less";

const { Header, Sider } = Layout;

const LayoutVertical: React.FC = () => {
  return (
    <section className={`layout-transverse`}>
      <Sider width={210}>
        <div className="logo">
          <img src={logo} alt="logo" className="logo-img" />
          <h2 className="logo-text">Hooks Admin</h2>
          {/* 伸缩框位置 */}
        </div>
        <LayoutMenu />
      </Sider>
      <Layout>
        <Header>
          <LayoutHeader />
        </Header>
        <LayoutMain />
      </Layout>
    </section>
  );
};

export default LayoutVertical;
