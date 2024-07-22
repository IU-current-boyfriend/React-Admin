import axios, { type AxiosRequestConfig, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { message } from "antd";
import { ResultEnum } from "@/enums/httpEnum";
import { LOGIN_URL } from "@/config";
import { checkStatus } from "./helper/checkStatus";
import { IResultData } from "./interface";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import NProgress from "@/config/nprogress";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  noLoading?: boolean;
}

// 基础请求配置信息
const config = {
  // http请求基础url
  baseURL: import.meta.env.VITE_API_URL as string,
  // 请求超时时间
  timeout: ResultEnum.TIMEOUT as number,
  // 配置请求是否可以携带凭证，一般指代token
  withCredentials: true
};

// 请求类
class RequestHTTP {
  // 请求实例对象
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    // 初始化实例对象
    this.service = axios.create(config);
    // 请求拦截器
    this.service.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        // 请求进度条开启
        NProgress.start();
        // 控制请求时是否需要loading加载组件，可以通过外部传递进来，但是config类型是InternalAxiosRequestConfig类型，里面并没有noLoading属性的类型
        config.noLoading || showFullScreenLoading();
        // 设置token请求凭证,凭证存储在请求头中
        if (config.headers && typeof config.headers.set === "function") {
          // config.headers.set('x-access-token', store.getState().user.token);
          config.headers.set("x-access-token", "Auth Bear 1111111111");
        }
        return config;
      },
      error => {
        // 请求失败的异常抛出
        return Promise.reject(error);
      }
    );
    // 响应拦截器
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        // 请求进度条结束
        NProgress.done();
        const { data } = response;
        // 请求结束，取消loading加载组件
        tryHideFullScreenLoading();
        // 登录失败,状态码 401 Unauthorized 代表客户端错误，指的是由于缺乏目标资源要求的身份验证凭证，发送的请求未得到满足。
        if (data.code === ResultEnum.OVERDUE) {
          // 清除token
          console.log("token验证失败");

          // store.dispatch(setToken(""));
          message.error(data.msg);
          // 跳转到登录页面
          window.$navigate(LOGIN_URL);
          // 抛出异常
          return Promise.reject(data);
        }

        // 全局的响应异常，以防止在下载文件时返回数据流，并直接报告错误，而无需编写代码)
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          message.error(data.msg);
          return Promise.reject(data);
        }
        // 响应成功
        return data;
      },
      async (error: AxiosError) => {
        const { response } = error;
        // 请求发生异常，请求进度条结束
        NProgress.done();
        tryHideFullScreenLoading();
        // 网络发生误差 或者 请求超时
        if (error.message.indexOf("timeout") !== -1) message.error("请求超时!请您稍后重试");
        if (error.message.indexOf("Network Error") !== -1) message.error("网络错误！请您稍后重试");
        // 不同的进程，根据错误返回的error code来处理错误
        if (response) checkStatus(response.status);
        // 服务器不返回任何结果(可能是服务器错误或客户端与网络断开连接) ，断开连接处理: 您可以跳转到断开连接页面
        if (!window.navigator.onLine) window.$navigate("/500");
        return Promise.reject(error);
      }
    );
  }
  /**
   * @description 公共的请求方法
   *
   */
  // get方法不存在data属性
  get<T>(url: string, params?: object, _object = {}): Promise<IResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }

  post<T>(url: string, params?: object | string, _object = {}): Promise<IResultData<T>> {
    return this.service.post(url, params, _object);
  }

  put<T>(url: string, params?: object, _object = {}): Promise<IResultData<T>> {
    return this.service.put(url, params, _object);
  }

  delete<T>(url: string, params?: any, _object = {}): Promise<IResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._object, responseType: "blob" });
  }
}

export default new RequestHTTP(config);
