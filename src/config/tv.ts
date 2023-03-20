export const tvconfig = {
  focusClassName: "on-focus", // 聚焦元素的className （默认focus）
  KEYS: {
    KEY_LEFT: [37, 21],
    KEY_UP: [38, 19],
    KEY_RIGHT: [39, 22],
    KEY_DOWN: [40, 20],
    KEY_ENTER: [13, 23]
  }, // 自定义键值
  longPressTime: 800, // 长按响应时间（单位：毫秒），默认500ms
  offsetDistance : 200, // 	边缘距离（单位px）
  distanceToCenter: false, // 使焦点始终在可视范围的中间部分，默认false
}