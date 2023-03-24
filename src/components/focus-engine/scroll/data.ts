import { config } from "../path/config"
const timer: { current?: number } = {}
interface TypeScrollToParams {
  num: number,
  scrollOrientation: "x" | "y"
  parentRef: { current: HTMLDivElement | null }
}
/**
 * 滚动条移动到指定位置
 * @time 滚动的总时间
 * @num 滚动的距离
 */
export function scrollTo(params: TypeScrollToParams) {
  clearInterval(timer.current)
  timer.current = undefined
  if (!params.parentRef.current) return
  const { scrollOrientation } = params
  let _num = scrollOrientation === "x" ? params.parentRef.current.scrollLeft : params.parentRef.current.scrollTop, interval = 10
  /**每次移动的距离 */
  const distance = (params.num - (scrollOrientation === "x" ? params.parentRef.current.scrollLeft : params.parentRef.current.scrollTop)) / (config.clickInterval / interval)
  timer.current = setInterval(() => {
    if (!params.parentRef.current) return
    if (scrollOrientation === "x") {
      params.parentRef.current.scrollLeft = _num
    } else {
      params.parentRef.current.scrollTop = _num
    }
    _num = _num + distance
    if (((distance > 0) && (_num >= params.num)) || ((distance < 0) && (_num <= params.num))) {
      clearInterval(timer.current)
      if (scrollOrientation === "x") {
        params.parentRef.current.scrollLeft = params.num
      } else {
        params.parentRef.current.scrollTop = params.num
      }
    }
  }, interval)
}


export function scrollToByEle(params: {
  ele: HTMLElement,
  scrollOrientation: "x" | "y",
  offsetDistance: number | "center"
  parentRef: React.RefObject<HTMLDivElement>
}) {
  if (!params.ele) return
  //如果该元素没有在当前的scroll内，则不继续执行
  if (!params.parentRef.current?.contains(params.ele)) return
  if (params.scrollOrientation === "x") {
    try {
      const _parW = params.parentRef.current.getBoundingClientRect().width,
        _domW = params.ele.getBoundingClientRect().width,
        /**元素距离父元素顶部的距离 */
        _domScrollLeft = params.ele.offsetLeft - params.parentRef.current.offsetLeft;
      if (params.offsetDistance === "center") {
        scrollTo({
          num: _domScrollLeft - (_parW / 2 - _domW / 2),
          scrollOrientation: params.scrollOrientation,
          parentRef:params.parentRef
        })
      } else {
        scrollTo({
          num: _domScrollLeft - params.offsetDistance,
          scrollOrientation: params.scrollOrientation,
          parentRef:params.parentRef
        })
      }
    } catch (error) {

    }
  } else if (params.scrollOrientation === "y") {
    try {
      const _parH = params.parentRef.current.getBoundingClientRect().height,
        _domH = params.ele.getBoundingClientRect().height,
        /**元素距离父元素顶部的距离 */
        _domScrollTop = params.ele.offsetTop - params.parentRef.current.offsetTop;
      if (params.offsetDistance === "center") {
        scrollTo({
          num: _domScrollTop - (_parH / 2 - _domH / 2),
          scrollOrientation: params.scrollOrientation,
          parentRef:params.parentRef
        })
      } else {
        scrollTo({
          num: _domScrollTop - params.offsetDistance,
          scrollOrientation: params.scrollOrientation,
          parentRef:params.parentRef
        })
      }
    } catch (error) {

    }
  }
}