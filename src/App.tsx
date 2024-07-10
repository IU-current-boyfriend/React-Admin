import { HashRouter } from "react-router-dom";
import { App as AppProvder } from "antd";
import Router from "@/router/modules/staticRouter";

function App() {
  return (
    <AppProvder>
      <HashRouter>
        <Router />
      </HashRouter>
    </AppProvder>
  );
}
export default App;
