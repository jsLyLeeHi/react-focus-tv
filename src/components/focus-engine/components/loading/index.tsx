import { FocusEngine } from '@/components/focus-engine';
import React from 'react';
import imageLoading from "@/assets/icons/loading.png";
import "./index.less"

const _modalId = "loading-popup-id"
export default function (val: React.ReactNode) {
  setTimeout(() => {
    FocusEngine.onRenderNode(_modalId, <FocusEngine.Popup popupId={_modalId}>
      <div className="loading">
        <img className='loading-image' src={imageLoading} />
        <div className="loading-title">{val || "加载中..."}</div>
      </div>
    </FocusEngine.Popup>)
    setTimeout(() => {
      FocusEngine.changePopup(_modalId, true)
    });
  });
  return {
    hideLoading() {
      FocusEngine.changePopup(_modalId, false)
    }
  }
}