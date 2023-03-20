import storage from "@/path/untils/storage"
import { Context, ReactNode, useContext, useState, createContext } from 'react';
import { cloneDeep } from "lodash"
import { ContextProps, TypeAppData } from "./type"
export const localKey = "localStorageAppData"


export const defAppData: ContextProps = {
  appData: {
    userInfo: {
      userId: ""
    },
    routeInfo: {
      id: ""
    }
  },
  setAppData: () => { }
}
export const AppContext = createContext<ContextProps>(defAppData);

export function useStore() {
  const { appData, setAppData } = useContext(AppContext);

  function storageAppData(p: any, key?: string) {
    if (typeof p === "function") {
      if (key == null) {
        storage.setLocalStorage(localKey, p)
        setAppData(p)
      } else {
        setAppData(function (val: any) {
          const _appData: any = cloneDeep(appData)
          _appData[key || ""] = p(val[key || ""])
          storage.setLocalStorage(localKey, _appData)
          return _appData
        })
      }
    } else {
      const _params: any = cloneDeep(p)
      if (key == null) {
        storage.setLocalStorage(localKey, _params)
        setAppData(_params)
      } else {
        const _appData: any = cloneDeep(appData)
        _appData[key] = _params
        storage.setLocalStorage(localKey, _appData)
        setAppData(_appData)
      }
    }
  }
  return {
    appData,
    setAppData,
    storageAppData
  }
}



export default function AppContextProvider(props: { children: ReactNode | ReactNode[] }) {
  const [appData, setAppData] = useState<TypeAppData>(storage.getLocalStorage(localKey) || defAppData.appData);

  return <AppContext.Provider value={{ appData, setAppData }}>{props.children}</AppContext.Provider>
}