import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";
import { configureStore, combineReducers, Middleware, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reduxThunk from "redux-thunk";
import user from "./modules/user";
import auth from "./modules/auth";

// 创建reducer
const reducer = combineReducers({ user, auth });

// redux持久化存储
const persistConfig = {
  key: "redux-state",
  storage: storage
};

const persistReducerConfig = persistReducer(persistConfig, reducer);

// redux中间件
const middleWares: Middleware[] = [reduxThunk];

// 创建store对象
export const store = configureStore({
  reducer: persistReducerConfig,
  middleware: middleWares,
  devTools: true
});

// 创建持久化store对象
export const persistor = persistStore(store);

// redux hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
