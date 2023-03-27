import { createContext } from 'react'
export interface TypeKeepStoreItem {
  cacheKey: string,
  component:any
  state: any
}
export interface TypeKeepStore {
  storeInfoList: TypeKeepStoreItem[],
  setStoreInfo: (p: TypeKeepStoreItem) => void
}

export const defStoreData: TypeKeepStore = {
  storeInfoList: [],
  setStoreInfo: () => { },
}
export const KeepStore = createContext<TypeKeepStore>(defStoreData);

