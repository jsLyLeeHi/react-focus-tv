import { FocusEngine } from '@/components/focus-engine';
import React from 'react';
import "./index.less"

const _modalId = "dialog-popup-id"
export interface TypeDialogParams {
  title?: React.ReactNode,
  content: React.ReactNode,
  cancelText?: React.ReactNode,
  confimText?: React.ReactNode,
  hideCancelBtn?: boolean,
  focusBtn?: "calcel" | "confim"
}
export default function (params: TypeDialogParams) {
  return new Promise((resolve, reject) => {
    const _btnsId = {
      calcel: "dialog-popup-calcel-btn",
      confim: "dialog-popup-confirm-btn"
    }

    function onCancel() {
      FocusEngine.changePopup(_modalId, false)
      reject()
    }
    function onConfirm() {
      FocusEngine.changePopup(_modalId, false)
      resolve(true)
    }

    function Content(props: { onCancel: () => void, onConfirm: () => void } & TypeDialogParams) {
      return <FocusEngine.Popup popupId={_modalId} onClose={() => props.onCancel()}>
        <FocusEngine engineType="2" className="modal-dialog-page" focusId={props.focusBtn}>
          <div className='modal-tit' key={_modalId + "tit"}>{props.title || "温馨提示："}</div>
          <div className='modal-cont' key={_modalId + "cont"}>{props.content}</div>
          <div className='modal-btns-box' key={_modalId + "btns-box"}>
            {props.hideCancelBtn === true ? null :
              <FocusEngine.Item key={_modalId + "cancel-btn"} id={_btnsId.calcel} className='modal-btn' onEnter={() => props.onCancel()}>
                {props.cancelText || "取消"}
              </FocusEngine.Item>}
            <FocusEngine.Item key={_modalId + "confim-btn"} className='modal-btn' id={_btnsId.confim} onEnter={() => props.onConfirm()}>
              {props.confimText || "确定"}
            </FocusEngine.Item>
          </div>
        </FocusEngine>
      </FocusEngine.Popup>
    }
    const _id = _btnsId[params.focusBtn || "confim"]
    setTimeout(() => {
      FocusEngine.onRenderNode(_modalId + "id", <Content {...params} onCancel={onCancel} onConfirm={onConfirm} focusBtn={_id as "calcel" | "confim"}></Content>)
      setTimeout(() => {
        FocusEngine.changePopup(_modalId, true)
      }); 
    });
  })
}