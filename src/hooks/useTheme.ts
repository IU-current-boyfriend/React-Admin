import { theme } from "antd";
import themeConfig from "@/styles/theme";

const useTheme = () => {
  const isDark = false;
  const { token }: { [key: string]: any } = theme.useToken();

  // 先初始化默认的样式
  const initPrimary = () => {
    const type = isDark ? "dark" : "light";
    // 设置当前的less 变量
    Object.keys(themeConfig[type]).forEach(item => document.documentElement.style.setProperty(item, themeConfig[type][item]));
    // antd less变量
    Object.keys(token).forEach(item => document.documentElement.style.setProperty(`--hooks-${item}`, token[item]));
    // antd primaryColor less variable 暂时先留着，有点复杂;
  };

  // 初始化全局样式
  const initTheme = () => {
    initPrimary();
  };
  return {
    initTheme
  };
};

export default useTheme;
