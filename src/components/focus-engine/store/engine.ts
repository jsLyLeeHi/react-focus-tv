import { createContext } from 'react'
import { TypeScrollIdItem, TypeFocusItem, TypePopupItem } from "../modules/type"
import { TypeKeyCode } from "../key_iptv";
export const EngineStore = createContext<{
  focusId: string,
  keyCode: { value?: TypeKeyCode },
  focusList: TypeFocusItem[],
  popupList: TypePopupItem[],
  scrollList: TypeScrollIdItem[],
  isVisible: boolean,
  widgetCreate: (p: TypeFocusItem) => void
  widgetDestroy: (p: { id: string }) => void
  popupCreate: (p: TypePopupItem) => void,
  popupDestroy: (p: TypePopupItem) => void,
  scrollEleCreate: (p: TypeScrollIdItem) => void
  scrollEleDestroy: (p: { id: string }) => void
  setCurentId: (p: string) => void
}>({
  focusId: "",
  keyCode: {},
  focusList: [],
  popupList: [],
  scrollList: [],
  isVisible: false,
  widgetCreate: () => { },
  widgetDestroy: () => { },
  popupCreate: () => { },
  popupDestroy: () => { },
  scrollEleCreate: () => { },
  scrollEleDestroy: () => { },
  setCurentId: () => { },
});

