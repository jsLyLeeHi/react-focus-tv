import React, { useEffect, useRef, useContext } from 'react'
import { getUUid } from '../../path/untils'
import { TypeKeyCode } from "../../key_iptv";
import { EngineStore } from "../../store/engine"
import { FocusEngineItemProps } from "../type"
import { isNaN } from 'lodash';
import "./index.less"


export const EngineItem: React.FC<FocusEngineItemProps> = (props) => {
  const { renderProps, onInput, onDel, onEnter, rightGo = [], leftGo = [], upGo = [], downGo = [], ...restProps } = props
  const widgetId = useRef(props.id || getUUid())
  const isVisible = useRef(false)
  const EngineStoreCtx = useContext(EngineStore)
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
    //如果当前焦点不在该焦点元素上，则不继续执行
    if (EngineStoreCtx.focusId !== widgetId.current) return
    if (EngineStoreCtx.keyCode.value === "DEL") {
      (onDel instanceof Function) && onDel()
      return
    }
    if (EngineStoreCtx.keyCode.value === "ENTER") {
      (onEnter instanceof Function) && onEnter()
      return
    }
    if (!isNaN(EngineStoreCtx.keyCode.value)) {
      (onInput instanceof Function) && onInput(EngineStoreCtx.keyCode.value as TypeKeyCode)
      return
    }
  }, [EngineStoreCtx.keyCode])
  useEffect(() => {
    if ((props.onFocus instanceof Function) && (EngineStoreCtx.focusId === widgetId.current)) {
      const _ev: any = true
      props.onFocus(_ev)
    }
  }, [EngineStoreCtx.focusId])
  function getClassName(_focus: boolean, _isselected: boolean, c?: string) {
    let _class = _focus ? "widget-focus" : "widget-unfocus"
    _class = `${_class} ${_isselected ? "widget-selected" : "widget-unselected"}`
    if (!c) return _class
    _class = c + " " + _class
    return _class + " focus-item"
  }
  const _isfocus = EngineStoreCtx.focusId === widgetId.current
  const _isselected = !!EngineStoreCtx.scrollList.find(v => v.cacheFocusId === widgetId.current)
  return <div {...restProps} id={widgetId.current}
    className={getClassName(_isfocus, _isselected, props.className)}
    children={(renderProps instanceof Function) ? renderProps({
      isFocus: _isfocus,
      isSelected: _isselected,
      id: widgetId.current,
    }) : props.children}></div>
}