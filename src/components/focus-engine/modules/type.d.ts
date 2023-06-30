import { TypeKeyCode } from "../key_iptv";
export type TypeFocusItem = {
  id: string,
  rightGo: string[]
  leftGo: string[],
  upGo: string[],
  downGo: string[],
}
type TypeswitchFocusFun = (id: string, _list: TypeFocusItem[], scrollList: TypeScrollIdItem[]) => string | null | undefined
export type TypeScrollIdItem = {
  id: string,
  scrollOrientation: "x" | "y",
  scrollOut?: boolean,
  cacheFocusId?: string,
  list: TypeFocusItem[]
}
export type TypeswitchFocus = {
  "RIGHT": TypeswitchFocusFun,
  "LEFT": TypeswitchFocusFun,
  "UP": TypeswitchFocusFun,
  "DOWN": TypeswitchFocusFun,
}


export type FocusEngineProps = {
  engineType?: string,
  children?: ReactNode;
  /**是否监听keydown @default true */
  listenerKeydown?: boolean;
  onInput?: (ev: TypeKeyCode) => void,
  onBack?: () => void,
  onHome?: () => void,
  onBackSpace?: () => void,
  onDel?: () => void,
  onMenu?: () => void,
  onEnter?: () => void,
  /**默认选中焦点元素的id */
  focusId?: string,
} & React.HTMLAttributes<HTMLDivElement>;

type TypeRenderItem = {
  isFocus: boolean,
  isSelected: boolean,
  id: string,
}
export type FocusEngineItemProps = {
  rightGo?: string[],
  leftGo?: string[],
  upGo?: string[],
  downGo?: string[],
  onInput?: (ev: TypeKeyCode) => void,
  onDel?: () => void,
  onEnter?: () => void,
  renderProps?: (params: TypeRenderItem) => JSX.Element
} & React.HTMLAttributes<HTMLDivElement>;


