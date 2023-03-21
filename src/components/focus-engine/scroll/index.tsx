import React, { ReactNode, useContext, useEffect, useRef } from 'react'
import { EngineStore } from "../store"
import { scrollTo } from "./data"
import "./index.less"


type FocusEngineItemProps = {
  children: ReactNode;
  /**滚动轴方向 */
  scrollOrientation: "x" | "y",
  /**距离边缘的距离 */
  offsetDistance?: number | "center"
} & React.HTMLAttributes<HTMLDivElement>;

const Scroll: React.FC<FocusEngineItemProps> = (props) => {
  const { scrollOrientation, offsetDistance = "center", ...restProps } = props;
  const parentRef = useRef<HTMLDivElement>(null)
  const EngineStoreCtx = useContext(EngineStore)
  useEffect(() => {
    if (!parentRef.current) return
    if (!EngineStoreCtx.value.id) return
    const targetEl = document.getElementById(`${EngineStoreCtx.value.id}`) as HTMLElement;
    //如果该元素没有在当前的scroll内，则不继续执行
    if (!parentRef.current.contains(targetEl)) return
    try {
      if (!targetEl) return
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
  return <div ref={parentRef} {...restProps}
    className={`focus-engine-scroll ${scrollOrientation === "x" ? "focus-engine-scrollx" : "focus-engine-scrolly"} ${props.className || ""}`}></div>
}
export default Scroll