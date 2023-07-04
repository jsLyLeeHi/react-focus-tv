import React, { useEffect, useRef, useState } from 'react'
import { TypeKeyCode, keyCode } from "../../key_iptv";
import { EngineStore } from "../../store/engine"
import { switchFocus } from './algorithm'
import { TypeswitchFocus, FocusEngineProps, FocusEngineItemProps, FocusEnginePopupProps, TypeScrollIdItem, TypeFocusItem, TypePopupItem } from '../type'
import { EngineItem } from "../engineItem"
import { EnginePopup } from "../enginePopup"
import onDialog, { TypeDialogParams } from "../../components/dialog"
import onToast from "../../components/toast"
import { cloneDeep, isNaN, throttle } from 'lodash'
import { isInViewport } from "./data"
import { config } from "../../path/config"
import onfire from '../../path/onfire';
export const onEventCenter = new onfire();


const Engine: React.FC<FocusEngineProps> & {
  Item: React.FC<FocusEngineItemProps>,
  Popup: React.FC<FocusEnginePopupProps>,
  changePopup: (id: string, visible: boolean) => void
  onRenderNode: (id: string, node: React.ReactNode) => void
  onDialog: (p: TypeDialogParams) => void
  onToast: (val: React.ReactNode, timer?: number) => void
} = (props) => {
  const engineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsViseble] = useState(false)

  const { listenerKeydown, engineType, onInput, onBack, onHome, onBackSpace, onDel, onMenu, onEnter, focusId, ...restProps } = props;
  const [storeFocusId, setStoreFocusId] = useState<string>("")
  const [storeKeyCode, setStoreKeyCode] = useState<{ value?: TypeKeyCode }>({})
  const refStoreValue = useRef<string>("")
  /**scroll元素id列表 */
  const [scrollList, setScrollList] = useState<TypeScrollIdItem[]>([])
  const refScrollList = useRef<TypeScrollIdItem[]>([])
  /**首次进入组件 */
  const firstIn = useRef<boolean>(true)
  /**首次进入组件 */
  const refIsKeydown = useRef<boolean | undefined>()
  /**焦点元素id列表 */
  const focusList = useRef<TypeFocusItem[]>([])
  /**弹窗的元素列表 */
  const [popupList, setPopupList] = useState<TypePopupItem[]>([])
  const [renderNodesList, setRenderNodes] = useState<{ id: string, node: React.ReactNode }[]>([])
  const popupListref = useRef<TypePopupItem[]>([])
  function setStore(defVal: string = refStoreValue.current) {
    if (!defVal) return
    if (!focusList.current.find(v => v.id === defVal)) {
      console.error(`setStore:未找到此元素id=${defVal}`)
      return
    }
    refStoreValue.current = defVal
    setStoreFocusId(defVal)
  }
  /**子组件中有popup创建了 */
  function popupCreate(p: TypePopupItem) {
    const _list = cloneDeep(popupListref.current)
    const _idx = _list.findIndex(c => c.id === p.id)
    if (_idx < 0) {
      _list.push(p)
    } else {
      _list[_idx] = p
    }
    popupListref.current = _list
    setPopupList(_list)
  }
  /**子组件中有popup销毁了 */
  function popupDestroy(p: TypePopupItem) {
    const _list = cloneDeep(popupListref.current)
    const _idx = _list.findIndex(c => c.id === p.id)
    if (_idx < 0) {
      _list.push(p)
    } else {
      _list[_idx] = p
    }
    popupListref.current = _list
    setPopupList(_list)
  }
  /**子组件中有widget创建了 */
  function widgetCreate(p: TypeFocusItem) {
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
  function scrollEleCreate(p: TypeScrollIdItem) {
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
    setStore(_id)
  }
  //监听focusId的修改
  useEffect(() => {
    if (!firstIn.current && focusId) {
      setCurentId(focusId)
    }
    firstIn.current = false
  }, [focusId])
  useEffect(() => {
    setIsViseble(isInViewport(engineRef.current))
    refIsKeydown.current = listenerKeydown
  }, [listenerKeydown])
  //初始化当前选中项
  useEffect(() => {
    if (!storeFocusId) {
      setCurentId(focusId || focusList.current[0]?.id)
    }
  }, [focusList.current])
  useEffect(() => {
    setIsViseble(isInViewport(engineRef.current))
  }, [props.children])
  /**按键按下 */
  function onKeyDown(ev: KeyboardEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    const _isViseble = isInViewport(engineRef.current)
    setIsViseble(_isViseble)
    //判断页面是否被隐藏，如果被隐藏，则不监听按键
    if (!_isViseble) return
    //如果设置不监听按键，则不继续执行
    if (refIsKeydown.current === false) return
    const _keyValue = keyCode[ev.keyCode]
    if (!_keyValue) return
    setStoreKeyCode({ value: _keyValue })
    //如果有弹窗处于显示状态，则不继续执行
    if (popupListref.current.find(v => v.isVisible === true)) return
    //焦点操作
    if (_keyValue === "RIGHT" || _keyValue === "LEFT" || _keyValue === "UP" || _keyValue === "DOWN") {
      const moveFn = switchFocus[_keyValue as keyof TypeswitchFocus]
      let _id = refStoreValue.current
      if ((moveFn instanceof Function) && refStoreValue.current) {
        const _nextItemId = moveFn(refStoreValue.current, focusList.current, refScrollList.current)
        if (!_nextItemId) return
        _id = _nextItemId
      }
      setStore(_id)
      return
    }
    setTimeout(() => {
      if (_keyValue === "HOME") return (onHome instanceof Function) && onHome()
      if (_keyValue === "BACKSPACE") return (onBackSpace instanceof Function) && onBackSpace()
      if (_keyValue === "DEL") return (onDel instanceof Function) && onDel()
      if (_keyValue === "MENU") return (onMenu instanceof Function) && onMenu()
      if (_keyValue === "ENTER") return (onEnter instanceof Function) && onEnter()
      if (_keyValue === "BACK") return (onBack instanceof Function) && onBack()
      if (!isNaN(_keyValue)) return (onInput instanceof Function) && onInput(_keyValue)
    });
  }
  function changePopup(pid: string, visible: boolean) {
    if (!popupListref.current.find(v => v.id === pid)) return
    popupCreate({
      id: pid,
      isVisible: visible
    })
  }
  function onChangeNode(id: string, node: React.ReactNode) {
    const _list = cloneDeep(renderNodesList)
    const _idx = _list.findIndex(c => c.id === id)
    if (_idx < 0) {
      _list.push({ id, node })
    } else {
      _list[_idx] = { id, node }
    }
    setRenderNodes(_list)
  }
  /**动态在底部插入元素 */
  Engine.onRenderNode = onChangeNode
  useEffect(function () {
    onEventCenter.on("enginePopup", changePopup)
    const onkey = throttle(onKeyDown, config.clickInterval)
    window.addEventListener("keydown", onkey)
    return () => {
      window.removeEventListener("keydown", onkey)
      onEventCenter.off("enginePopup", changePopup)
    }
  }, [])
  const paramsValue = {
    focusId: storeFocusId,
    keyCode: storeKeyCode,
    focusList: focusList.current,
    popupList: popupList,
    scrollList,
    isVisible,
    widgetCreate,
    widgetDestroy,
    popupCreate,
    popupDestroy,
    setCurentId,
    scrollEleCreate,
    scrollEleDestroy,
  }
  return (
    <EngineStore.Provider value={paramsValue}>
      <div {...restProps} ref={engineRef} style={props.hidden ? { display: "none" } : {}} />
      {renderNodesList.map((v, i) => <div key={"nodes-item" + v.id}>{v.node}</div>)}
    </EngineStore.Provider>
  );
};
Engine.Item = EngineItem;
Engine.Popup = EnginePopup;
Engine.changePopup = (id: string, visible: boolean) => onEventCenter.fire("enginePopup", id, visible)
Engine.onRenderNode = function () { }
Engine.onDialog = onDialog
Engine.onToast = onToast


export const FocusEngine = Engine
export default Engine