export const iptvKeys = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  ENTER: 13,
  BACK: 8,
  HOME: 36,
  BACKSPACE: 12,
  DEL: 287,
  MENU: 18,
  0: 48,
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 57
};
export const keys = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  ENTER: 13,
  BACK: 27,
  HOME: 36,
  BACKSPACE: 12,
  DEL: 8,
  MENU: 18,
  0: 48,
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 57
};


export type TypeKeyCode = "LEFT" | "UP" | "RIGHT" | "DOWN" | "ENTER" | "BACK" | "HOME" | "BACKSPACE" | "DEL" | "MENU" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
export const keyByIptv: { [key: number]: TypeKeyCode } = {
  37: "LEFT",
  38: "UP",
  39: "RIGHT",
  40: "DOWN",
  13: "ENTER",
  8: "BACK",
  36: "HOME",
  12: "BACKSPACE",
  287: "DEL",
  18: "MENU",
  48: "0",
  49: "1",
  50: "2",
  51: "3",
  52: "4",
  53: "5",
  54: "6",
  55: "7",
  56: "8",
  57: "9",
}
export const keyNoIptv: { [key: number]: TypeKeyCode } = {
  37: "LEFT",
  38: "UP",
  39: "RIGHT",
  40: "DOWN",
  13: "ENTER",
  27: "BACK",
  36: "HOME",
  12: "BACKSPACE",
  8: "DEL",
  18: "MENU",
  48: "0",
  49: "1",
  50: "2",
  51: "3",
  52: "4",
  53: "5",
  54: "6",
  55: "7",
  56: "8",
  57: "9",
}
export const keyCode = keyNoIptv