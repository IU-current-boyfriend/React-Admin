import { RouteObjectType } from "@/router/interface";

export function getTimeState() {
  let timeNow = new Date();
  let hours = timeNow.getHours();
  if (hours >= 6 && hours <= 10) return `早上好 ⛅`;
  if (hours >= 10 && hours <= 14) return `中午好 🌞`;
  if (hours >= 14 && hours <= 18) return `下午好 🌞`;
  if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
  if (hours >= 0 && hours <= 6) return `凌晨好 🌛`;
}

/**
 * 将MenuList扁平化
 * @param authMenuList
 * @returns
 */
export function getFlatMenuList(authMenuList: RouteObjectType[]): RouteObjectType[] {
  let newMenuList: RouteObjectType[] = JSON.parse(JSON.stringify(authMenuList));
  return newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])]);
}

/**
 * 过滤需要展示出来的Menu菜单，依据是菜单信息中的isHide属性
 * @param authMenuList
 */
export function getShowMenuList(authMenuList: RouteObjectType[]): RouteObjectType[] {
  let newMenuList: RouteObjectType[] = JSON.parse(JSON.stringify(authMenuList));

  return newMenuList.filter(item => {
    item.children?.length && (item.children = getShowMenuList(item.children));
    return !item.meta?.isHide;
  });
}

/**
 * 获取需要展开的菜单栏键值
 * 传入的数据是/home/index
 *  =>
 * ['', 'home', 'index'],
 * ['', 'feat', 'breadcrumb', 'index']
 * /feat/breadcrumb/index => ['/feat/breadcrumb']
 * 你需要传出去的数据['/auth', '/feat/breadcrumb']
 *
 */
export function getOpenKeys(pathname: string): string[] {
  const pathSegment: string[] = pathname.split("/").map((segment: string) => "/" + segment);
  const len = pathSegment.length;
  const openKeys: string[] = pathSegment.filter((path, idx) => path && idx >= 1 && idx < len - 1);
  return openKeys;
}
