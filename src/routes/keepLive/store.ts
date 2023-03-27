import { createContext } from 'react'

export const defStoreData = {
  id: "",
  keyCode: "0"
}
export const EngineStore = createContext<{
  listenerKeydown?: boolean,
  setCurentId: (p: string) => void
}>({
  listenerKeydown: true,
  setCurentId: () => { },
});

