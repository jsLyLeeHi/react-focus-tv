import { TypeUserInfo, TypeState } from "./type"
import storage from "@/path/untils/storage"
import { useStore, localKey } from "./context"
import { useEffect } from "react";

export function useAppContext() {
  const { appData, storageAppData } = useStore();
  const setUserInfo = (p: TypeState<TypeUserInfo>) => storageAppData(p, "userInfo")


  useEffect(() => {
    if (appData.userInfo?.mac) return
    const userInfo = { "mac": "08:6B:D1:AE:50:4A", "userId": "testxmt36", "custId": "", "uid": "", "sno": "", "usertoken": "", "deviceId": "", "ucsPhoneNo": "", "loginPhoneNo": "", "defaultPayAccount": "", "paymentAccount": "", "extension": [], "userToken": "FW1HHFW1HH5ld31pOJWhGWKdwgg2l5Qj" }
    setUserInfo(userInfo)
  }, [])
  return {
    /**用户信息 */
    userInfo: appData.userInfo,
    /**设置用户信息 */
    setUserInfo
  }
}

export function getUserInfo() {
  return storage.getLocalStorage(localKey)?.userInfo
}