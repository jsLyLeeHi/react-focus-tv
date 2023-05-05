export interface TypeUserInfo {
  mac: string,
  userId: string,
  custId: string,
  uid: string,
  sno: string,
  usertoken: string,
  deviceId: string,
  ucsPhoneNo: string,
  loginPhoneNo: string,
  defaultPayAccount: string,
  paymentAccount: string,
  extension: any[],
  userToken: string
}

export interface TypeAppData {
  userInfo: TypeUserInfo,
  routeInfo: {
    id: string
  }
}

export type TypeState<T> = (T | ((t: T) => T))

// 定义上下文数据类型
export interface ContextProps {
  appData: TypeAppData
  setAppData: React.Dispatch<React.SetStateAction<TypeAppData>>;
}