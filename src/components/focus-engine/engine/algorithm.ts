import { TypeswitchFocus, TypeScrollIdList } from "./type"





export const switchFocus: TypeswitchFocus = {
  "RIGHT": function (id, _list, scrollList) {
    return getNearestElementId(id, _list, scrollList, "RIGHT")
  },
  "LEFT": function (id, _list, scrollList) {
    return getNearestElementId(id, _list, scrollList, "LEFT")
  },
  "UP": function (id, _list, scrollList) {
    return getNearestElementId(id, _list, scrollList, "UP")
  },
  "DOWN": function (id, _list, scrollList) {
    return getNearestElementId(id, _list, scrollList, "DOWN")
  },
}

type Direction = "RIGHT" | "LEFT" | "UP" | "DOWN";

/**
 * 获取距离当前元素指定方向最近的元素的id。
 * @param currentElementId 当前元素的id。
 * @param allElementsIdList 所有元素的id列表。
 * @param direction 要查找的方向，必须是 "RIGHT"、"LEFT"、"UP" 或 "DOWN" 中的一个。
 * @returns 距离当前元素指定方向最近的元素的id，如果找不到，则返回 null。
 */
function getNearestElementId(currentElementId: string, allElementsIdList: string[], scrollList: TypeScrollIdList, direction: Direction): string | null {
  // 获取当前元素的DOM元素节点和位置信息
  const currentElement = document.getElementById(currentElementId) as HTMLElement;
  const currentElementRect = currentElement.getBoundingClientRect();
  const currentElementCenter = {
    x: currentElementRect.left + currentElementRect.width / 2,
    y: currentElementRect.top + currentElementRect.height / 2,
  };

  const distanceList: { id: string, distance: number, isScrollVisual: boolean, isSameDirection: boolean, overlapArea: boolean, }[] = []
  // 遍历所有元素的id列表
  for (const id of allElementsIdList) {
    // 获取当前元素的DOM元素节点和位置信息
    const element = document.getElementById(id) as HTMLElement;
    const elementRect = element.getBoundingClientRect();
    const elementCenter = {
      x: elementRect.left + elementRect.width / 2,
      y: elementRect.top + elementRect.height / 2,
    };

    // 检查目标元素是否在指定方向上
    let isSameDirection = false;
    // 检查目标轴上有重叠部分的目标元素
    let overlapArea = false;
    // 检查元素是否在scroll中可视
    let isScrollVisual = isVisualInScroll(scrollList, element);

    switch (direction) {
      case "RIGHT":
        isSameDirection = elementCenter.x > currentElementCenter.x;
        overlapArea = getOverlapArea(currentElementRect, elementRect, "x")
        break;
      case "LEFT":
        isSameDirection = elementCenter.x < currentElementCenter.x;
        overlapArea = getOverlapArea(currentElementRect, elementRect, "x")
        break;
      case "UP":
        isSameDirection = elementCenter.y < currentElementCenter.y;
        overlapArea = getOverlapArea(currentElementRect, elementRect, "y")
        break;
      case "DOWN":
        isSameDirection = elementCenter.y > currentElementCenter.y;
        overlapArea = getOverlapArea(currentElementRect, elementRect, "y")
        break;
    }
    // 计算当前元素与每个元素之间的距离
    const distance = Math.sqrt(Math.pow(elementCenter.x - currentElementCenter.x, 2) + Math.pow(elementCenter.y - currentElementCenter.y, 2));
    distanceList.push({
      id,
      distance,
      isScrollVisual,
      isSameDirection,
      overlapArea
    })
  }
  //查找移动方向上的scroll可视区域内的元素
  const isScrollVisualList = distanceList.filter(v => v.isScrollVisual)
  //查找移动方向上的焦点元素
  const isSameDirectionList = isScrollVisualList.filter(v => v.isSameDirection && (v.id !== currentElementId))
  //查找出移动方向上与当前元素坐标方向上有面积重合的焦点元素
  const overlapAreaList = isSameDirectionList.filter(v => v.overlapArea)
  //优先使用面积重合的元素
  const _list = overlapAreaList.length > 0 ? overlapAreaList : isSameDirectionList

  // 初始化距离和最近元素的变量
  const minDistanceElement = _list.reduce((minElement, currentElement) => (currentElement.distance < minElement.distance ? currentElement : minElement), _list[0]);
  return minDistanceElement?.id;
}

/**查找元素是否在scroll的可是区域内 */
function isVisualInScroll(idList: TypeScrollIdList, ele: HTMLElement) {
  let isVisual = true
  for (let i = 0; i < idList.length; i++) {
    const val = idList[i];
    const dom = document.getElementById(val.id) as HTMLElement
    if (dom.contains(ele)) {
      const containerRect = dom.getBoundingClientRect();
      const childRect = ele.getBoundingClientRect();
      // isInViewport 表示子元素是否在可视区域内
      isVisual =
        childRect.top >= containerRect.top &&
        childRect.bottom <= containerRect.bottom &&
        childRect.left >= containerRect.left &&
        childRect.right <= containerRect.right;
      if (!isVisual) {
        isVisual = false
        continue
      }
    }
  }
  return isVisual
}

/**查找是否在scroll组件中，如果在组件中，则使用scroll组件中的缓存id，没有则返回当前id */
export function isInScrollId(id: string, scrollList: TypeScrollIdList) {
  let _returnId
  for (let pidx = 0; pidx < scrollList.length; pidx++) {
    const pval = scrollList[pidx];
    let _isInThisScroll = false
    for (let i = 0; i < pval.list.length; i++) {
      const v = pval.list[i];
      if (v === id) {
        _returnId = pval.cacheFocusId;
        _isInThisScroll = true
        continue;
      }
    }
    if (_isInThisScroll) continue;
  }
  return _returnId
}
/**
 * 计算两个矩形元素之间x/y轴上的重叠部分。
 * @param element1 第一个元素。
 * @param element2 第二个元素。
 * @returns 在x或者y轴上是否有重叠部分 是true否false
 */
function getOverlapArea(elementRet1: DOMRect, elementRet2: DOMRect, wheel: "x" | "y"): boolean {
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