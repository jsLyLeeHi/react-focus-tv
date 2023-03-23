import { FocusEngine, FocusScroll } from '@/components/focus-engine';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import { produstList } from "./data"
import "./index.less"

export default function MyPage() {
  const [datalist] = useState(produstList)
  const [selectProduct, setSelectProduct] = useState(produstList[0])
  const [selectIdList, setSelectIdList] = useState<{ productName: string, selectId: string }[]>([])
  useEffect(() => {
    setSelectIdList(datalist.map(val => {
      const _item = val.itemList[0]
      return {
        productName: _item.productName,
        selectId: _item.itemId
      }
    }))
  }, [])

  function onItemFocus(val: any) {
    const _list = cloneDeep(selectIdList)
    const _idx = _list.findIndex(val => val.productName == selectProduct.productName)
    if (_idx >= 0) {
      _list[_idx] = {
        productName: val.productName,
        selectId: val.itemId
      }
    } else {
      _list.push({
        productName: val.productName,
        selectId: val.itemId
      })
    }
    setSelectIdList(_list)
  }
  const selectIdItem = selectIdList.find(v => v.productName === selectProduct.productName)
  return (
    <>
      <FocusEngine className="index-box">
        <FocusScroll scrollOrientation='y'>
          {datalist.map((val, idx) => (
            <FocusEngine.Item key={idx} onFocus={() => setSelectProduct(val)}>{val.productName}</FocusEngine.Item>
          ))}
        </FocusScroll>
        <FocusScroll scrollOrientation='y' selectId={selectIdItem?.selectId}>
          {selectProduct.itemList.map(val => (
            <FocusEngine.Item key={val.itemId} id={val.itemId} onFocus={() => onItemFocus(val)}>{val.itemName}</FocusEngine.Item>
          ))}
        </FocusScroll>
      </FocusEngine>
    </>
  );
}
