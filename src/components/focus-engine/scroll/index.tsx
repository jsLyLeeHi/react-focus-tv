import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { getUUid } from '../path/untils';
import { EngineStore } from "../store"
import { scrollTo } from "./data"
import { TypeFocusItem } from "../engine/type"
import "./index.less"


type FocusEngineItemProps = {
  children: ReactNode;
  /**滚动轴方向 */
  scrollOrientation: "x" | "y",
  /**距离边缘的距离 */
  offsetDistance?: number | "center",
  /**是否缓存选中元素 */
  cacheFocus?: boolean
} & React.HTMLAttributes<HTMLDivElement>;

const Scroll: React.FC<FocusEngineItemProps> = (props) => {
  const widgetId = useRef(props.id || getUUid())
  const { scrollOrientation, cacheFocus, offsetDistance = "center", ...restProps } = props;
  const parentRef = useRef<HTMLDivElement>(null)
  const [cacheFocusId, setCacheFocusId] = useState<string>()
  const EngineStoreCtx = useContext(EngineStore)
  function findFocusList() {
    const _list: TypeFocusItem[] = EngineStoreCtx.focusList.filter(v => {
      if (!parentRef.current) return
      const ele = document.getElementById(v.id) as HTMLElement;
      return parentRef.current.contains(ele)
    })
    return _list
  }
  //如果有需要记住焦点的焦点元素，则上报给主组件
  useEffect(() => {
    const _foucsItemList = findFocusList()
    /**如果元素内部没有焦点元素，则不需要上报给主组件 */
    if (!_foucsItemList[0]) return
    if (!cacheFocusId) setCacheFocusId(_foucsItemList[0].id)
    EngineStoreCtx.scrollEleCreate({ id: widgetId.current, cacheFocusId: cacheFocusId, list: _foucsItemList })
    return () => {
      EngineStoreCtx.scrollEleDestroy({ id: widgetId.current })
    }
  }, [cacheFocusId, EngineStoreCtx.focusList])
  useEffect(() => {
    if (!parentRef.current) return
    if (!EngineStoreCtx.value.id) return
    const targetEl = document.getElementById(EngineStoreCtx.value.id) as HTMLElement;
    if (!targetEl) return
    //如果该元素没有在当前的scroll内，则不继续执行
    if (!parentRef.current.contains(targetEl)) return
    setCacheFocusId(EngineStoreCtx.value.id)
    if (scrollOrientation === "x") {
      try {
        const _parW = parentRef.current.getBoundingClientRect().width,
          _domW = targetEl.getBoundingClientRect().width,
          /**元素距离父元素顶部的距离 */
          _domScrollLeft = targetEl.offsetLeft - parentRef.current.offsetLeft;
        if (offsetDistance === "center") {
          scrollTo({
            num: _domScrollLeft - (_parW / 2 - _domW / 2),
            scrollOrientation,
            parentRef
          })
        } else {
          scrollTo({
            num: _domScrollLeft - offsetDistance,
            scrollOrientation,
            parentRef
          })
        }
      } catch (error) {

      }
    } else if (scrollOrientation === "y") {
      try {
        const _parH = parentRef.current.getBoundingClientRect().height,
          _domH = targetEl.getBoundingClientRect().height,
          /**元素距离父元素顶部的距离 */
          _domScrollTop = targetEl.offsetTop - parentRef.current.offsetTop;
        if (offsetDistance === "center") {
          scrollTo({
            num: _domScrollTop - (_parH / 2 - _domH / 2),
            scrollOrientation,
            parentRef
          })
        } else {
          scrollTo({
            num: _domScrollTop - offsetDistance,
            scrollOrientation,
            parentRef
          })
        }
      } catch (error) {

      }
    }
  }, [EngineStoreCtx.value.id])
  return <div ref={parentRef} {...restProps} id={widgetId.current}
    className={`focus-engine-scroll ${scrollOrientation === "x" ? "focus-engine-scrollx" : "focus-engine-scrolly"} ${props.className || ""}`}></div>
}
export default Scroll