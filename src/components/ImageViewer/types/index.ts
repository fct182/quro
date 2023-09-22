/**
 * 图片预览组件Props
 * @Date: 2023/09/22 14:46:07
 */
export interface Props {
  /**
   * 预览图片URL数组
   */
  urlList: string[];
  /**
   * 预览组件的层级
   */
  zIndex?: number;
  /**
   * 预览图片切换触发的回调
   */
  onSwitch?: (val: number) => void;
  /**
   * 点击close图标触发的回调
   */
  onClose?: () => void;
  /**
   * 初始预览图片下标(urlList数组中的下标)
   */
  initialIndex?: number;
  /**
   * 是否是插入body元素中
   */
  appendToBody?: boolean;
  /**
   * 点击遮罩是否关闭预览
   */
  maskClosable?: boolean;
  /**
   * 控制当前预览组件是否展示
   */
  modelValue?: boolean;
  /**
   * 是否上一张、下一张无限循环
   */
  infinite?: boolean;
}
/**
 * 图片预览时的模式
 * @Date: 2023/09/22 14:46:07
 */
export enum ModeEnum {
  /**
   * 宽高自适应窗口
   */
  CONTAIN = "FullScreen",
  /**
   * 原始尺寸
   */
  ORIGINAL = "ScaleToOriginal",
}
/**
 * 图片预览组件状态
 * @Date: 2023/09/22 14:46:07
 */
export interface ImgState {
  /**
   * 当前预览图片下标
   */
  index: number;
  /**
   * 图片是否正在加载
   */
  loading: boolean;
  /**
   * 图片当前预览状态
   */
  mode: ModeEnum;
  /**
   * 图片缩放、位移、旋转状态
   */
  transform: {
    scale: number;
    deg: number;
    offsetX: number;
    offsetY: number;
    enableTransition: boolean;
  };
}
