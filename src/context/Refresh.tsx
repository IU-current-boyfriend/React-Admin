import { createContext, useState } from "react";

interface RefreshContextType {
  outletShow: boolean;
  updateOutlineShow: (val: boolean) => void;
}

// { outletShow: true, updateOutlineShow: () => {}}默认值
export const RefreshContext = createContext<RefreshContextType>({
  outletShow: true,
  updateOutlineShow: () => {}
});

// eslint-disable-next-line react/prop-types
export const RefreshProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [outletShow, setOutletShow] = useState(true);

  const updateOutlineShow = (val: boolean) => {
    setOutletShow(val);
  };

  const contextValue = {
    outletShow,
    updateOutlineShow
  };

  return <RefreshContext.Provider value={contextValue}>{children}</RefreshContext.Provider>;
};
