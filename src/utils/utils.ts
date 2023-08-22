import { typeOf } from "./typeOf";

/**
 * 深拷贝工具函数
 * @Date: 2023/08/17 11:24:18
 * @param object 待拷贝变量
 */
export function deepCopy<T>(data: T): T {
  const val = data as any;
  switch (typeOf(val)) {
    case "array": {
      return val.map((item: any) => deepCopy(item));
    }
    case "object": {
      return Object.keys(val).reduce((ret: any, key: string) => {
        ret[key] = deepCopy(val[key]);
        return ret;
      }, {});
    }
    case "date": {
      const newDate = new Date();
      newDate.setTime(val.getTime());
      return newDate as any;
    }
    case "regexp": {
      const pattern = val.valueOf();
      let flags = "";
      flags += pattern.global ? "g" : "";
      flags += pattern.ignoreCase ? "i" : "";
      flags += pattern.multiline ? "m" : "";
      return new RegExp(pattern.source, flags) as any;
    }
    default: {
      return val;
    }
  }
}
