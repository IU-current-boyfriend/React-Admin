import { CustomAxiosRequestConfig } from "..";
import qs from "qs";

// 定义Map结构用来存放需要取消的request请求

const pendingMap = new Map<string, AbortController>();

// 序列化请求中的config配置，作为map结构中的键名
export const getPendingUrl = (config: CustomAxiosRequestConfig) => {
  return [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join("&");
};

// 取消请求类
export class AxiosCanlcel {
  /**
   * 添加需要取消的请求
   */
  addPending(config: CustomAxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    const controller = new AbortController();
    // signal信号
    config.signal = controller.signal;
    pendingMap.set(url, controller);
  }

  /**
   * 取消请求
   */
  removePending(config: CustomAxiosRequestConfig) {
    const url = getPendingUrl(config);
    const controller = pendingMap.get(url);
    controller && controller.abort();
  }

  /**
   * 清除所有的请求
   */
  clearAllPending() {
    // 终止所有的请求
    pendingMap.forEach(controller => {
      controller && controller.abort();
    });
    // 清除map结构中的请求
    pendingMap.clear();
  }
}
