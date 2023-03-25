import React, { ReactNode, useState } from 'react'
import "./index.less"


type TypePopupProps = {
  boxProps?: React.HTMLAttributes<HTMLDivElement>,
};

function usePopup(params?: TypePopupProps) {
  const [showPopup, setShowPopup] = useState(false)
  const [children, setPopupChildren] = useState<ReactNode>()
  return {
    showPopup,
    setShowPopup,
    setPopupChildren,
    renderPopup: showPopup ? <div {...(params?.boxProps || {})} className="focus-popup">{children}</div> : null
  }
}
export default usePopup