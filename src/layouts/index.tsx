import { shallowEqual } from "react-redux";
import { RootState, useSelector } from "@/redux";
import LayoutClassic from "./LayoutClassic";
import LayoutVertical from "./LayoutVertical";
import LayoutColumns from "./LayoutColumns";
import LayoutTransverse from "./LayoutTransverse";

// import ThemeDrawer from '@/layouts/c'

const LayoutIndex: React.FC = () => {
  const layout = useSelector((state: RootState) => state.global.layout, shallowEqual);

  const LayoutComponent = {
    vertical: <LayoutVertical />,
    classic: <LayoutClassic />,
    transverse: <LayoutTransverse />,
    columns: <LayoutColumns />
  };

  return <>{LayoutComponent[layout]}</>;
};

export default LayoutIndex;
