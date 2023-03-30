import { keyCode } from "../key_iptv";
import { config } from "../path/config"

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

const timer: { current: number | undefined } = { current: undefined }
/**监听键盘拦截 */
export function onKeyDownIntercept(ev: KeyboardEvent) {
  ev.preventDefault();
  ev.stopPropagation();
  //设置单次按键间隔时间
  if (timer.current) return
  timer.current = setTimeout(() => {
    clearTimeout(timer.current)
    timer.current = undefined
  }, config.clickInterval);
  const _keyValue = keyCode[ev.keyCode]
  return _keyValue
}
/**获取元素是否在页面中 */
export function isInViewport(ele?: HTMLDivElement | null): boolean {
  if (!ele) return false
  const rect = ele.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
  return isVisible
}