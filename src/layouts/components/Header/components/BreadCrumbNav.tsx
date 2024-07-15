import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { shallowEqual } from "react-redux";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { RootState, useSelector } from "@/redux";
import { MetaProps } from "@/router/interface";
import { useMatches } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { HOME_URL } from "@/config";

const BreadCrumbNav: React.FC = () => {
  const matches = useMatches();
  // 面包屑的获取和操作行为
  const [breadcrumbList, setBreadcrumbList] = useState<ItemType[]>([]);
  // 所有的面包屑列表
  const breadcrumbAllList = useSelector((state: RootState) => state.auth.breadcrumbAllList, shallowEqual);
  // 是否需要展示面包屑breadcrumb、面包屑图标
  const { breadcrumb, breadcrumbIcon } = useSelector((state: RootState) => state.global, shallowEqual);

  // 根据当前的url地址信息，展示不同的面包屑
  useEffect(() => {
    // 当前路由携带的信息对象
    const meta = matches[matches.length - 1].data as MetaProps;
    if (meta?.key) {
      let breadcrumbList = breadcrumbAllList[meta.key] || [];
      // 如果你不需要主页上添加面包屑，你可以删除以下条件
      if (breadcrumbList[0]?.path !== HOME_URL) {
        breadcrumbList = [{ path: HOME_URL, meta: { icon: "HomeOutlined", title: "首页" } }, ...breadcrumbList];
      }
      setBreadcrumbList(
        breadcrumbList.map(item => {
          return {
            title: (
              <>
                {breadcrumbIcon && <Icon name={item.meta!.icon!} />}
                <span>{item.meta!.title}</span>
              </>
            )
          };
        })
      );
    }
  }, [matches]);

  return <>{breadcrumb && <Breadcrumb items={breadcrumbList} />}</>;
};

export default BreadCrumbNav;
