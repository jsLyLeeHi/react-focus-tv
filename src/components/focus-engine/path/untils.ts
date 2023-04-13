
export function getUUid() {
  //生成一个UUID
  var s: string[] = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr(((s['19'] as any) & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "";

  var uuid = s.join("");
  return uuid;
}

/**
* 兼容不支持contains的浏览器
* @param parent 父元素
* @param child 子元素
*/
export function contains(parent?: HTMLElement | null, child?: HTMLElement | null): boolean {
  if (!parent || !child) return false
  if (parent === child) return true;
  if (parent.contains) return parent.contains(child);
  let node = child.parentNode;
  while (node !== null) {
    if (node === parent) return true;
    node = node.parentNode;
  }
  return false;
}

export interface MyDOMRect { top: number, left: number, right: number, bottom: number, width: number, height: number }
export function getBoundingClientRect(el: HTMLElement): DOMRect {
  const rect = el.getBoundingClientRect() || {};
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const clientLeft = document.documentElement.clientLeft || 0;
  const clientTop = document.documentElement.clientTop || 0;
  return {
    left: rect.left + scrollLeft - clientLeft,
    top: rect.top + scrollTop - clientTop,
    width: rect.width,
    height: rect.height,
    right: rect.right + scrollLeft - clientLeft,
    bottom: rect.bottom + scrollTop - clientTop,
    x: rect.x || rect.left,
    y: rect.y || rect.top,
    toJSON: rect.toJSON || (() => { }),
    ...(rect as any)
  }
}