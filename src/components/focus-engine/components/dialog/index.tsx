import { FocusEngine } from '@/components/focus-engine';
import { getUUid } from '../../path/untils';
import "./index.less"

const _modalId = getUUid()
export default function onDialog() {
  return new Promise((resolve, reject) => {

    function onCancel() {
      FocusEngine.changePopup(_modalId, false)
      reject()
    }
    function onConfirm() {
      FocusEngine.changePopup(_modalId, false)
      resolve(true)
    }


    FocusEngine.onRenderNode(_modalId, <FocusEngine.Popup popupId={_modalId} onClose={() => onCancel()}>
      <FocusEngine engineType="2" className="modal-page">
        <FocusEngine.Item className='modal-btn' onEnter={() => onCancel()}>取消</FocusEngine.Item>
        <FocusEngine.Item className='modal-btn' onEnter={() => onConfirm()}>确定</FocusEngine.Item>
      </FocusEngine>
    </FocusEngine.Popup>)
    setTimeout(() => {
      FocusEngine.changePopup(_modalId, true)
    });
  })
}