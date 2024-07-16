import { useState } from "react";
import { Input } from "antd";
import { shallowEqual } from "react-redux";
import { HexColorPicker } from "react-colorful";
import { convertToSixDigitHexColor } from "@/utils";
import { isHexColor } from "@/utils/is";
import { setGlobalState } from "@/redux/modules/global";
import { RootState, useDispatch, useSelector } from "@/redux";
import "./index.less";

/* 提供给颜色选择器下面展示栏用的 */
const presetColors = [
  "#1677FF",
  "#00B96B",
  "#E0282E",
  "#DAA96E",
  "#0C819F",
  "#409EFF",
  "#FF5C93",
  "#E74C3C",
  "#27AE60",
  "#FD726D",
  "#F39C12",
  "#9B59B6"
];

const ColorPicker = () => {
  const dispatch = useDispatch();
  const primary = useSelector((state: RootState) => state.global.primary, shallowEqual);
  const [inputPrimary, setInputPrimary] = useState(primary);

  const changePrimary = (value: string) => {
    dispatch(setGlobalState({ key: "primary", value }));
  };

  return (
    <div className="color-picker">
      <HexColorPicker
        color={primary}
        onChange={e => {
          // 修改主题颜色
          changePrimary(e.toLocaleUpperCase());
          // 修改调色板内容
          setInputPrimary(e.toLocaleUpperCase());
        }}
      />
      <Input
        value={inputPrimary}
        className="picker-input"
        addonBefore="HEX"
        onChange={e => setInputPrimary(e.target.value)}
        onBlur={e => {
          console.log("blur: =>", e.target.value);
          // 失去焦点之后，要校验一下颜色的合法性
          if (isHexColor(e.target.value)) {
            let value = e.target.value;
            // 用户没有输入#号，添加#号
            if (e.target.value[0] !== "#") value = `#${e.target.value}`;
            // convertToSixDigitHexColor用户可以简写,例如#fff之类的
            changePrimary(convertToSixDigitHexColor(value));
            setInputPrimary(convertToSixDigitHexColor(value));
          }
        }}
      />
      <div className="picker-swatches">
        {presetColors.map(presetColors => (
          <button
            className="picker-swatch"
            key={presetColors}
            style={{ backgroundColor: presetColors }}
            onClick={() => {
              setInputPrimary(presetColors);
              changePrimary(presetColors);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
