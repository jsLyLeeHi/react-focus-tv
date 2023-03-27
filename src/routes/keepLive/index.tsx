import { cloneDeep } from 'lodash';
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { KeepStore, TypeKeepStoreItem } from "./store"



const KeepAlive: React.FC<{ children: ReactNode }> & { Item: React.FC<{ children: ReactNode, cacheKey: string }> } = (props) => {
  const [storeInfoList, setStoreInfoList] = useState<TypeKeepStoreItem[]>([])

  function setStoreInfo(params: TypeKeepStoreItem) {
    const _childrenIdx = storeInfoList.findIndex(v => v.cacheKey === params.cacheKey)
    const _list = cloneDeep(storeInfoList)
    if (_childrenIdx >= 0) {
      _list[_childrenIdx] = params
    } else {
      _list.push(params)
    }
    setStoreInfoList(_list)
  }
  return <KeepStore.Provider value={{ storeInfoList, setStoreInfo }}>{props.children}</KeepStore.Provider>;
};
KeepAlive.Item = (props) => {
  const { storeInfoList, setStoreInfo } = useContext(KeepStore);
  useEffect(() => {
    if (!props.cacheKey) return
    setStoreInfo({
      cacheKey: props.cacheKey,
      component: props.children,
      state: props.children
    })
  }, [props.children, props.cacheKey])

  const _children = storeInfoList.find(v => v.cacheKey === props.cacheKey)
  console.log(_children);
  
  return <>
    {_children
      ? React.cloneElement(_children.component, { ...props, ..._children.component.props, children: _children.state })
      : props.children}
  </>
};


export const RouterKeepAlive = KeepAlive
export default KeepAlive