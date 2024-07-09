import path, { relative } from "path";

export function isDevFn(mode: string): boolean {
  return mode === "development";
}

export function isProdFn(mode: string): boolean {
  return mode === "production";
}

export function isTest(mode: string): boolean {
  return mode === "test";
}

// 是否生成包预览
export function isReportMode(): boolean {
  return process.env.VITE_REPORT === "true";
}

// 获取用户的根目录
export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}

// 将所有的环境变量配置文件读取到process.env中
export function wrapperEnv(envConfig: Recordable): ViteEnv {
  const ret: any = {};
  for (const envName of Object.keys(envConfig)) {
    let realName = envConfig[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") realName = Number(envConfig[envName]);
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
        console.log("error: =>", error);
      }
    }
    ret[envName] = realName;
  }
  return ret;
}
