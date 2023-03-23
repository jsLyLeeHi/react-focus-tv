import React, { useEffect, useRef, useContext } from 'react'
import { getUUid } from '../path/untils'
import { EngineStore } from "../store"
import { keyByIptv } from "../key_iptv";
import { FocusEngineItemProps } from "./type"
import "./index.less"


export const EngineItem: React.FC<FocusEngineItemProps> = (props) => {
  const { renderProps, onInput, rightGo = [], ...restProps } = props
  const widgetId = useRef(props.id || getUUid())
  const EngineStoreCtx = useContext(EngineStore)
  useEffect(() => {
    EngineStoreCtx.widgetCreate({
      id: widgetId.current,
      rightGo,
    })
    return () => {
      EngineStoreCtx.widgetDestroy({ id: widgetId.current })
    }
  }, [])
  useEffect(() => {
    if ((props.onFocus instanceof Function) && (EngineStoreCtx.value.id === widgetId.current)) {
      const _ev: any = true
      props.onFocus(_ev)
    }
    function onItemKeyDown(ev: any) {
      if (EngineStoreCtx.value.id !== widgetId.current) return
      ev.preventDefault();
      ev.stopPropagation();
      const _keyValue = keyByIptv[ev.keyCode]
      if (!_keyValue) return
      if ((props.onClick instanceof Function) && _keyValue === "ENTER") {
        props.onClick(ev)
      }
      if ((onInput instanceof Function) && _keyValue !== "ENTER") {
        onInput(_keyValue)
      }
    }
    window.addEventListener("keydown", onItemKeyDown)
    return () => {
      window.removeEventListener("keydown", onItemKeyDown)
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