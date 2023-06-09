import { contains, getBoundingClientRect } from "../../path/untils"
export function getScrollNumber(params: {
  ele: HTMLElement,
  scrollOrientation: "x" | "y",
  offsetDistance: number | "center"
  parentRef: React.RefObject<HTMLDivElement>
}) {
  let scrollNumber = 0
  if (!params.ele) return scrollNumber
  //如果该元素没有在当前的scroll内，则不继续执行
  if (!(params.parentRef.current && contains(params.parentRef.current, params.ele))) return scrollNumber
  if (params.scrollOrientation === "x") {
    try {
      const _parW = getBoundingClientRect(params.parentRef.current).width,
        _domW = getBoundingClientRect(params.ele).width,
        /**元素距离父元素顶部的距离 */
        _domScrollLeft = params.ele.offsetLeft - params.parentRef.current.offsetLeft;
      if (params.offsetDistance === "center") {
        scrollNumber = _domScrollLeft - (_parW / 2 - _domW / 2)
      } else {
        scrollNumber = _domScrollLeft - params.offsetDistance
      }
    } catch (error) {

    }
  } else if (params.scrollOrientation === "y") {
    try {
      const _parH = getBoundingClientRect(params.parentRef.current).height,
        _domH = getBoundingClientRect(params.ele).height,
        /**元素距离父元素顶部的距离 */
        _domScrollTop = params.ele.offsetTop - params.parentRef.current.offsetTop;
      if (params.offsetDistance === "center") {
        scrollNumber = _domScrollTop - (_parH / 2 - _domH / 2)
      } else {
        scrollNumber = _domScrollTop - params.offsetDistance
      }
    } catch (error) {

    }
  }
  return scrollNumber
}