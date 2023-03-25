import { createContext } from 'react'
import { TypeFocusStore } from "./index.d"
import { TypeScrollIdItem, TypeFocusItem } from "../engine/type"

export const defStoreData: TypeFocusStore.TypeDefStoreData = {
  id: "",
  keyCode: "0"
}
export const EngineStore = createContext<{
  value: TypeFocusStore.TypeDefStoreData,
  focusList: TypeFocusItem[],
  scrollList: TypeScrollIdItem[],
  listenerKeydown?: boolean,
  widgetCreate: (p: TypeFocusStore.TypeWidgetParams) => void
  widgetDestroy: (p: { id: string }) => void
  scrollEleCreate: (p: TypeScrollIdItem) => void
  scrollEleDestroy: (p: { id: string }) => void
  setCurentId: (p: string) => void
}>({
  value: defStoreData,
  focusList: [],
  scrollList: [],
  listenerKeydown: true,
  widgetCreate: () => { },
  widgetDestroy: () => { },
  scrollEleCreate: () => { },
  scrollEleDestroy: () => { },
  setCurentId: () => { },
});

