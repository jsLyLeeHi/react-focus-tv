import { createContext } from 'react'
import { TypeFocusStore } from "./index.d"
import { TypeScrollIdItem } from "../engine/type"

export const defStoreData: TypeFocusStore.TypeDefStoreData = {
  id: "",
  keyCode: "0"
}
export const EngineStore = createContext<{
  value: TypeFocusStore.TypeDefStoreData,
  focusList: string[],
  scrollList: TypeScrollIdItem[],
  widgetCreate: (p: TypeFocusStore.TypeWidgetParams) => void
  scrollEleChange: (p: TypeScrollIdItem, type?: "create" | "destroy") => void
  widgetDestroy: (p: TypeFocusStore.TypeWidgetParams) => void
  setCurentId: (p: string) => void
}>({
  value: defStoreData,
  focusList: [],
  scrollList: [],
  widgetCreate: () => { },
  scrollEleChange: () => { },
  widgetDestroy: () => { },
  setCurentId: () => { },
});

