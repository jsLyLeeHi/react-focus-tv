import React, { ReactNode, useContext, useEffect, useRef } from 'react'
import { EngineStore } from "../store"
import "./index.less"


type FocusEngineItemProps = {
  children: ReactNode;
  /**滚动轴方向 */
  scrollOrientation: "x" | "y",
} & React.HTMLAttributes<HTMLDivElement>;

const Scroll: React.FC<FocusEngineItemProps> = (props) => {
  const { scrollOrientation, ...restProps } = props;
  const parentRef = useRef<HTMLDivElement>(null)
  const timer = useRef<number | undefined>()
  const EngineStoreCtx = useContext(EngineStore)
  function scrollTo(num: number, time = 200) {
    clearInterval(timer.current)
    timer.current = undefined
    if (!parentRef.current) return
    let _num = parentRef.current.scrollTop, interval = 10
    /**每次移动的距离 */
    const distance = (num - parentRef.current.scrollTop) / (time / interval)
    timer.current = setInterval(() => {
      if (!parentRef.current) return
      parentRef.current.scrollTop = _num
      _num = _num + distance
      if ((parentRef.current.scrollTop < num) && (_num >= num)) {
        clearInterval(timer.current)
        parentRef.current.scrollTop = num
      }
      if ((parentRef.current.scrollTop > num) && (_num <= num)) {
        clearInterval(timer.current)
        parentRef.current.scrollTop = num
      }
    }, interval)
  }
  useEffect(() => {
    if (!parentRef.current) return
    if (!EngineStoreCtx.value.id) return
    try {
      const targetEl = document.getElementById(`${EngineStoreCtx.value.id}`) as HTMLElement;
      if (!targetEl) return
      scrollTo(targetEl.offsetTop - parentRef.current.offsetTop - (parentRef.current.getBoundingClientRect().height / 2))
    } catch (error) {

    }
  }, [EngineStoreCtx.value.id])

  return <div ref={parentRef} {...restProps}
    className={`focus-engine-scroll ${scrollOrientation === "x" ? "focus-engine-scrollx" : "focus-engine-scrolly"} ${props.className || ""}`}></div>
}
export default Scroll