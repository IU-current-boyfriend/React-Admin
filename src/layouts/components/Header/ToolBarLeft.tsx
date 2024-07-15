import CollapseIcon from "./components/CollapseIcon";
import BreadCrumbNav from "./components/BreadCrumbNav";
import "./index.less";

const ToolBarLeft: React.FC = () => {
  return (
    <div className="tool-bar-lf">
      <CollapseIcon />
      <BreadCrumbNav />
    </div>
  );
};

export default ToolBarLeft;
