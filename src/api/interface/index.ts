// 请求响应接口参数类型,不包含data
export interface IResult {
  code: string;
  msg: string;
}

// 请求响应接口参数类型，包含data
export interface IResultData<T = any> extends IResult {
  data: T;
}

// 登录模块接口类型
export namespace Login {
  export interface IReqLoginForm {
    username: string;
    password: string;
  }
  export interface IResLogin {
    access_toke: string;
  }
  export interface IResAuthButtons {
    [key: string]: string[];
  }
}
