import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { store } from "@/redux";
import { Provider } from "react-redux";
import "antd/dist/reset.css";
import "@/styles/common.less";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
