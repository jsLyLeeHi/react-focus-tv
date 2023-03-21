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
  function setStore(defVal: TypeFocusStore.TypeDefStoreData = refStoreValue.current) {
    if (!widgetList.current.find(v => v === defVal.id)) {
      console.error(`setDefWidget:未找到此元素id=${defVal.id}`)
      return
    }
    refStoreValue.current = {
      ...(defVal || refStoreValue.current),
    }
    setStoreValue(refStoreValue.current)
  }
  /**子组件中有widget创建了 */
  function widgetCreate(p: TypeFocusStore.TypeWidgetParams) {
    if (!widgetList.current.find(c => c === p.id)) {
      widgetList.current.push(p.id)
    }
  }
  /**子组件中有widget销毁了 */
  function widgetDestroy(p: { id: string }) {
    const _index = widgetList.current.findIndex(c => c === p.id)
    if (_index >= 0) widgetList.current.splice(_index, 1)
  }
  /**设置当前选中项 */
  function setCurentId(_id: string) {
    setStore({
      ...(refStoreValue.current || {}),
      id: _id
    })
  }
  //初始化当前选中项
  useEffect(() => {
    if (!storeValue.id) {
      setCurentId(widgetList.current[0])
    }
  }, [widgetList.current])

  useEffect(function () {
    onEventKeyDown(function (ev) {
      if (listenerKeydown === false) return
      const moveFn = switchFocus[ev as keyof TypeswitchFocus]
      let _id = refStoreValue.current.id
      if ((moveFn instanceof Function) && refStoreValue.current.id) {
        const _nextItemId = moveFn(refStoreValue.current.id, widgetList.current)
        if (!_nextItemId) return
        _id = _nextItemId
      }
      setStore({
        ...refStoreValue.current,
        keyCode: ev,
        id: _id
      })
    })
  }, [])
  return (
    <EngineStore.Provider value={{ value: storeValue, widgetCreate, widgetDestroy, setCurentId }}>
      <div {...restProps} />
    </EngineStore.Provider>
  );
};
Engine.Item = EngineItem;


export const FocusEngine = Engine
export default Engine