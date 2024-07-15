import { setGlobalState } from "@/redux/modules/global";
import { shallowEqual } from "react-redux";
import { RootState, useDispatch, useSelector } from "@/redux";
import { Icon } from "@/components/Icon";
// MenuFoldOutlined => true MenuUnFoldOutLined => false
// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const CollapseIcon: React.FC = () => {
  const { isCollapse } = useSelector((state: RootState) => state.global, shallowEqual);
  const dispatch = useDispatch();

  return (
    <div
      className="collapsed"
      onClick={() =>
        dispatch(
          setGlobalState({
            key: "isCollapse",
            value: !isCollapse
          })
        )
      }
    >
      <Icon name={isCollapse ? "MenuUnfoldOutlined" : "MenuFoldOutlined"} />
    </div>
  );
};
export default CollapseIcon;
