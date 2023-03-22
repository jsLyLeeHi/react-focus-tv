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
export function scrollTo(params: TypeScrollToParams, time = 200) {
  clearInterval(timer.current)
  timer.current = undefined
  if (!params.parentRef.current) return
  const { scrollOrientation } = params
  let _num = scrollOrientation === "x" ? params.parentRef.current.scrollLeft : params.parentRef.current.scrollTop, interval = 10
  /**每次移动的距离 */
  const distance = (params.num - (scrollOrientation === "x" ? params.parentRef.current.scrollLeft : params.parentRef.current.scrollTop)) / (time / interval)
  timer.current = setInterval(() => {
    if (!params.parentRef.current) return
    if (scrollOrientation === "x") {
      params.parentRef.current.scrollLeft = _num
    } else {
      params.parentRef.current.scrollTop = _num
    }
    _num = _num + distance
    const _start = scrollOrientation === "x" ? params.parentRef.current.scrollLeft : params.parentRef.current.scrollTop
    if (((_start < params.num) && (_num >= params.num)) || ((_start > params.num) && (_num <= params.num))) {
      clearInterval(timer.current)
      if (scrollOrientation === "x") {
        params.parentRef.current.scrollLeft = params.num
      } else {
        params.parentRef.current.scrollTop = params.num
      }
    }
  }, interval)
}