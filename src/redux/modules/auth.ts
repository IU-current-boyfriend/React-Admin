import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/redux/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthMenuListApi } from "@/api/modules/login";
// import { getAllBreadcrumbList, getFlatMenuList, getShowMenuList } from "@/utils";
import { RouteObjectType } from "@/router/interface";

const authState: AuthState = {
  // 权限按钮列表
  authButtonList: {},
  // 权限菜单列表
  authMenuList: [],
  // 左侧menu渲染时，需要移除的菜单 isHide = true
  showMenuList: [],
  // 扁平化的数组路由菜单，主要用于动态路由
  flatMenuList: [],
  // 面包屑列表
  breadcrumbAllList: {}
};

export const fetchMenuList = createAsyncThunk("hooks-auth/fetchMenuList", async (/* extraInfo, { dispatch } */) => {
  const { data } = await getAuthMenuListApi();
  return data;
});

const authSlice = createSlice({
  name: "hooks-auth",
  initialState: authState,
  reducers: {
    setAuthMenuList(state, { payload }: PayloadAction<RouteObjectType[]>) {
      state.authMenuList = payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchMenuList.fulfilled, (state, { payload }: PayloadAction<RouteObjectType[]>) => {
      state.authMenuList = payload;
      // state.flatMenuList = getFlatMenuList(payload);
      // state.showMenuList = getShowMenuList(payload);
      // state.breadcrumbAllList = getAllBreadcrumbList(payload);
    });
  }
});

export const { setAuthMenuList } = authSlice.actions;
export default authSlice.reducer;
