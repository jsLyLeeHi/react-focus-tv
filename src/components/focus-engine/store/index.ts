import { createContext } from 'react'
import { TypeFocusStore } from "./index.d"

export const defStoreData: TypeFocusStore.TypeDefStoreData = {
  id: "",
  keyCode: "0"
}
export const EngineStore = createContext<{
  value: TypeFocusStore.TypeDefStoreData,
  widgetCreate: (p: TypeFocusStore.TypeWidgetParams) => void
  widgetDestroy: (p: TypeFocusStore.TypeWidgetParams) => void
  setCurentId: (p: string) => void
}>({
  value: defStoreData,
  widgetCreate: () => { },
  widgetDestroy: () => { },
  setCurentId: () => { },
});

