import { TypeUserInfo, TypeState } from "./type"
import { useStore } from "./context"

export function useAppContext() {
  const { appData, storageAppData } = useStore();

  return {
    /**用户信息 */
    userInfo: appData.userInfo,
    /**设置用户信息 */
    setUserInfo: (p: TypeState<TypeUserInfo>) => storageAppData(p, "userInfo")
  }
}
