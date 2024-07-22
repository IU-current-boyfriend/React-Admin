import { useEffect, useState, useMemo } from "react";
import { Breadcrumb } from "antd";
import { shallowEqual } from "react-redux";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { RootState, useSelector } from "@/redux";
import { MetaProps, RouteObjectType } from "@/router/interface";
import { Link, useMatches } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { getAllBreadcrumbList } from "@/utils";
import { HOME_URL } from "@/config";

const BreadCrumbNav: React.FC = () => {
  const matches = useMatches();

  // 获取menuList
  const authMenuList = useSelector((state: RootState) => state.auth.authMenuList, shallowEqual);
  // 获取是否展示面包屑
  const breadcrumb = useSelector((state: RootState) => state.global.breadcrumb, shallowEqual);
  // 获取是否展示面包屑图标
  const breadcrumbIcon = useSelector((state: RootState) => state.global.breadcrumbIcon, shallowEqual);
  // 根据菜单列表获取面包屑数据
  const breadcrumbAllList = useMemo(() => getAllBreadcrumbList(authMenuList), [authMenuList]);
  // 获取、更新面包屑的方法
  const [curBreadcurmbList, setCurBreadcrumbList] = useState<ItemType[]>([]);

  // 渲染title

  const renderTitle = (item: RouteObjectType, isLink: boolean) => {
    const { icon, title } = item.meta || {};
    const content = (
      <>
        <span className="mr5">{breadcrumbIcon && <Icon name={icon!} />}</span>
        <span>{title}</span>
      </>
    );
    return isLink ? <Link to={item.path!}>{content}</Link> : content;
  };

  useEffect(() => {
    const meta = matches[matches.length - 1].data as MetaProps;
    if (!meta.key) return;
    let breadcrumbList = breadcrumbAllList[meta.key] || [];
    // 如果你不需要在面包屑中添加home page的话，你可以跳过此行代码；
    if (breadcrumbList[0]?.path !== HOME_URL) {
      breadcrumbList = [{ path: HOME_URL, meta: { icon: "HomeOutlined", title: "页面" } }, ...breadcrumbList];
    }
    // 处理成 antd 面包屑所需的格式
    const antdBreadcrumbList = breadcrumbList.map(item => {
      const isLast = breadcrumbList.lastIndexOf(item) === breadcrumbList.length - 1;

      // 最后一个breadcrumb是不可点击的
      if (isLast) return { title: renderTitle(item, false) };
      // 渲染breadcrumb children，采用的是带下拉菜单的面包屑
      if (item.children) {
        const items = item.children.filter(child => !child.meta?.isHide);
        return items.length
          ? {
              title: <a>{renderTitle(item, false)}</a>,
              menu: {
                items: items.map(child => {
                  return {
                    title: renderTitle(child, true)
                  };
                })
              }
            }
          : { title: renderTitle(item, true) };
      }
      return { title: renderTitle(item, true) };
    });

    setCurBreadcrumbList(antdBreadcrumbList);
  }, [matches]);

  return <>{breadcrumb && <Breadcrumb items={curBreadcurmbList}></Breadcrumb>}</>;
};

export default BreadCrumbNav;
