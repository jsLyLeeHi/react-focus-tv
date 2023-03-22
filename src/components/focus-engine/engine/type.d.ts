import { TypeKeyCode } from "../key_iptv";
type TypeswitchFocusFun = (id: string, _list: string[], scrollList: TypeScrollIdItem[]) => string | null | undefined
export type TypeScrollIdItem = { id: string, cacheFocusId?: string, list: string[] }
export type TypeswitchFocus = {
  "RIGHT": TypeswitchFocusFun,
  "LEFT": TypeswitchFocusFun,
  "UP": TypeswitchFocusFun,
  "DOWN": TypeswitchFocusFun,
}


export type FocusEngineProps = {
  children: ReactNode;
  /**是否监听keydown @default true */
  listenerKeydown?: boolean;
  onInput?: (ev: TypeKeyCode) => void,
  onBack?: () => void,
  /**默认选中焦点元素的id */
  focusId?: string,
} & React.HTMLAttributes<HTMLDivElement>;

type TypeRenderItem={
  isFocus: boolean, 
  isSelected: boolean, 
  id: string, 
}
export type FocusEngineItemProps = {
  //初始化聚焦优先级 0最高
  priority?: number,
  onInput?: (ev: TypeKeyCode) => void,
  renderProps?: (params: TypeRenderItem) => JSX.Element
} & React.HTMLAttributes<HTMLDivElement>;


