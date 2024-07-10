import { Button } from "antd";
import { LoginApi } from "@/api/modules/login";

function App() {
  const handelClick = async () => {
    console.log("点击");
    const res = await LoginApi({
      username: "admin",
      password: "123456"
    });
    console.log("res: =>", res);
  };
  return (
    <div className="app-container">
      <Button type="primary" onClick={handelClick}>
        点击请求数据
      </Button>
    </div>
  );
}
export default App;
