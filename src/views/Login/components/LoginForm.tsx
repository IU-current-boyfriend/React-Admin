import md5 from "js-md5";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Input } from "antd";
import type { FormInstance, FormProps } from "antd/es/form";
import { LockOutlined, UserOutlined, CloseCircleOutlined, CheckCircleFilled } from "@ant-design/icons";
import { useDispatch } from "@/redux";
import { setToken } from "@/redux/modules/user";
import { notification } from "@/hooks/useMessage";
import { getTimeState } from "@/utils";
import { Login } from "@/api/interface";
import { LoginApi } from "@/api/modules/login";
import { HOME_URL } from "@/config";

const LoginForm: React.FC = () => {
  const formRef = useRef<FormInstance>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish: FormProps["onFinish"] = async (values: Login.IReqLoginForm) => {
    try {
      // 开启加载状态
      setLoading(true);
      // 请求数据
      const { data } = await LoginApi({ ...values, password: md5(values.password) });
      // 将token数据保存到redux中
      dispatch(setToken(data.access_toke));
      // 登录成功提示信息
      notification.success({
        message: getTimeState(),
        description: "欢迎登录👏Hooks-Admin",
        icon: <CheckCircleFilled style={{ color: "#73d13d" }} />
      });

      // 跳转到欢迎页面
      navigate(HOME_URL);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed: FormProps["onFinishFailed"] = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    // 表单重置逻辑
    formRef.current?.resetFields();
  };

  useEffect(() => {
    document.onkeydown = e => {
      if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") navigate(HOME_URL);
    };
    return () => {
      document.onkeydown = () => {};
    };
  }, []);

  return (
    <div className="login-form-content">
      <Form name="login" size="large" autoComplete="off" ref={formRef} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input prefix={<UserOutlined />} placeholder="User: admin/user" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Password: 123456" />
        </Form.Item>
        <Form.Item className="login-form-button">
          <Button shape="round" icon={<CloseCircleOutlined />} onClick={onReset}>
            Reset
          </Button>
          <Button type="primary" shape="round" icon={<UserOutlined />} htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
