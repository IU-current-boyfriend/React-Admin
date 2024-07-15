import AvatarIcon from "./components/AvatarIcon";
import ComponentSize from "./components/ComponentSize";
import UserName from "./components/UserName";
import Language from "./components/Language";
import SearchMenu from "./components/SearchMenu";
import ThemeSetting from "./components/ThemeSetting";
import Message from "./components/Message";
import FullScreen from "./components/FullScreen";
import "./index.less";

const ToolBarRight: React.FC = () => {
  return (
    <div className="tool-bar-ri">
      <div className="header-icon">
        <ComponentSize />
        <Language />
        <SearchMenu />
        <ThemeSetting />
        <Message />
        <FullScreen />
      </div>
      <UserName />
      <AvatarIcon />
    </div>
  );
};

export default ToolBarRight;
