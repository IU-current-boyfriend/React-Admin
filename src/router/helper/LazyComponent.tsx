import { Suspense, type LazyExoticComponent, ComponentType } from "react";
import { Spin } from "antd";

/**
 * 懒加载的路由
 */

const LazyComponent = (Comp: LazyExoticComponent<ComponentType>) => {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  };
  return (
    <Suspense fallback={<Spin size="large" style={style} />}>
      <Comp />
    </Suspense>
  );
};

export default LazyComponent;
