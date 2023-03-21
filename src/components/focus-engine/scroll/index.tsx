import React, { ReactNode, useContext, useEffect, useRef } from 'react'
import { getUUid } from '../path/untils';
import { EngineStore } from "../store"
import { scrollTo } from "./data"
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
  const cacheFocusId = useRef<string>()
  const EngineStoreCtx = useContext(EngineStore)
  function findFocusList() {
    const _list: string[] = EngineStoreCtx.focusList.filter(v => {
      if (!parentRef.current) return
      const ele = document.getElementById(v) as HTMLElement;
      return parentRef.current.contains(ele)
    })
    return _list
  }
  //如果有需要记住焦点的焦点元素，则上报给主组件
  useEffect(() => {
    if (!cacheFocusId.current || !cacheFocus) return
    const _foucsItemList = findFocusList()
    EngineStoreCtx.scrollEleChange({ id: widgetId.current, cacheFocusId: cacheFocusId.current, list: _foucsItemList })
    return () => {
      if (!cacheFocusId.current || !cacheFocus) return
      EngineStoreCtx.scrollEleChange({ id: widgetId.current, cacheFocusId: cacheFocusId.current, list: _foucsItemList }, "destroy")
    }
  }, [cacheFocusId.current])
  useEffect(() => {
    if (!parentRef.current) return
    if (!EngineStoreCtx.value.id) return
    const targetEl = document.getElementById(EngineStoreCtx.value.id) as HTMLElement;
    if (!targetEl) return
    //如果该元素没有在当前的scroll内，则不继续执行
    if (!parentRef.current.contains(targetEl)) return
    cacheFocusId.current = EngineStoreCtx.value.id
    try {
      const _parH = parentRef.current.getBoundingClientRect().height,
        _domH = targetEl.getBoundingClientRect().height,
        /**元素距离父元素顶部的距离 */
        _domScrollTop = targetEl.offsetTop - parentRef.current.offsetTop;
      if (offsetDistance === "center") {
        scrollTo(_domScrollTop - (_parH / 2 - _domH / 2), parentRef)
      } else {
        scrollTo(_domScrollTop - offsetDistance, parentRef)
      }
    } catch (error) {

    }
  }, [EngineStoreCtx.value.id])
  return <div ref={parentRef} {...restProps} id={widgetId.current}
    className={`focus-engine-scroll ${scrollOrientation === "x" ? "focus-engine-scrollx" : "focus-engine-scrolly"} ${props.className || ""}`}></div>
}
export default Scroll