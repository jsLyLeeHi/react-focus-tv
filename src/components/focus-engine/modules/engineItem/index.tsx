import React, { useEffect, useRef, useContext } from 'react'
import { getUUid, onKeyDownIntercept } from '../../path/untils'
import { EngineStore } from "../../store/engine"
import { FocusEngineItemProps } from "../type"
import { isNaN, throttle } from 'lodash';
import { config } from "../../path/config"
import "./index.less"


export const EngineItem: React.FC<FocusEngineItemProps> = (props) => {
  const { renderProps, onInput, onDel, onEnter, rightGo = [], leftGo = [], upGo = [], downGo = [], ...restProps } = props
  const widgetId = useRef(props.id || getUUid())
  const isVisible = useRef(false)
  const EngineStoreCtx = useContext(EngineStore)

  /**为了keydown事件顺利接受参数 */
  const refIsKeydown = useRef<boolean | undefined>()
  useEffect(() => {
    EngineStoreCtx.widgetCreate({
      id: widgetId.current,
      rightGo,
      leftGo,
      upGo,
      downGo,
    })
    return () => {
      EngineStoreCtx.widgetDestroy({ id: widgetId.current })
    }
  }, [])
  useEffect(() => {
    isVisible.current = EngineStoreCtx.isVisible
  }, [EngineStoreCtx.isVisible])
  useEffect(() => {
    refIsKeydown.current = EngineStoreCtx.listenerKeydown
  }, [EngineStoreCtx.listenerKeydown])
  function onKeyDown(ev: any) {
    //判断页面是否被隐藏，如果被隐藏，则不监听按键
    if (!isVisible.current) return
    //如果设置不监听按键，则不继续执行
    if (refIsKeydown.current === false) return
    //如果当前焦点不在该焦点元素上，则不继续执行
    if (EngineStoreCtx.value.id !== widgetId.current) return
    const _keyValue = onKeyDownIntercept(ev)
    if (!_keyValue) return
    if (_keyValue === "DEL") return (onDel instanceof Function) && onDel()
    if (_keyValue === "ENTER") return (onEnter instanceof Function) && onEnter()
    if (!isNaN(_keyValue)) return (onInput instanceof Function) && onInput(_keyValue)
  }
  useEffect(() => {
    const onkey = throttle(onKeyDown, config.clickInterval)
    window.addEventListener("keydown", onkey)
    
    if ((props.onFocus instanceof Function) && (EngineStoreCtx.value.id === widgetId.current)) {
      const _ev: any = true
      props.onFocus(_ev)
    }
    return () => {
      window.removeEventListener("keydown", onkey)
    }
  }, [EngineStoreCtx.value.id])
  function getClassName(_focus: boolean, _isselected: boolean, c?: string) {
    let _class = _focus ? "widget-focus" : "widget-unfocus"
    _class = `${_class} ${_isselected ? "widget-selected" : "widget-unselected"}`
    if (!c) return _class
    _class = c + " " + _class
    return _class + " focus-item"
  }
  const _isfocus = EngineStoreCtx.value.id === widgetId.current
  const _isselected = !!EngineStoreCtx.scrollList.find(v => v.cacheFocusId === widgetId.current)
  return <div {...restProps} id={widgetId.current}
    className={getClassName(_isfocus, _isselected, props.className)}
    children={(renderProps instanceof Function) ? renderProps({
      isFocus: _isfocus,
      isSelected: _isselected,
      id: widgetId.current,
    }) : props.children}></div>
}