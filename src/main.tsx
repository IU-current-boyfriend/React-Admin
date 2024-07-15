import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { store, persistor } from "@/redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "antd/dist/reset.css";
import "@/styles/common.less";
import "@/assets/iconfont/iconfont.less";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  </React.StrictMode>
);
