import React, { useEffect, useRef, useState } from 'react'
import { EngineStore, defStoreData } from "../store"
import { TypeFocusStore } from "../store/index.d"
import { switchFocus, isInScrollId } from './algorithm'
import { TypeswitchFocus, FocusEngineProps, FocusEngineItemProps, TypeScrollIdItem, TypeFocusItem } from './type'
import { EngineItem } from "./Item"
import { cloneDeep } from 'lodash'
import { onKeyDownIntercept } from "../path/untils"


const Engine: React.FC<FocusEngineProps> & { Item: React.FC<FocusEngineItemProps> } = (props) => {
  const { listenerKeydown, onInput, onBack, focusId, ...restProps } = props;
  const [storeValue, setStoreValue] = useState<TypeFocusStore.TypeDefStoreData>(defStoreData)
  const refStoreValue = useRef<TypeFocusStore.TypeDefStoreData>(defStoreData)
  /**scroll元素id列表 */
  const [scrollList, setScrollList] = useState<TypeScrollIdItem[]>([])
  const refScrollList = useRef<TypeScrollIdItem[]>([])
  /**首次进入组件 */
  const firstIn = useRef<boolean>(true)
  /**焦点元素id列表 */
  const focusList = useRef<TypeFocusItem[]>([])
  function setStore(defVal: TypeFocusStore.TypeDefStoreData = refStoreValue.current) {
    if (!focusList.current.find(v => v.id === defVal.id)) {
      console.error(`setDefWidget:未找到此元素id=${defVal.id}`)
      return
    }
    refStoreValue.current = { ...(defVal || refStoreValue.current) }
    setStoreValue(refStoreValue.current)
  }
  /**子组件中有widget创建了 */
  function widgetCreate(p: TypeFocusStore.TypeWidgetParams) {
    const _list = cloneDeep(focusList.current)
    const _idx = _list.findIndex(c => c.id === p.id)
    if (_idx < 0) {
      _list.push(p)
    } else {
      _list[_idx] = p
    }
    focusList.current = _list
  }
  /**子组件中有widget销毁了 */
  function widgetDestroy(p: { id: string }) {
    const _index = focusList.current.findIndex(c => c.id === p.id)
    if (_index >= 0) focusList.current.splice(_index, 1)
  }
  /**子组件中有scroll创建或者销毁了 */
  function scrollEleCreate(p: { id: string, list: TypeFocusItem[], cacheFocusId?: string }) {
    const _list = cloneDeep(refScrollList.current)
    const _idx = _list.findIndex(c => c.id === p.id)
    if (_idx < 0) {
      _list.push(p)
    } else {
      _list[_idx] = p
    }
    refScrollList.current = _list
    setScrollList(_list)
  }
  function scrollEleDestroy(p: { id: string }) {
    const _list = cloneDeep(refScrollList.current)
    const _index = _list.findIndex(c => c.id === p.id)
    if (_index >= 0) _list.splice(_index, 1)
    refScrollList.current = _list
    setScrollList(_list)
  }
  /**设置当前选中项 */
  function setCurentId(_id: string) {
    setStore({
      ...(refStoreValue.current || {}),
      id: _id
    })
  }
  //监听focusId的修改
  useEffect(() => {
    if (!firstIn.current && focusId) {
      setCurentId(focusId)
    }
    firstIn.current = false
  }, [focusId])
  //初始化当前选中项
  useEffect(() => {
    if (!storeValue.id) {
      setCurentId(focusId || focusList.current[0].id)
    }
  }, [focusList.current])
  useEffect(function () {
    /**按键按下 */
    function onKeyDown(e: KeyboardEvent) {
      const _keyValue = onKeyDownIntercept(e)
      if (!_keyValue) return
      //如果设置不监听按键，则不继续执行
      if (listenerKeydown === false) return
      if (_keyValue === "BACK" && (onBack instanceof Function)) {
        onBack()
        return
      }
      if ((onInput instanceof Function) && _keyValue !== "ENTER") {
        onInput(_keyValue)
      }
      const moveFn = switchFocus[_keyValue as keyof TypeswitchFocus]
      let _id = refStoreValue.current.id
      if ((moveFn instanceof Function) && refStoreValue.current.id) {
        const _nextItemId = moveFn(refStoreValue.current.id, focusList.current, refScrollList.current)
        if (!_nextItemId) return
        const _catcheScrollId = isInScrollId(_nextItemId, refScrollList.current)
        //如果当前聚焦元素也是scroll中的元素
        if (isInScrollId(refStoreValue.current.id, refScrollList.current) === _catcheScrollId) {
          _id = _nextItemId
        } else {
          _id = _catcheScrollId ?? _nextItemId
        }
      }
      setStore({
        ...refStoreValue.current,
        keyCode: _keyValue,
        id: _id
      })
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])
  const paramsValue = {
    value: storeValue,
    focusList: focusList.current,
    scrollList,
    widgetCreate,
    widgetDestroy,
    setCurentId,
    scrollEleCreate,
    scrollEleDestroy,
  }
  return (
    <EngineStore.Provider value={paramsValue}>
      <div {...restProps} />
    </EngineStore.Provider>
  );
};
Engine.Item = EngineItem;


export const FocusEngine = Engine
export default Engine