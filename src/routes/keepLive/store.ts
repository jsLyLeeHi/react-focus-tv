import { createContext, ReactNode } from 'react'
export interface TypeKeepStoreItem {
  cacheKey: string,
  children: ReactNode
}
export interface TypeKeepStore {
  storeInfo: TypeKeepStoreItem[],
  setStoreInfo: (p: TypeKeepStoreItem) => void
}

export const defStoreData: TypeKeepStore = {
  storeInfo: [],
  setStoreInfo: () => { },
}
export const KeepStore = createContext<TypeKeepStore>(defStoreData);

