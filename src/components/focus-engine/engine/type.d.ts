type TypeswitchFocusFun = (id: string, _list: string[]) => string | null | undefined
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
} & React.HTMLAttributes<HTMLDivElement>;

export type FocusEngineItemProps = {
  children: ReactNode;
  //初始化聚焦优先级 0最高
  priority?: number,
  renderProps?: (params: { isfocus: boolean, id: string, store: TypeFocusStore.TypeDefStoreData }) => JSX.Element
} & React.HTMLAttributes<HTMLDivElement>;