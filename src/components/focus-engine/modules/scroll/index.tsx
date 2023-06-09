import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { getUUid, contains } from '../../path/untils';
import { EngineStore } from "../../store/engine"
import { getScrollNumber } from "./data"
import { config } from "../../path/config"
import { TypeFocusItem } from "../type"
import "./index.less"


type TypeScrollProps = {
  children: ReactNode;
  /**滚动轴方向 */
  scrollOrientation: "x" | "y",
  /**距离边缘的距离 */
  offsetDistance?: number | "center",
  /**焦点方向在scroll方向上时，是否能聚焦到别的列表的配置 @default true */
  scrollOut?: boolean,
  /**缓存的焦点元素id */
  selectId?: string
} & React.HTMLAttributes<HTMLDivElement>;

const Scroll: React.FC<TypeScrollProps> = (props) => {
  const widgetId = useRef(props.id || getUUid())
  const { scrollOrientation, selectId, scrollOut, offsetDistance = "center", ...restProps } = props;
  const parentRef = useRef<HTMLDivElement>(null)
  const [cacheFocusId, setCacheFocusId] = useState<string | undefined>()
  const EngineStoreCtx = useContext(EngineStore)
  /**动画时间缓存 */
  const animationTimer = useRef<number>()
  const scrollNum = useRef<number>(0)
  /**
   * 滚动条移动到指定位置
   * @time 滚动的总时间
   * @num 滚动的距离
   */
  function scrollAnimiteTo(num: number) {
    scrollNum.current = num
    clearInterval(animationTimer.current)
    animationTimer.current = undefined
    if (!parentRef.current) return
    let _num = scrollOrientation === "x" ? parentRef.current.scrollLeft : parentRef.current.scrollTop, interval = 2
    /**每次移动的距离 */
    const distance = (num - (scrollOrientation === "x" ? parentRef.current.scrollLeft : parentRef.current.scrollTop)) / (config.clickInterval / interval)
    animationTimer.current = setInterval(() => {
      if (!parentRef.current) return
      if (scrollOrientation === "x") {
        parentRef.current.scrollLeft = _num
      } else {
        parentRef.current.scrollTop = _num
      }
      _num = _num + distance
      if (((distance > 0) && (_num >= num)) || ((distance < 0) && (_num <= num))) {
        clearInterval(animationTimer.current)
        if (scrollOrientation === "x") {
          parentRef.current.scrollLeft = num
        } else {
          parentRef.current.scrollTop = num
        }
      }
    }, interval)
  }
  function findFocusList() {
    const _list: TypeFocusItem[] = EngineStoreCtx.focusList.filter(v => {
      if (!parentRef.current) return
      const ele = document.getElementById(v.id) as HTMLElement;
      return contains(parentRef.current, ele)
    })
    return _list
  }
  //监听页面显示事件，重置当前scrollnum为页面隐藏之间的scrollnum
  useEffect(() => {
    if (!EngineStoreCtx.isVisible) return
    if (!parentRef.current) return
    if (scrollOrientation === "y" && scrollNum.current !== parentRef.current.scrollTop) {
      parentRef.current.scrollTop = scrollNum.current
    } else if (scrollOrientation === "x" && scrollNum.current !== parentRef.current.scrollLeft) {
      parentRef.current.scrollLeft = scrollNum.current
    }
  }, [EngineStoreCtx.isVisible])
  useEffect(() => {
    if (cacheFocusId && selectId !== cacheFocusId) setCacheFocusId(selectId)
    if (!parentRef.current) return
    if (!selectId) return
    const targetEl = document.getElementById(selectId) as HTMLElement;
    if (!targetEl) return
    //如果该元素没有在当前的scroll内，则不继续执行
    if (!contains(parentRef.current, targetEl)) return
    const scrollNumber = getScrollNumber({ ele: targetEl, scrollOrientation, offsetDistance, parentRef })
    if (scrollOrientation === "y") {
      parentRef.current.scrollTop = scrollNumber
    } else if (scrollOrientation === "x") {
      parentRef.current.scrollLeft = scrollNumber
    }
    scrollNum.current = scrollNumber
  }, [selectId])
  //如果有需要记住焦点的焦点元素，则上报给主组件
  useEffect(() => {
    const _foucsItemList = findFocusList()
    /**如果元素内部没有焦点元素，则不需要上报给主组件 */
    if (!_foucsItemList[0]) return
    if (!cacheFocusId) setCacheFocusId(_foucsItemList[0].id)
    EngineStoreCtx.scrollEleCreate({
      id: widgetId.current,
      scrollOrientation,
      scrollOut,
      cacheFocusId: cacheFocusId,
      list: _foucsItemList
    })
    return () => {
      EngineStoreCtx.scrollEleDestroy({ id: widgetId.current })
    }
  }, [cacheFocusId, EngineStoreCtx.focusList])
  useEffect(() => {
    if (!EngineStoreCtx.isVisible) return
    if (!parentRef.current) return
    if (!EngineStoreCtx.focusId) return
    const targetEl = document.getElementById(EngineStoreCtx.focusId) as HTMLElement;
    if (!targetEl) return
    //如果该元素没有在当前的scroll内，则不继续执行
    if (!contains(parentRef.current, targetEl)) return
    setCacheFocusId(EngineStoreCtx.focusId)
    const scrollNumber = getScrollNumber({ ele: targetEl, scrollOrientation, offsetDistance, parentRef })
    scrollAnimiteTo(scrollNumber)
  }, [EngineStoreCtx.focusId])
  return <div ref={parentRef} {...restProps} id={widgetId.current}
    className={`focus-engine-scroll ${scrollOrientation === "x" ? "focus-engine-scrollx" : "focus-engine-scrolly"} ${props.className || ""}`}></div>
}
export default Scroll