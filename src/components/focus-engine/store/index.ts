import { createContext } from 'react'
import { TypeFocusStore } from "./index.d"

export const defStoreData: TypeFocusStore.TypeDefStoreData = {
  id: "",
  keyCode: "0"
}
export const EngineStore = createContext<{
  value: TypeFocusStore.TypeDefStoreData,
  focusList: string[],
  widgetCreate: (p: TypeFocusStore.TypeWidgetParams) => void
  scrollEleChange: (p: { id: string, cacheFocusId: string, list: string[] }, type?: "create" | "destroy") => void
  widgetDestroy: (p: TypeFocusStore.TypeWidgetParams) => void
  setCurentId: (p: string) => void
}>({
  value: defStoreData,
  focusList: [],
  widgetCreate: () => { },
  scrollEleChange: () => { },
  widgetDestroy: () => { },
  setCurentId: () => { },
});

