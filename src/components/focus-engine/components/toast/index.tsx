import { FocusEngine } from '@/components/focus-engine';
import React from 'react';
import "./index.less"

const _modalId = "toast-popup-id"
const timerinfo: { current: any } = { current: null }
export default function (val: React.ReactNode, timer = 2000) {
  clearTimeout(timerinfo.current)
  return new Promise((resolve, _) => {
    timerinfo.current = setTimeout(() => {
      clearTimeout(timerinfo.current)
      FocusEngine.changePopup(_modalId, false)
      resolve(true)
    }, timer);

    setTimeout(() => {
      FocusEngine.onRenderNode(_modalId, <FocusEngine.Popup style={{ backgroundColor: "rgba(0,0,0,0)" }} popupId={_modalId} className="toast-page">
        <div className="toast-value">{val}</div>
      </FocusEngine.Popup>)
      setTimeout(() => {
        FocusEngine.changePopup(_modalId, true)
      });
    });
  })
}