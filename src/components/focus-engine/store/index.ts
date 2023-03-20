import { createContext } from 'react'
import { TypeFocusStore } from "./index.d"

export const defStoreData: TypeFocusStore.TypeDefStoreData = {
  id: ""
}
export const EngineStore = createContext<{
  value: TypeFocusStore.TypeDefStoreData,
  widgetCreate: (p: TypeFocusStore.TypeWidgetParams) => void
  widgetDestroy: (p: TypeFocusStore.TypeWidgetParams) => void
}>({
  value: defStoreData,
  widgetCreate: () => { },
  widgetDestroy: () => { }
});

