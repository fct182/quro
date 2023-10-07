/**
 * 以水印为中心点旋转
 * @Date: 2023/09/27 17:57:50
 */
export function rotateWatermark(
  ctx: CanvasRenderingContext2D,
  rotateX: number,
  rotateY: number,
  rotate: number
) {
  ctx.translate(rotateX, rotateY);
  ctx.rotate((Math.PI / 180) * Number(rotate));
  ctx.translate(-rotateX, -rotateY);
}

/** 是否重新渲染水印 */
export const reRendering = (
  mutation: MutationRecord,
  watermarkElement?: HTMLElement
) => {
  let flag = false;
  // 是否删除水印节点
  if (mutation.removedNodes.length) {
    flag = Array.from(mutation.removedNodes).some(
      (node) => node === watermarkElement
    );
  }
  // 是否修改过水印dom属性值
  if (mutation.type === "attributes" && mutation.target === watermarkElement) {
    flag = true;
  }
  return flag;
};
