import React, { useEffect, useRef, useState } from 'react'
import { EngineStore, defStoreData } from "../store"
import { TypeFocusStore } from "../store/index.d"
import { switchFocus, isInScrollId } from './algorithm'
import { TypeswitchFocus, FocusEngineProps, FocusEngineItemProps, TypeScrollIdList } from './type'
import { EngineItem } from "./Item"
import { cloneDeep } from 'lodash'
import { onKeyDownIntercept } from "../path/untils"


const Engine: React.FC<FocusEngineProps> & { Item: React.FC<FocusEngineItemProps> } = (props) => {
  const { listenerKeydown, focusId, ...restProps } = props;
  const [storeValue, setStoreValue] = useState<TypeFocusStore.TypeDefStoreData>(defStoreData)
  const refStoreValue = useRef<TypeFocusStore.TypeDefStoreData>(defStoreData)
  /**首次进入组件 */
  const firstIn = useRef<boolean>(true)
  /**焦点元素id列表 */
  const focusList = useRef<string[]>([])
  /**scroll元素id列表 */
  const scrollList = useRef<TypeScrollIdList>([])
  function setStore(defVal: TypeFocusStore.TypeDefStoreData = refStoreValue.current) {
    if (!focusList.current.find(v => v === defVal.id)) {
      console.error(`setDefWidget:未找到此元素id=${defVal.id}`)
      return
    }
    refStoreValue.current = { ...(defVal || refStoreValue.current) }
    setStoreValue(refStoreValue.current)
  }
  /**子组件中有widget创建了 */
  function widgetCreate(p: TypeFocusStore.TypeWidgetParams) {
    if (!focusList.current.find(c => c === p.id)) {
      focusList.current.push(p.id)
    }
  }
  /**子组件中有widget销毁了 */
  function widgetDestroy(p: { id: string }) {
    const _index = focusList.current.findIndex(c => c === p.id)
    if (_index >= 0) focusList.current.splice(_index, 1)
  }
  /**子组件中有scroll创建或者销毁了 */
  function scrollEleChange(p: { id: string, list: string[], cacheFocusId?: string }, type: "create" | "destroy" = "create") {
    const _list = cloneDeep(scrollList.current)
    if (type === "create") {
      const _idx = _list.findIndex(c => c.id === p.id)
      if (_idx < 0) {
        _list.push(p)
      } else {
        _list[_idx] = p
      }
    } else {
      const _index = _list.findIndex(c => c.id === p.id)
      if (_index >= 0) _list.splice(_index, 1)
    }
    scrollList.current = _list
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
      setCurentId(focusId || focusList.current[0])
    }
  }, [focusList.current])
  useEffect(function () {
    /**按键按下 */
    function onKeyDown(e: KeyboardEvent) {
      const _keyValue = onKeyDownIntercept(e)
      if (!_keyValue) return
      //如果设置不监听按键，则不继续执行
      if (listenerKeydown === false) return
      const moveFn = switchFocus[_keyValue as keyof TypeswitchFocus]
      let _id = refStoreValue.current.id
      if ((moveFn instanceof Function) && refStoreValue.current.id) {
        const _nextItemId = moveFn(refStoreValue.current.id, focusList.current, scrollList.current)
        if (!_nextItemId) return
        const _catcheScrollId = isInScrollId(_nextItemId, scrollList.current)
        //如果当前聚焦元素也是scroll中的元素
        if (isInScrollId(refStoreValue.current.id, scrollList.current) === _catcheScrollId) {
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
  return (
    <EngineStore.Provider value={{ value: storeValue, focusList: focusList.current, widgetCreate, widgetDestroy, setCurentId, scrollEleChange }}>
      <div {...restProps} />
    </EngineStore.Provider>
  );
};
Engine.Item = EngineItem;


export const FocusEngine = Engine
export default Engine