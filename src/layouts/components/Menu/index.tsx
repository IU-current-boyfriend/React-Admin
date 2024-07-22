import { Menu, type MenuProps } from "antd";
import { useState, useEffect } from "react";
import { shallowEqual } from "react-redux";
import { useLocation, useNavigate, useMatches } from "react-router-dom";
import { RouteObjectType, MetaProps } from "@/router/interface";
import { RootState, useSelector } from "@/redux";
import { Icon } from "@/components/Icon";
import { getOpenKeys } from "@/utils"; // 给isCollapse用的

import "./index.less";

const MenuLayout: React.FC = () => {
  const navigate = useNavigate();
  const matches = useMatches();
  const { pathname } = useLocation();

  const { isDark, isCollapse } = useSelector(
    (state: RootState) => ({
      isDark: state.global.isDark,
      isCollapse: state.global.isCollapse
    }),
    shallowEqual
  );
  const { showMenuList, flatMenuList } = useSelector(
    (state: RootState) => ({
      showMenuList: state.auth.showMenuList,
      flatMenuList: state.auth.flatMenuList
    }),
    shallowEqual
  );
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [openKeys, setOpenkeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);

  type MenuItem = Required<MenuProps>["items"][number];

  const getItem = (
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type
    } as MenuItem;
  };

  // 通过showMenuList处理Antd Menu需要的菜单数据格式
  const handleMenuAsAntdFormat = (menuList: RouteObjectType[], newArr: MenuItem[] = []) => {
    menuList.forEach(item => {
      if (!item.children?.length) return newArr.push(getItem(item.meta?.title, item.path, <Icon name={item.meta!.icon!} />));
      newArr.push(getItem(item.meta?.title, item.path, <Icon name={item.meta!.icon!} />, handleMenuAsAntdFormat(item.children)));
    });
    return newArr;
  };

  // 点击菜单MenuItem, 并不是点击SubMenu
  const clickMenu: MenuProps["onClick"] = ({ key }) => {
    const menu = flatMenuList.find(item => item.path === key);
    // 可能是外部链接，需要打开新的窗口
    if (menu?.meta?.isLink) return window.open(menu.meta.isLink, "_blank");
    navigate(key);
  };

  // SubMenu打开时调用的方法
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenkeys(openKeys);
    const lastestOpenKey = openKeys[openKeys.length - 1];
    // 处理深度的嵌套的MenuItem展开
    if (lastestOpenKey.includes(openKeys[0])) return setOpenkeys(openKeys);
    setOpenkeys(openKeys);
  };

  useEffect(() => {
    setMenuList(handleMenuAsAntdFormat(showMenuList));
  }, []);

  useEffect(() => {
    // 根据不同的url选中不同的menu菜单
    const meta = matches[matches.length - 1].data as MetaProps;
    const keys = meta?.activeMenu ?? pathname;
    setSelectedKeys([keys]);
    /* isCollapse为false的话，就是展开状态；展开状态，你要根据当前pathname来展示对应展开的菜单栏 */
    setTimeout(() => {
      isCollapse || setOpenkeys(getOpenKeys(pathname));
    }, 0);
  }, [matches, isCollapse]);

  return (
    <Menu
      theme={isDark ? "dark" : "light"}
      mode={"inline"}
      items={menuList}
      selectedKeys={selectedKeys}
      onClick={clickMenu}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
    />
  );
};

export default MenuLayout;
