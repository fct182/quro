/**
 * 判断变量类型
 * @Date: 2023/08/17 11:33:56
 * @param obj  待判断变量
 */
export function typeOf(
  obj: any
):
  | "boolean"
  | "number"
  | "string"
  | "function"
  | "array"
  | "date"
  | "regExp"
  | "undefined"
  | "null"
  | "object"
  | "promise"
  | "regexp"
  | null {
  const toString = Object.prototype.toString;
  const map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
    "[object Promise]": "promise",
  };
  const desc = toString.call(obj);
  if (map.hasOwnProperty(desc)) {
    // @ts-ignore
    return map[desc];
  } else {
    console.log("unable to recognise type:" + desc);
    return null;
  }
}
