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
  const refStoreValue = useRef<TypeFocusStore.TypeDefStoreData>(defStoreData)
  const widgetList = useRef<string[]>([])
  function setStore(widgetId: string = widgetList.current[0], defVal?: TypeFocusStore.TypeDefStoreData) {
    if (!widgetList.current.find(v => v === widgetId)) {
      console.error(`setDefWidget:未找到此元素id=${widgetId}`)
      return
    }
    refStoreValue.current = {
      ...(defVal || refStoreValue.current),
      id: widgetId
    }
    setStoreValue(refStoreValue.current)
  }
  /**子组件中有widget创建了 */
  function widgetCreate(p: TypeFocusStore.TypeWidgetParams) {
    if (!widgetList.current.find(c => c === p.id)) {
      widgetList.current.push(p.id)
    }
    setStore()
  }
  /**子组件中有widget销毁了 */
  function widgetDestroy(p: TypeFocusStore.TypeWidgetParams) {
    const _index = widgetList.current.findIndex(c => c === p.id)
    if (_index >= 0) widgetList.current.splice(_index, 1)
    setStore()
  }

  useEffect(function () {
    onEventKeyDown(function (ev) {
      if (listenerKeydown === false) return
      const moveFn = switchFocus[ev as keyof TypeswitchFocus]
      if ((moveFn instanceof Function) && refStoreValue.current.id) {
        const _nextItem = moveFn(refStoreValue.current.id, widgetList.current)
        if (!_nextItem) return
        setStore(_nextItem, {
          ...refStoreValue.current,
          keyCode: ev
        })
      } else {
        setStore(refStoreValue.current.id, {
          ...refStoreValue.current,
          keyCode: ev
        })
      }
    })
  }, [])
  return (
    <EngineStore.Provider value={{ value: storeValue, widgetCreate, widgetDestroy, setCurentId: setStore }}>
      <div {...restProps} />
    </EngineStore.Provider>
  );
};
Engine.Item = EngineItem;


export const FocusEngine = Engine
export default Engine