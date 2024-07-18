import { createFromIconfontCN } from "@ant-design/icons";

import * as Icons from "@ant-design/icons";

import React from "react";

interface IconProps {
  name: string;
}

export const Icon: React.FC<IconProps> = ({ name }) => {
  const customIcon: { [key: string]: any } = Icons;
  // 将字符串转为组件
  return React.createElement(customIcon[name]);
};

export const IconFont = createFromIconfontCN({
  scriptUrl: ["//at.alicdn.com/t/c/font_3878708_mmx4qpps1zh.js"]
});
