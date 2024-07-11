import { Login } from "@/api/interface";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";
import authMenuList from "@/assets/json/authMenuList.json";
import { AuthState } from "@/redux/interface";

// 用户登录API

export const LoginApi = (params: Login.IReqLoginForm) => {
  // Normal post json request => application/json
  return http.post<Login.IResLogin>(PORT1 + `/login`, params, { noLoading: false });

  // return http.post<Login.IReqLoginForm>(PORT1 + `/login`, {}, { params, noLoading: false });

  // Control the current request not to display loading
  // return http.post<Login.ResLogin>(PORT1 + `/login`, params, { noLoading: true });

  // post request carries query parameter  ==>  ?username=admin&password=123456
  // return http.post<Login.ResLogin>(PORT1 + `/login`, {}, { params });

  // post request carries form parameters  ==>  application/x-www-form-urlencoded
  // return http.post<Login.IResLogin>(PORT1 + `/login`, qs.stringify(params));

  // Get requests can carry complex parameters such as arrays
  // return http.get<Login.ResLogin>(PORT1 + `/login?${qs.stringify(params, { arrayFormat: "repeat" })}`);
};

// 获取菜单列表
export const getAuthMenuListApi = () => {
  // return http.get<any[]>(PORT1 + `/menu/list`, {}, { noLoading: false });
  http.get<AuthState["authMenuList"]>(PORT1 + `/menu/list`, {}, { noLoading: false });
  return authMenuList;
};
