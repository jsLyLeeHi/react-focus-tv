import React, { useEffect, useRef, useContext, useState } from 'react'
import { EngineStore } from "../../store/engine"
import { FocusEnginePopupProps } from "../type"
import "./index.less"


export const EnginePopup: React.FC<FocusEnginePopupProps> = (props) => {
  const { popupId, backClose, onClose, onEnter, ...restProps } = props
  const firstIn = useRef(true)
  const EngineStoreCtx = useContext(EngineStore)
  const [isShowView, setIsShowView] = useState(false)

  useEffect(() => {
    EngineStoreCtx.popupCreate({
      id: popupId,
      isVisible: false
    })
    return () => {
      EngineStoreCtx.popupDestroy({
        id: popupId,
        isVisible: false
      })
    }
  }, [])
  useEffect(() => {
    const isShow = EngineStoreCtx.popupList.find(v => v.isVisible && v.id === popupId)?.isVisible || false
    setIsShowView(isShow)
  }, [EngineStoreCtx.popupList])

  function onBack() {
    if (!backClose) return
    EngineStoreCtx.popupCreate({
      id: popupId,
      isVisible: false
    })
  }
  useEffect(() => {
    const _keyValue = EngineStoreCtx.keyCode.value
    if (_keyValue === "ENTER" && (onEnter instanceof Function)) onEnter()
    if ((_keyValue === "BACKSPACE" || _keyValue === "BACK") && !firstIn.current) {
      if (onClose instanceof Function) onClose()
      onBack()
    } else {
      firstIn.current = false
    }
  }, [EngineStoreCtx.keyCode])

  return <div {...restProps} className='engine-popup page-box'
    style={!isShowView ? { display: "none", ...(props.style || {}) } : (props.style || {})}></div>
}