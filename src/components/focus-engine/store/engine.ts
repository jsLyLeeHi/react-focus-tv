import { createContext } from 'react'
import { TypeFocusStore } from "./type-engine"
import { TypeScrollIdItem, TypeFocusItem } from "../modules/type"
import { TypeKeyCode } from "../key_iptv";
export const EngineStore = createContext<{
  focusId: string,
  keyCode: { value?: TypeKeyCode },
  focusList: TypeFocusItem[],
  scrollList: TypeScrollIdItem[],
  isVisible: boolean,
  widgetCreate: (p: TypeFocusStore.TypeWidgetParams) => void
  widgetDestroy: (p: { id: string }) => void
  scrollEleCreate: (p: TypeScrollIdItem) => void
  scrollEleDestroy: (p: { id: string }) => void
  setCurentId: (p: string) => void
}>({
  focusId: "",
  keyCode: {},
  focusList: [],
  scrollList: [],
  isVisible: false,
  widgetCreate: () => { },
  widgetDestroy: () => { },
  scrollEleCreate: () => { },
  scrollEleDestroy: () => { },
  setCurentId: () => { },
});

