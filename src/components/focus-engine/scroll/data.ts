const timer: { current?: number } = {}
/**
 * 滚动条移动到指定位置
 * @time 滚动的总时间
 * @num 滚动的距离
 */
export function scrollTo(num: number, parentRef: { current: HTMLDivElement | null }, time = 200) {
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