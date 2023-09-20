import { ElMessage } from "element-plus";

/**
 * 复制单行内容到粘贴板
 * @Date: 2023/09/19 19:44:44
 * @param content 需要复制的内容
 * @param message 复制完后的提示，不传则默认提示"复制成功"
 */
export function copyToClip(content: string, message?: string) {
  const clipboard = navigator.clipboard;
  if (clipboard) {
    clipboard.writeText(content).then(() => {
      ElMessage({
        message: message || "复制成功！",
        type: "success",
      });
    });
  } else {
    const aux = document.createElement("input");
    aux.setAttribute("value", content);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    ElMessage({
      message: message || "复制成功！",
      type: "success",
    });
  }
}

/**
 * 复制多行内容到粘贴板
 * @Date: 2023/09/19 19:49:51
 * @param contentArray 需要复制的内容（传一个字符串数组）
 * @param message 复制完后的提示，不传则默认提示"复制成功"
 */
export function copyMultiRowToClip(contentArray: string[], message?: string) {
  let contents = "";
  for (let i = 0; i < contentArray.length; i++) {
    contents += contentArray[i] + "\n";
  }
  const clipboard = navigator.clipboard;
  if (clipboard) {
    clipboard.writeText(contents).then(() => {
      ElMessage({
        message: message || "复制成功！",
        type: "success",
      });
    });
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = contents;
    document.body.appendChild(textarea);
    textarea.select();
    if (document.execCommand("copy")) {
      document.execCommand("copy");
    }
    document.body.removeChild(textarea);
    ElMessage({
      message: message || "复制成功！",
      type: "success",
    });
  }
}
