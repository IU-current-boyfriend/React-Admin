import { TabsState, TabsListProps } from "../interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const tabsState: TabsState = {
  tabsList: []
};

const tabsSlice = createSlice({
  name: "hooks-tabs",
  initialState: tabsState,
  reducers: {
    setTabsList(state, { payload }: PayloadAction<TabsState["tabsList"]>) {
      state.tabsList = payload;
    },
    addTab(state, { payload }: PayloadAction<TabsListProps>) {
      // 检测添加的tabs路径在数组内部是否存在
      if (state.tabsList.every(item => item.path !== payload.path)) {
        state.tabsList.push(payload);
      }
    },
    removeTab(state, { payload }: PayloadAction<{ path: string; isCurrent: boolean }>) {
      const tabsList = state.tabsList;
      // 删除标签的行为，可以分为两种，删除当前标签（特殊处理），删除其它标签；
      if (payload.isCurrent) {
        tabsList.forEach((item, index) => {
          // 如果要删除的路径不存在tabsList中，直接返回
          if (item.path !== payload.path) return;
          // 删除标签，跳转到后一个标签的路由地址，如果没有后一个，就跳转到前一个
          const nextTab = tabsList[index + 1] || tabsList[index - 1];
          if (!nextTab) return;
          window.$navigate(nextTab.path);
        });
      }
      state.tabsList = tabsList.filter(item => item.path !== payload.path);
    },
    closeMultipleTab(state, { payload }: PayloadAction<{ path?: string }>) {
      state.tabsList = state.tabsList.filter(item => {
        // 首页的tabs栏不会被关闭掉,跟closable有关系
        return item.path === payload.path || !item.closable;
      });
    },
    setTabTitle(state, { payload }: PayloadAction<string>) {
      const nowFullPath = location.href.substring(1);
      state.tabsList.forEach(item => {
        if (item.path == nowFullPath) item.title = payload;
      });
    }
  }
});

export const { addTab, removeTab, setTabsList, setTabTitle, closeMultipleTab } = tabsSlice.actions;
export default tabsSlice.reducer;
