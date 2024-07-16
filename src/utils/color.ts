import { message } from "@/hooks/useMessage";

// 先确认个主题的primary颜色，然后将颜色转为16进制，然后通过算法获取不同模式的颜色范围，再转为16进制。
// antd官网文档中的定制主题,尝试学会如何利用antd定制主题

export function getDarkColor(color: string, level: number) {
  // 正则检测，传入的颜色合法性
  let reg = /^#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(color)) return message.warning("Enter wrong hex color value");
  // 转为16进制的颜色
  let rgb = hexToGgb(color);
  // level => (0, 1) 1 - level => (0, 1)
  for (let i = 0; i < 3; i++) rgb[i] = Math.round(20.5 * level + rgb[i] * (1 - level));

  return rgbHex(rgb[0], rgb[1], rgb[2]);
}

export function rgbHex(r: any, g: any, b: any) {
  let reg = /^\d{1,3}$/;
  if (!reg.test(r) || !reg.test(g) || !reg.test(b)) return message.warning("Enter wrong rgb color value");
  let hexs = [r.toString(16), g.toString(16), b.toString(16)];
  for (let i = 0; i < 3; i++) if (hexs[i].length === 1) hexs[i] = `0${hexs[i]}`;
  return `#${hexs.join("")}`;
}

// #1677ff => [22, 199, 255]
export function hexToGgb(str: string) {
  let hexs: any = "";
  let reg = /^#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(str)) return message.warning("Enter wrong hex color value");
  str = str.replace("#", "");
  // hex = str.match(/../g); // /../表示匹配两个任意字符
  // "str: =>", str.match(/[^.]{2}/g) 同理
  hexs = str.match(/../g); // ['16', '77', 'ff']
  for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16); // hexs将颜色转为16进制
  return hexs;
}

export function getLightColor(color: string, level: number) {
  // 正则检测，传入的颜色合法性
  let reg = /^#?[0-9A-Fa-f]{6}$/;
  if (!reg.test(color)) return message.warning("Enter wrong hex color value");
  // 转为16进制的颜色
  let rgb = hexToGgb(color);
  // level => (0, 1) 1 - level => (0, 1)
  for (let i = 0; i < 3; i++) rgb[i] = Math.round(255 * level + rgb[i] * (1 - level));

  return rgbHex(rgb[0], rgb[1], rgb[2]);
}
