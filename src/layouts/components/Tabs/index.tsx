import React, { useEffect, useRef, useState } from "react";
import { useMatches, useLocation, useNavigate } from "react-router-dom";
import { shallowEqual } from "react-redux";
import { Tabs, TabsProps } from "antd";
import { Icon } from "@/components/Icon";
import { RootState, useSelector } from "@/redux";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { addTabs, removeTabs } from "@/redux/modules/tabs";
import { MetaProps } from "@/router/interface";
import MoreButton from "./components/MoreButton";
import "./index.less";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const type = "DraggableTabNode";

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  index: React.Key;
  moveNode: (dragIndex: React.Key, hoverIndex: React.Key) => void;
}

// 不理解拖拽的用法
const DraggableTabNode = ({ index, children, moveNode }: DraggableTabPaneProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) return {};
      return { isOver: monitor.isOver };
    },
    drop: (item: { index: React.Key }) => moveNode(item.index, index)
  });
  const [, drag] = useDrag({ type, item: { index }, collect: monitor => ({ isDragging: monitor.isDragging() }) });
  drop(drag(ref));
  return <div ref={ref}>{children}</div>;
};

// 可以拖拽的tabs栏
const DraggableTabs: React.FC<TabsProps> = ({ items = [] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const fullPath = location.pathname + location.search;

  // order存放的是用于拖拽的tabs栏
  const [order, setOrder] = useState<React.Key[]>([]);

  // orderItems包含拖拽后tabs栏的排序、包含未脱拽的tabs栏顺序
  const orderItems = [...items].sort((a, b) => {
    /* sort逻辑：a - b > 0  [b, a]; a - b < 0 [a, b] */
    /* 拖拽后的tabs栏逻辑 */
    const orderA = order.indexOf(a.key);
    const orderB = order.indexOf(b.key);

    // 此时a，b元素都在order容器中能够查询到.
    if (orderA !== -1 && orderB !== -1) return orderA - orderB;
    if (orderA !== -1) return -1; // 拖动后，a存在，b不存在 a排在前面
    if (orderB !== -1) return 1; // 拖动后，b存在，a不存在 b排在前面

    /* 未拖拽的tabs栏逻辑 根据items中位置进行排序，要获取到a,b元素在原数组中的索引值，按照索引值排序 */
    const ia = items.indexOf(a);
    const ib = items.indexOf(b);
    return ia - ib;
  });

  /* 拖拽tabs栏的方法，dragKey表示拖动的tab栏，hoverKey交换的tab栏 */
  const moveTabNode = (dragKey: React.Key, hoverKey: React.Key) => {
    // 拷贝了一份旧的拖拽tabs栏顺序
    const newOrder = order.slice();
    items.forEach(item => {
      if (item.key && newOrder.indexOf(item.key) === -1) newOrder.push(item.key);
    });
    // 获取dragKey在newOrder的位置
    const dragIndex = newOrder.indexOf(dragKey);
    const hoverIndex = newOrder.indexOf(hoverKey);
    newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, dragKey);
    // 更新页面
    setOrder(newOrder);
  };

  // 二开tabs组件
  const renderTabBar: TabsProps["renderTabBar"] = (tabBarProps, DefaultTabBar) => {
    return (
      <DefaultTabBar {...tabBarProps}>
        {/* 作用域插槽，node是DefaultTabBar子组件传递出来的 */}
        {node => (
          <DraggableTabNode key={node.key} index={node.key!} moveNode={moveTabNode}>
            {node}
          </DraggableTabNode>
        )}
      </DefaultTabBar>
    );
  };

  const onChange = (path: string) => {
    navigate(path);
  };

  const onEdit = (targetKey: TargetKey, action: "add" | "remove") => {
    if (action === "remove" && typeof targetKey === "string") {
      dispatch(removeTabs({ tabPath: targetKey, isCurrent: targetKey === fullPath }));
    }
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Tabs
          hideAdd
          type="editable-card"
          className="tabs-box"
          size="middle"
          renderTabBar={renderTabBar}
          items={orderItems}
          activeKey={fullPath}
          onEdit={onEdit}
          onChange={onChange}
          tabBarExtraContent={<MoreButton />}
        />
      </DndProvider>
    </>
  );
};

const LayoutTabs: React.FC = () => {
  const matches = useMatches();
  const dispatch = useDispatch();
  const location = useLocation();
  const fullPath = location.pathname + location.search;

  const tabsList = useSelector((state: RootState) => state.tabs.tabsList, shallowEqual);
  const flatMenuList = useSelector((state: RootState) => state.auth.flatMenuList, shallowEqual);
  const { tabs, tabsIcon } = useSelector((state: RootState) => state.global, shallowEqual);

  // 初次加载tabs栏的数据
  useEffect(() => {
    initTabs();
  }, []);

  // 初次组装tabs数据，根据flatMenuList数据组装
  const initTabs = () => {
    flatMenuList.forEach(item => {
      if (item.meta?.isAffix && !item.meta.isHide && !item.meta.isFull) {
        const tabValue = {
          icon: item.meta.icon as string,
          title: item.meta.title as string,
          path: item.path as string,
          closable: !item.meta.isAffix
        };
        dispatch(addTabs(tabValue));
      }
    });
  };

  // 路由url地址变化，添加对应的tab栏
  useEffect(() => {
    const meta = matches[matches.length - 1].data as MetaProps;
    if (meta) {
      const tabValue = {
        icon: meta.icon as string,
        title: meta.title as string,
        path: fullPath,
        closable: !meta.isAffix
      };
      dispatch(addTabs(tabValue));
    }
  }, [matches]);

  // 构建tabs需要的数据

  const items = tabsList.map(item => {
    return {
      key: item.path,
      label: (
        <>
          {tabsIcon && <Icon name={item.icon} />}
          {item.title}
        </>
      ),
      closable: item.closable
    };
  });

  return <>{tabs && <DraggableTabs items={items} />}</>;
};

export default LayoutTabs;
