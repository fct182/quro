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

/**
 * 注销事件
 * @Date: 2023/09/21 15:51:52
 * @param element dom元素
 * @param event 事件类型
 * @param handler 事件处理函数
 */
export function off(
  element: Element | Document,
  event: string,
  handler: (e: any) => void
) {
  if (element && event) {
    element.removeEventListener(event, handler, false);
  }
}
/**
 * 注册事件
 * @Date: 2023/09/21 15:51:52
 * @param element dom元素
 * @param event 事件类型
 * @param handler 事件处理函数
 */
export function on(
  element: Element | Document,
  event: string,
  handler: (e: any) => void
) {
  if (element && event && handler) {
    element.addEventListener(event, handler, false);
  }
}

/**
 * 仅执行一次，在浏览器下一次重绘之前执行fn回调函数
 * @Date: 2023/09/21 16:10:44
 * @param fn 回调函数
 */
export function rafThrottle(fn: (...args: any[]) => any) {
  let locked = false;
  return function (this: any, ...args: any[]) {
    if (locked) return;
    locked = true;
    window.requestAnimationFrame(() => {
      fn.apply(this, args);
      locked = false;
    });
  };
}
/**
 * 是否为IE浏览器
 * @Date: 2023/09/21 16:27:37
 */
export const isIE = function () {
  return !isNaN(Number(document.DOCUMENT_NODE));
};
/**
 * 是否为Edge浏览器
 * @Date: 2023/09/21 16:27:37
 */
export const isEdge = function () {
  return navigator.userAgent.indexOf("Edge") > -1;
};

/**
 * 是否为火狐浏览器
 * @Date: 2023/09/21 16:27:37
 */
export const isFirefox = function () {
  return !!window.navigator.userAgent.match(/firefox/i);
};
