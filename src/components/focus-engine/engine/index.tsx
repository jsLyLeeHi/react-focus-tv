import React, { useEffect, useRef, useState } from 'react'
import { onEventKeyDown } from '../path/untils'
import { EngineStore, defStoreData } from "../store"
import { TypeFocusStore } from "../store/index.d"
import { switchFocus } from './algorithm'
import { TypeswitchFocus, FocusEngineProps, FocusEngineItemProps } from './type'
import { EngineItem } from "./Item"


const Engine: React.FC<FocusEngineProps> & { Item: React.FC<FocusEngineItemProps> } = (props) => {
  const { listenerKeydown, ...restProps } = props;
  const [storeValue, setStoreValue] = useState<TypeFocusStore.TypeDefStoreData>(defStoreData)
  const widgetList = useRef<string[]>([])
  const focusWidgetRef = useRef<string>()
  function setDefWidget(widgetId: string = widgetList.current[0]) {

    if (!widgetList.current.find(v => v === widgetId)) throw (`setDefWidget:未找到此元素id=${widgetId}`)
    setStoreValue({
      ...storeValue,
      id: widgetId
    })
    focusWidgetRef.current = widgetId
  }
  /**子组件中有widget创建了 */
  function widgetCreate(p: TypeFocusStore.TypeWidgetParams) {
    if (!widgetList.current.find(c => c === p.id)) {
      widgetList.current.push(p.id)
    }
    setDefWidget()
  }
  /**子组件中有widget销毁了 */
  function widgetDestroy(p: TypeFocusStore.TypeWidgetParams) {
    const _index = widgetList.current.findIndex(c => c === p.id)
    if (_index >= 0) widgetList.current.splice(_index, 1)
    setDefWidget()
  }

  useEffect(function () {
    onEventKeyDown(function (ev: keyof TypeswitchFocus) {
      if (listenerKeydown === false) return
      const moveFn = switchFocus[ev]
      if (!(moveFn instanceof Function)) return
      if (!focusWidgetRef.current) return
      const _nextItem = moveFn(focusWidgetRef.current, widgetList.current)
      if (!_nextItem) return
      setDefWidget(_nextItem)
    })
  }, [])
  return (
    <EngineStore.Provider value={{ value: storeValue, widgetCreate, widgetDestroy }}>
      <div {...restProps} />
    </EngineStore.Provider>
  );
};
Engine.Item = EngineItem;


export const FocusEngine = Engine
export default Engine