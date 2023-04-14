import { TypeswitchFocus, TypeScrollIdItem, TypeFocusItem } from "../type"
import { isInScrollId, getOverlapArea, isVisualInScroll } from "./data"
import { contains, getBoundingClientRect } from "../../path/untils"





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
interface TypeDistanceItem {
  id: string,
  distance: number,
  isScrollVisual: boolean,
  isCanScrollOut: boolean,
  isgoto: boolean,
  isSameDirection: boolean,
  overlapArea: boolean,
}

/**
 * 获取距离当前元素指定方向最近的元素的id。
 * @param currentElementId 当前元素的id。
 * @param allElementsIdList 所有元素的id列表。
 * @param direction 要查找的方向，必须是 "RIGHT"、"LEFT"、"UP" 或 "DOWN" 中的一个。
 * @returns 距离当前元素指定方向最近的元素的id，如果找不到，则返回 null。
 */
function getNearestElementId(currentElementId: string, allElementsIdList: TypeFocusItem[], scrollList: TypeScrollIdItem[], direction: Direction): string | null {
  try {
    const scrollInfo = isInScrollId(currentElementId, scrollList)
    // 获取当前元素的DOM元素节点和位置信息
    const currentElement = document.getElementById(currentElementId) as HTMLElement;
    const currentElementRect = getBoundingClientRect(currentElement);
    const currentElementScroll = document.getElementById(scrollInfo.item?.id || "")
    const currentEleIsInScroll = currentElementScroll && contains(currentElementScroll, currentElement)
    const currentElementCenter = {
      x: currentElementRect.left + currentElementRect.width / 2,
      y: currentElementRect.top + currentElementRect.height / 2,
    };

    const distanceList: TypeDistanceItem[] = []
    const rightGo = allElementsIdList.find(v => v.id === currentElementId)?.rightGo || []
    const leftGo = allElementsIdList.find(v => v.id === currentElementId)?.leftGo || []
    const upGo = allElementsIdList.find(v => v.id === currentElementId)?.upGo || []
    const downGo = allElementsIdList.find(v => v.id === currentElementId)?.downGo || []
    // 遍历所有元素的id列表
    for (const item of allElementsIdList) {
      // 获取当前元素的DOM元素节点和位置信息
      const element = document.getElementById(item.id) as HTMLElement;
      const elementRect = getBoundingClientRect(element);
      const elementCenter = {
        x: elementRect.left + elementRect.width / 2,
        y: elementRect.top + elementRect.height / 2,
      };

      // 当前焦点元素和目标元素是否同一个scroll
      const isSameScroll = currentEleIsInScroll && contains(currentElementScroll, element)
      // 检查目标元素是否在指定方向上
      let isSameDirection = false;
      // 检查目标轴上有重叠部分的目标元素
      let overlapArea = false;
      // 是否可以跳转出scroll
      let isCanScrollOut = true
      // 检查元素是否在scroll中可视
      let isScrollVisual = isSameScroll ? true : isVisualInScroll(scrollList, element);
      //是否优先跳转,如果标记了多个优先跳转，则优先跳转距离最近的元素，这里是考虑焦点元素可能在页面上消失
      let isgoto = false
      switch (direction) {
        case "RIGHT":
          isSameDirection = elementRect.left >= (currentElementRect.left + currentElementRect.width);
          overlapArea = getOverlapArea(currentElementRect, elementRect, "x")
          isgoto = !!rightGo.find(v => v === item.id)
          if (scrollInfo?.item?.scrollOrientation === "x" && scrollInfo?.item?.scrollOut === false) {
            isCanScrollOut = !!isSameScroll
          }
          break;
        case "LEFT":
          isSameDirection = (elementRect.left + elementRect.width) <= currentElementRect.left;
          overlapArea = getOverlapArea(currentElementRect, elementRect, "x")
          isgoto = !!leftGo.find(v => v === item.id)
          if (scrollInfo?.item?.scrollOrientation === "x" && scrollInfo?.item?.scrollOut === false) {
            isCanScrollOut = !!isSameScroll
          }
          break;
        case "UP":
          isSameDirection = (elementRect.top + elementRect.height) <= currentElementRect.top;
          overlapArea = getOverlapArea(currentElementRect, elementRect, "y")
          isgoto = !!upGo.find(v => v === item.id)
          if (scrollInfo?.item?.scrollOrientation === "y" && scrollInfo?.item?.scrollOut === false) {
            isCanScrollOut = !!isSameScroll
          }
          break;
        case "DOWN":
          isSameDirection = elementRect.top >= (currentElementRect.top + currentElementRect.height);
          overlapArea = getOverlapArea(currentElementRect, elementRect, "y")
          isgoto = !!downGo.find(v => v === item.id)
          if (scrollInfo?.item?.scrollOrientation === "y" && scrollInfo?.item?.scrollOut === false) {
            isCanScrollOut = !!isSameScroll
          }
          break;
      }
      // 计算距离
      const distance = Math.abs(elementCenter.x - currentElementCenter.x) + Math.abs(elementCenter.y - currentElementCenter.y);
      distanceList.push({
        id: item.id,
        distance,
        isScrollVisual,
        isCanScrollOut,
        isSameDirection,
        overlapArea,
        isgoto
      })
    }
    //过滤调当前选中的焦点元素和在scroll中不可视的焦点元素并且元素在指定方向上
    const flutterList = distanceList.filter(v => v.isScrollVisual && v.isSameDirection && (v.id !== currentElementId) && v.isCanScrollOut)
    //查找出优先跳转的元素
    const isgotoList = flutterList.filter(v => v.isgoto)
    if (isgotoList.length > 0) {
      // 初始化距离和最近元素的变量
      const minDistanceElement = isgotoList.reduce((minElement, currentElement) => (currentElement.distance < minElement.distance ? currentElement : minElement), isgotoList[0]);
      return minDistanceElement?.id ?? currentElementId
    }
    //查找出焦点跳转方向上有重叠部分的元素
    const isOverlapAreaList = flutterList.filter(v => v.overlapArea)
    //优先跳转goto指定的焦点元素，如果没有则使用移动方向上与当前元素坐标方向上有面积重合的焦点元素,如果焦点坐标方向上没有重叠部分的元素，则使用最近的元素
    let _list: TypeDistanceItem[] = (isOverlapAreaList.length > 0) ? isOverlapAreaList : flutterList
    // 初始化距离和最近元素的变量
    const minDistanceElement = _list.reduce((minElement, currentElement) => (currentElement.distance < minElement.distance ? currentElement : minElement), _list[0]);
    //查找scroll中的缓存焦点元素的id,
    const _catcheScrollId = isInScrollId(minDistanceElement?.id, scrollList)?.cacheId
    //如果找到_catcheScrollId并且页面中存在_catcheScrollId这个焦点元素并且scrollInfo中的cacheId等于_catcheScrollId时
    if (_catcheScrollId && allElementsIdList.find(v => v.id === _catcheScrollId) && (scrollInfo?.cacheId !== _catcheScrollId)) return _catcheScrollId
    return minDistanceElement?.id
  } catch (error) {
    console.error(error);

    return null
  }
}