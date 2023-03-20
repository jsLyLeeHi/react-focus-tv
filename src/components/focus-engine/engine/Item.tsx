import React, { useEffect, useRef, ReactNode, useContext } from 'react'
import { getUUid } from '../path/untils'
import { EngineStore } from "../store"
import { TypeFocusStore } from "../store/index.d"


type FocusEngineItemProps = {
  children: ReactNode;
  //初始化聚焦优先级 0最高
  priority?: number,
  renderProps?: (params: { isfocus: boolean, id: string, store: TypeFocusStore.TypeDefStoreData }) => JSX.Element
} & React.HTMLAttributes<HTMLDivElement>;


export const EngineItem: React.FC<FocusEngineItemProps> = (props) => {
  const widgetId = useRef(getUUid())
  const EngineStoreCtx = useContext(EngineStore)
  useEffect(() => {
    EngineStoreCtx.widgetCreate({ id: widgetId.current })
    return () => {
      EngineStoreCtx.widgetDestroy({ id: widgetId.current })
    }
  }, [])
  function getClassName(_focus: boolean, c?: string) {
    let _class = _focus ? "widget-focus" : "widget-unfocus"
    if (!c) return _class
    _class = c + " " + _class
    return _class
  }
  const _isfocus = EngineStoreCtx.value.id=== widgetId.current
  return <div {...props} id={widgetId.current}
    className={getClassName(_isfocus, props.className)}
    children={(props.renderProps instanceof Function) ? props.renderProps({
      isfocus: _isfocus,
      id: widgetId.current,
      store: EngineStoreCtx.value
    }) : props.children}></div>
}