import React, { useEffect, useRef, useState } from 'react'
import { onEventKeyDown } from '../path/untils'
import { EngineStore, defStoreData } from "../store"
import { TypeFocusStore } from "../store/index.d"
import { switchFocus } from './algorithm'
import { TypeswitchFocus, FocusEngineProps, FocusEngineItemProps } from './type'
import { EngineItem } from "./Item"


const Engine: React.FC<FocusEngineProps> & { Item: React.FC<FocusEngineItemProps> } = (props) => {
  const { listenerKeydown, focusId, ...restProps } = props;
  const [storeValue, setStoreValue] = useState<TypeFocusStore.TypeDefStoreData>(defStoreData)
  const refStoreValue = useRef<TypeFocusStore.TypeDefStoreData>(defStoreData)
  /**首次进入组件 */
  const firstIn = useRef<boolean>(true)
  /**焦点元素id列表 */
  const focusList = useRef<string[]>([])
  /**scroll元素id列表 */
  const scrollList = useRef<{ id: string, cacheFocusId: string, list: string[] }[]>([])
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
  function scrollEleChange(p: { id: string, cacheFocusId: string, list: string[] }, type: "create" | "destroy" = "create") {
    if (type === "create") {
      if (!scrollList.current.find(c => c.id === p.id)) {
        scrollList.current.push(p)
      }
    } else {
      const _index = scrollList.current.findIndex(c => c.id === p.id)
      if (_index >= 0) scrollList.current.splice(_index, 1)
    }
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
  /**查找是否在scroll组件中，如果在组件中，则使用scroll组件中的缓存id，没有则返回当前id */
  function isInScrollId(id: string) {
    let _returnId
    for (let pidx = 0; pidx < scrollList.current.length; pidx++) {
      const pval = scrollList.current[pidx];
      let _isInThisScroll = false
      for (let i = 0; i < pval.list.length; i++) {
        const v = pval.list[i];
        if (v === id) {
          _returnId = pval.cacheFocusId;
          _isInThisScroll = true
          continue;
        }
      }
      if (_isInThisScroll) continue;
    }
    return _returnId
  }
  useEffect(function () {
    onEventKeyDown(function (ev) {
      if (listenerKeydown === false) return
      const moveFn = switchFocus[ev as keyof TypeswitchFocus]
      let _id = refStoreValue.current.id
      if ((moveFn instanceof Function) && refStoreValue.current.id) {
        const _nextItemId = moveFn(refStoreValue.current.id, focusList.current)
        if (!_nextItemId) return
        const _catcheScrollId = isInScrollId(_nextItemId)
        //如果当前聚焦元素也是scroll中的元素
        if (isInScrollId(refStoreValue.current.id) === _catcheScrollId) {
          _id = _nextItemId
        } else {
          _id = _catcheScrollId ?? _nextItemId
        }
      }
      setStore({
        ...refStoreValue.current,
        keyCode: ev,
        id: _id
      })
    })
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