import { TypeFocusItem } from "../type"

export function getScrollNumber(params: {
  ele: HTMLElement,
  scrollOrientation: "x" | "y",
  offsetDistance: number | "center"
  parentRef: React.RefObject<HTMLDivElement>
}) {
  let scrollNumber = 0
  if (!params.ele) return scrollNumber
  //如果该元素没有在当前的scroll内，则不继续执行
  if (!params.parentRef.current?.contains(params.ele)) return scrollNumber
  if (params.scrollOrientation === "x") {
    try {
      const _parW = params.parentRef.current.getBoundingClientRect().width,
        _domW = params.ele.getBoundingClientRect().width,
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
      const _parH = params.parentRef.current.getBoundingClientRect().height,
        _domH = params.ele.getBoundingClientRect().height,
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

type ElementPosition = TypeFocusItem & {
  id: string;
  position: number[];
}

function getElementsPositions(parent: HTMLElement, childrenList: TypeFocusItem[], position: number[] = []): ElementPosition[] {
  const result: ElementPosition[] = [];
  if (!parent) return []
  // 遍历当前节点的所有子节点
  for (let i = 0; i < parent.children.length; i++) {
    const child = parent.children[i] as HTMLElement;
    // 如果当前子节点是我们要找的子节点之一，则记录下它在当前父节点中的位置
    const childId = child.id;
    const childIndex = childrenList.map(v => v.id).indexOf(childId);
    if (childIndex !== -1) {
      result.push({ position: [...position, childIndex], ...childrenList[i], });
    }
    // 如果当前子节点还有子节点，则递归遍历它的子节点
    if (child.children.length > 0) {
      const childPositions = getElementsPositions(child, childrenList, [
        ...position,
        i,
      ]);
      result.push(...childPositions);
    }
  }
  return result;
}

export function sortElements(parent: HTMLElement, childrenIds: TypeFocusItem[]): ElementPosition[] {
  // 获取所有子元素的位置信息
  const positions = getElementsPositions(parent, childrenIds);
  // 根据位置信息排序
  positions.sort((a, b) => {
    for (let i = 0; i < Math.min(a.position.length, b.position.length); i++) {
      if (a.position[i] !== b.position[i]) {
        return a.position[i] - b.position[i];
      }
    }
    return a.position.length - b.position.length;
  });
  return positions;
}

