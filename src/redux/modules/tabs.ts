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
    addTabs(state, { payload }: PayloadAction<TabsListProps>) {
      // 检测添加的tabs路径在数组内部是否存在
      if (state.tabsList.every(item => item.path !== payload.path)) {
        state.tabsList.push(payload);
      }
    },
    removeTabs(state, { payload }: PayloadAction<{ tabPath: string; isCurrent: boolean }>) {
      const tabsList = state.tabsList;
      // 删除标签的行为，可以分为两种，删除当前标签（特殊处理），删除其它标签；
      if (payload.isCurrent) {
        tabsList.forEach((item, index) => {
          // 如果要删除的路径不存在tabsList中，直接返回
          if (item.path !== payload.tabPath) return;
          // 删除标签，跳转到后一个标签的路由地址，如果没有后一个，就跳转到前一个
          const nextTab = tabsList[index + 1] || tabsList[index - 1];
          if (!nextTab) return;
          window.$navigate(nextTab.path);
        });
      }
      state.tabsList = tabsList.filter(item => item.path !== payload.tabPath);
    }
  }
});

export const { addTabs, removeTabs, setTabsList } = tabsSlice.actions;
export default tabsSlice.reducer;
