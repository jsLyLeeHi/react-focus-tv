import { FocusEngine } from '@/components/focus-engine';
import React from 'react';
import "./index.less"

const _modalId = "dialog-popup-id"
export interface TypeDialogParams {
  title?: React.ReactNode,
  content: React.ReactNode,
  cancelText?: React.ReactNode,
  confimText?: React.ReactNode,
  hideCancelBtn?: boolean
}
export default function (params: TypeDialogParams) {
  const _btnsId = "dialog-popup-confirm-btn"
  return new Promise((resolve, reject) => {

    function onCancel() {
      FocusEngine.changePopup(_modalId, false)
      reject()
    }
    function onConfirm() {
      FocusEngine.changePopup(_modalId, false)
      resolve(true)
    }


    FocusEngine.onRenderNode(_modalId + "id", <FocusEngine.Popup popupId={_modalId} onClose={() => onCancel()}>
      <FocusEngine engineType="2" className="modal-dialog-page" focusId={_btnsId}>
        <div className='modal-tit' key={_modalId + "tit"}>{params.title || "温馨提示："}</div>
        <div className='modal-cont' key={_modalId + "cont"}>{params.content}</div>
        <div className='modal-btns-box' key={_modalId + "btns-box"}>
          {params.hideCancelBtn === true ? null : <FocusEngine.Item key={_modalId + "cancel-btn"} className='modal-btn' onEnter={() => onCancel()}>
            {params.cancelText || "取消"}
          </FocusEngine.Item>}
          <FocusEngine.Item key={_modalId + "confim-btn"} className='modal-btn' id={_btnsId} onEnter={() => onConfirm()}>
            {params.confimText || "确定"}
          </FocusEngine.Item>
        </div>
      </FocusEngine>
    </FocusEngine.Popup>)
    setTimeout(() => {
      FocusEngine.changePopup(_modalId, true)
    });
  })
}