import type { ProxyOptions } from "vite";

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions>;

// 解析创建代理，配置.env.development代理
export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {};

  for (const [prefix, target] of list) {
    // console.log("prefix: =>", prefix); // /api
    // console.log("target: =>", target); // https://www.fastmock.site/mock/228e546e08fb9b1a06eff269de586b05
    /* 判断target目标地址是否是https://开头 */
    const httpsRE = /^https:\/\//;
    const isHttps = httpsRE.test(target);

    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      //  默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。如果你想要接受，只要设置 secure: false 就行
      ...(isHttps ? { secure: false } : {})
    };
  }

  return ret;
}
