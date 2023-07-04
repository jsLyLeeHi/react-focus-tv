import { FocusEngine } from '@/components/focus-engine';
import React from 'react';
import "./index.less"

const _modalId = "toast-popup-id"
export default function (val: React.ReactNode, timer = 2000) {
  return new Promise((resolve, _) => {

    setTimeout(() => {
      console.log("onRenderNode");

      FocusEngine.onRenderNode(_modalId, null)
      resolve(true)
    }, timer);

    FocusEngine.onRenderNode(_modalId, <div className="toast-page items-page">
      <div className="toast-value">{val}</div>
    </div>)
  })
}