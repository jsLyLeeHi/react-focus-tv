import { FocusEngine, FocusScroll } from '@/components/focus-engine';
import { cloneDeep } from 'lodash';
import { useState } from 'react';
import { produstList } from "./data"
import "./index.less"

export default function MyPage() {
  const [datalist] = useState(produstList)
  const [selectProduct, setSelectProduct] = useState(produstList[0])
  const [selectIdList, setSelectIdList] = useState<{ productName: string, selectId: string }[]>([])

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
  console.log(selectIdList, datalist);

  return (
    <>
      <FocusEngine className="index-box">
        <FocusScroll scrollOrientation='y'>
          {datalist.map((val, idx) => (
            <FocusEngine.Item key={idx} onFocus={() => setSelectProduct(val)}>{val.productName}</FocusEngine.Item>
          ))}
        </FocusScroll>
        <FocusScroll scrollOrientation='y' selectId={selectIdItem?.selectId}>
          {selectProduct.itemList.map((val, idx) => (
            <FocusEngine.Item key={idx} id={val.itemId} onFocus={() => onItemFocus(val)}>{val.productName}</FocusEngine.Item>
          ))}
        </FocusScroll>
      </FocusEngine>
    </>
  );
}
