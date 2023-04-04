import { TypeScrollIdItem } from "../type"


/**获取元素是否在页面中 */
export function isInViewport(ele?: HTMLDivElement | null): boolean {
  if (!ele) return false
  const rect = ele.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
  return isVisible
}




/**查找元素是否在scroll的可视区域内 */
export function isVisualInScroll(idList: TypeScrollIdItem[], ele: HTMLElement) {
  let isVisual = true
  const childRect = ele.getBoundingClientRect();

  for (let i = 0; i < idList.length; i++) {
    const val = idList[i];
    const dom = document.getElementById(val.id) as HTMLElement
    if (dom.contains(ele)) {
      const containerRect = dom.getBoundingClientRect();
      // isInViewport 表示子元素是否在可视区域内
      isVisual = childRect.top >= containerRect.top &&
        (childRect.bottom - childRect.height) <= containerRect.bottom &&
        childRect.left >= containerRect.left &&
        (childRect.right - childRect.width) <= containerRect.right;
      if (!isVisual) {
        isVisual = false
        continue
      }
    }
  }
  return isVisual
}

/**查找是否在scroll组件中，如果在组件中，则使用scroll组件中的缓存id，没有则返回当前id */
export function isInScrollId(id: string, scrollList: TypeScrollIdItem[]) {
  let _returnId, item, idx
  for (let pidx = 0; pidx < scrollList.length; pidx++) {
    const pval = scrollList[pidx];
    for (let i = 0; i < pval.list.length; i++) {
      const v = pval.list[i];
      if (v.id === id) {
        _returnId = pval.cacheFocusId;
        item = pval
        idx = i
        continue;
      }
    }
    if (_returnId) continue;
  }
  return {
    id: _returnId,
    item,
    idx
  }
}
/**
 * 计算两个矩形元素之间x/y轴上的重叠部分。
 * @param element1 第一个元素。
 * @param element2 第二个元素。
 * @returns 在x或者y轴上是否有重叠部分 是true否false
 */
export function getOverlapArea(elementRet1: DOMRect, elementRet2: DOMRect, wheel: "x" | "y"): boolean {
  // console.log(elementRet1, elementRet2);
  if (wheel === "x") {
    if (((elementRet1.height + elementRet1.y) >= elementRet2.y && elementRet2.y >= elementRet1.y)) {
      return true
    }
    if (((elementRet2.height + elementRet2.y) >= elementRet1.y && elementRet1.y >= elementRet2.y)) {
      return true
    }
  }
  if (wheel === "y") {
    if (((elementRet1.width + elementRet1.x) >= elementRet2.x && elementRet2.x >= elementRet1.x)) {
      return true
    }
    if (((elementRet2.width + elementRet2.x) >= elementRet1.x && elementRet1.x >= elementRet2.x)) {
      return true
    }
  }
  return false
}