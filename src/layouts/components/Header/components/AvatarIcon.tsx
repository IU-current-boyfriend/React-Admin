import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Dropdown, type MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { HomeOutlined, UserOutlined, FormOutlined, LoginOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { HOME_URL, LOGIN_URL } from "@/config";
import { useDispatch } from "@/redux";
import { logoutApi } from "@/api/modules/login";
import { setToken } from "@/redux/modules/user";
import { setAuthMenuList } from "@/redux/modules/auth";
import { modal, message } from "@/hooks/useMessage";
import InfoModal, { InfoModalRef } from "./InfoModal";
import PasswordModal, { PasswordModalRef } from "./PasswordModal";
import avatar from "@/assets/images/avatar.png";

const AvatarIcon: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const infoRef = useRef<InfoModalRef>(null);
  const passwordRef = useRef<PasswordModalRef>(null);

  const logout = () => {
    console.log("我想要退出");
    modal.confirm({
      title: "温馨提醒💗",
      icon: <ExclamationCircleOutlined />,
      content: "是否确认退出登录",
      okText: "确认",
      cancelText: "取消",
      maskClosable: true,
      onOk: async () => {
        await logoutApi();
        navigate(LOGIN_URL);
        message.success("退出登录成功");
        dispatch(setToken(""));
        setTimeout(() => {
          // 异步更新菜单列表，防止404
          dispatch(setAuthMenuList([]));
        });
      }
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span className="dropdown-item">{t("header.home")}</span>,
      icon: <HomeOutlined style={{ fontSize: "14px" }} />,
      onClick: () => navigate(HOME_URL)
    },
    {
      key: "2",
      label: <span className="dropdown-item">{t("header.personalData")}</span>,
      icon: <UserOutlined style={{ fontSize: "14px" }} />,
      // 点击弹出个人信息弹窗
      onClick: () => infoRef.current?.showModal({ name: "Hooks" })
    },
    {
      key: "3",
      label: <span className="dropdown-item">{t("header.changePassword")}</span>,
      icon: <FormOutlined style={{ fontSize: "14px" }} />,
      // 点击弹出修改个人密码的弹窗
      onClick: () => passwordRef.current?.showModal({ name: "Hooks Password" })
    },
    {
      type: "divider"
    },
    {
      key: "4",
      label: <span className="dropdown-item">{t("header.logout")}</span>,
      icon: <LoginOutlined style={{ fontSize: "14px" }} />,
      // 点击退出
      onClick: () => logout()
    }
  ];
  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottom" arrow>
        <Avatar className="avatar" size={42} src={avatar} />
      </Dropdown>
      {/* 个人信息弹窗 */}
      <InfoModal ref={infoRef} />
      <PasswordModal ref={passwordRef} />
    </>
  );
};

export default AvatarIcon;
