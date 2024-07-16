import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { shallowEqual } from "react-redux";
import { theme, ConfigProvider, App as AppProvider } from "antd";
import { RootState, useSelector, useDispatch } from "@/redux";
import { setGlobalState } from "./redux/modules/global";
import { LanguageType } from "@/redux/interface";
import ProviderRouter from "@/router";
import { getBrowserLang } from "./utils";
import i18n from "@/languages";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isDark, primary, compactAlgorithm, language } = useSelector((state: RootState) => state.global, shallowEqual);

  // 初始化预设算法
  const algorithm = () => {
    const algorithmArr = isDark ? [theme.darkAlgorithm] : [theme.defaultAlgorithm];
    if (compactAlgorithm) algorithmArr.push(theme.compactAlgorithm);
    return algorithmArr;
  };

  // 初始化国际化
  const initLanguage = () => {
    const result = language ?? getBrowserLang();
    dispatch(setGlobalState({ key: "language", value: result as LanguageType }));
    i18n.changeLanguage(language as string);
    dayjs.locale(language === "zh" ? "zh-cn" : "en");
  };

  useEffect(() => {
    initLanguage();
  }, [language]);

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: primary },
        algorithm: algorithm()
      }}
      locale={language === "zh" ? zhCN : enUS}
    >
      <AppProvider>
        <I18nextProvider i18n={i18n}>
          <ProviderRouter />
        </I18nextProvider>
      </AppProvider>
    </ConfigProvider>
  );
};
export default App;
