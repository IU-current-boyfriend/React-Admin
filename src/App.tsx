import { App as AppProvder } from "antd";
import ProviderRouter from "@/router";

function App() {
  return (
    <AppProvder>
      <ProviderRouter />
    </AppProvder>
  );
}
export default App;
