import { Layout } from "antd";
import { shallowEqual } from "react-redux";
import { RootState, useSelector } from "@/redux";
import "./index.less";

const { Footer } = Layout;

const LayoutFooter: React.FC = () => {
  const footer = useSelector((state: RootState) => state.global.footer, shallowEqual);
  return (
    <>
      {footer && (
        <Footer className="ant-footer">
          <a href="#" target="_blank" rel="noreferrer">
            2023 © Hooks-Admin By Hooks Technology.
          </a>
        </Footer>
      )}
    </>
  );
};

export default LayoutFooter;
