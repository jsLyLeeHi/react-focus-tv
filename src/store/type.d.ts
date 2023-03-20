export interface TypeUserInfo {
  userId: string
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