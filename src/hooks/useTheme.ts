import { theme } from "antd";
import { shallowEqual } from "react-redux";
import { RootState, useSelector } from "@/redux";
import { getDarkColor, getLightColor } from "@/utils/color";
import themeConfig from "@/styles/theme";

const useTheme = () => {
  const { isDark, primary, isGrey, isWeak } = useSelector((state: RootState) => {
    return {
      isDark: state.global.isDark,
      primary: state.global.primary,
      isGrey: state.global.isGrey,
      isWeak: state.global.isWeak
    };
  }, shallowEqual);
  const { token }: { [key: string]: any } = theme.useToken();

  const switchDark = () => {
    const html = document.documentElement as HTMLElement;
    if (isDark) html.setAttribute("class", "dark");
    else html.setAttribute("class", "");
    changePrimary();
  };

  const changePrimary = () => {
    const type = isDark ? "dark" : "light";
    // console.log("token: =>", token);

    // 设置本地的less变量
    Object.keys(themeConfig[type]).forEach(item => document.documentElement.style.setProperty(item, themeConfig[type][item]));
    // 设置antd提供的less变量
    Object.keys(token).forEach(item => document.documentElement.style.setProperty(`--hooks-${item}`, token[item]));

    // antd是可以定制主题的颜色的，但是是要针对于组件，选择改变布局的选项呢？不属于antd中的组件，所以他自己写了一套颜色的转换
    // 设置antd中原色的less变量
    for (let i = 1; i <= 9; i++) {
      document.documentElement.style.setProperty(
        `--hooks-colorPrimary${i}`,
        isDark ? `${getDarkColor(primary, i / 10)}` : `${getLightColor(primary, i / 10)}`
      );
    }
  };

  // 在灰色和色弱模式下切换
  const changeGreyOrWeak = () => {
    const body = document.body as HTMLElement;
    body.setAttribute("style", "");
    if (isGrey) body.setAttribute("style", "filter: grayscale(1)");
    if (isWeak) body.setAttribute("style", "filter: invert(80%)");
  };

  // 初始化全局样式
  const initTheme = () => {
    switchDark();
    changeGreyOrWeak();
  };
  return {
    initTheme
  };
};

export default useTheme;
