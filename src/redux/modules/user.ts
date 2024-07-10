import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../interface";

const userState: UserState = {
  token: "",
  userInfo: {
    name: "Hooks"
  }
};

const globalSlice = createSlice({
  name: "hooks-user",
  initialState: userState,
  reducers: {
    setToken(state, { payload }: PayloadAction<string>) {
      state.token = payload;
    },
    setUserInfo(state, { payload }: PayloadAction<string>) {
      state.userInfo.name = payload;
    }
  }
});

export const { setToken, setUserInfo } = globalSlice.actions;
export default globalSlice.reducer;
