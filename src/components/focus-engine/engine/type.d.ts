import { TypeKeyCode } from "../key_iptv";
type TypeswitchFocusFun = (id: string, _list: string[], scrollList: TypeScrollIdList) => string | null | undefined
export type TypeScrollIdList = { id: string, cacheFocusId?: string, list: string[] }[]
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
  /**默认选中焦点元素的id */
  focusId?: string,
} & React.HTMLAttributes<HTMLDivElement>;

export type FocusEngineItemProps = {
  children: ReactNode;
  //初始化聚焦优先级 0最高
  priority?: number,
  /**是否存在scroll中 @default false */
  inScroll?: boolean,
  onInput?: (ev: TypeKeyCode) => void,
  renderProps?: (params: { isfocus: boolean, id: string, store: TypeFocusStore.TypeDefStoreData }) => JSX.Element
} & React.HTMLAttributes<HTMLDivElement>;