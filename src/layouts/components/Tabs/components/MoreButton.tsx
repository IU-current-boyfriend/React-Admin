import { useContext } from "react";
import { Dropdown, type MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IconFont } from "@/components/Icon";
import { useDispatch } from "@/redux";
import { removeTab, closeMultipleTab } from "@/redux/modules/tabs";
import { HOME_URL } from "@/config";
import { setGlobalState } from "@/redux/modules/global";
import { RefreshContext } from "@/context/Refresh";
import { ReloadOutlined, ExpandOutlined, CloseCircleOutlined, ColumnWidthOutlined, SwitcherOutlined } from "@ant-design/icons";

interface MoreButtonProps {
  path: string;
}

/* eslint-disable react/prop-types */
const MoreButton: React.FC<MoreButtonProps> = ({ path }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { updateOutlineShow } = useContext(RefreshContext);

  const refreshCurrentPage = () => {
    updateOutlineShow(false);
    setTimeout(() => {
      updateOutlineShow(true);
    }, 0);
  };

  const style = { fontSize: "14px" };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span>{t("tabs.refresh")}</span>,
      icon: <ReloadOutlined style={style} />,
      onClick: refreshCurrentPage
    },
    {
      key: "2",
      label: <span>{t("tabs.maximize")}</span>,
      icon: <ExpandOutlined style={style} />,
      onClick: () => dispatch(setGlobalState({ key: "maximize", value: true }))
    },
    {
      type: "divider"
    },
    {
      key: "3",
      label: <span>{t("tabs.closeCurrent")}</span>,
      icon: <CloseCircleOutlined style={style} />,
      onClick: () => dispatch(removeTab({ path, isCurrent: true }))
    },
    {
      key: "4",
      label: <span>{t("tabs.closeOther")}</span>,
      icon: <ColumnWidthOutlined style={style} />,
      onClick: () => dispatch(closeMultipleTab({ path }))
    },
    {
      key: "5",
      label: <span>{t("tabs.closeAll")}</span>,
      icon: <SwitcherOutlined style={style} />,
      onClick: () => {
        dispatch(closeMultipleTab({}));
        navigate(HOME_URL);
      }
    }
  ];

  return (
    <div className="more-button">
      <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }} trigger={["click"]}>
        <div className="more-button-item">
          <IconFont style={{ fontSize: 22 }} type="icon-xiala" />
        </div>
      </Dropdown>
    </div>
  );
};

export default MoreButton;
