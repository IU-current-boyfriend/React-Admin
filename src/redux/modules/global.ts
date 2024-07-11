import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalState } from "@/redux/interface";
import { DEFAULT_PRIMARY } from "@/config";

const globalState: GlobalState = {
  // layout mode 布局模式(vertical" | "classic" | "transverse" | "columns")
  layout: "vertical", // 默认纵向布局
  // antd组件的尺寸("small | middle | large")
  componentSize: "middle",
  // antd 小型样式
  compactAlgorithm: false,
  // antd 圆角边框
  borderRadius: 6,
  // 当前系统语言
  language: null,
  // 当前页面是否充满屏幕
  maximize: false,
  // 样式颜色
  primary: DEFAULT_PRIMARY,
  // 暗黑模式
  isDark: false,
  // 灰色模式：
  isGrey: false,
  // 色弱模式
  isWeak: false,
  // 伸缩menu
  isCollapse: false,
  // 面包屑
  breadcrumb: true,
  // 面包屑图标
  breadcrumbIcon: true,
  // tabs标签栏
  tabs: true,
  // tabs标签栏图标
  tabsIcon: true,
  // 页脚
  footer: true,
  // theme样式伸缩框盒子是否显示
  themeDrawerVisible: false
};

/**
 * payload: {
 *  key: key[T]
 * }
 */

const globalSlice = createSlice({
  name: "hooks-global",
  initialState: globalState,
  reducers: {
    setGlobalState<T extends keyof GlobalState>(state: GlobalState, { payload }: PayloadAction<ObjToKeyValueUnion<GlobalState>>) {
      state[payload.key as T] = payload.value as GlobalState[T];
    }
  }
});

export const { setGlobalState } = globalSlice.actions;
export default globalSlice.reducer;
