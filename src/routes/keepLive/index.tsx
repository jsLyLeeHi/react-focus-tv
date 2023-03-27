import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { KeepStore, TypeKeepStoreItem } from "./store"



const KeepAlive: React.FC<{ children: ReactNode }> & { Item: React.FC<{ children: ReactNode, cacheKey: string }> } = (props) => {
  const [storeInfo, setStoreInfoList] = useState<TypeKeepStoreItem[]>([])

  function setStoreInfo(params: TypeKeepStoreItem) {

  }
  return <KeepStore.Provider value={{ storeInfo, setStoreInfo }}>{props.children}</KeepStore.Provider>;
};
KeepAlive.Item = (props) => {
  return <>{props.children}</>
};


export const RouterKeepAlive = KeepAlive
export default KeepAlive