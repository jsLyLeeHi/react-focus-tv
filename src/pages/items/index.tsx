import { FocusEngine, FocusScroll } from '@/components/focus-engine';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import { produstList } from "./data"
import { useNavigate } from 'react-router-dom';
import "./index.less"

export default function MyPage() {
  const navigate = useNavigate();
  const [datalist] = useState(produstList)
  const [selectProduct, setSelectProduct] = useState(produstList[0])
  const [selectIdList, setSelectIdList] = useState<{ productName: string, selectId: string }[]>([])
  useEffect(() => {
    setSelectIdList(datalist.map(val => ({ productName: val.itemList[0].productName, selectId: val.itemList[0].itemId })))
  }, [])
  function onItemFocus(val: any) {
    const _list = cloneDeep(selectIdList)
    const _idx = _list.findIndex(val => val.productName == selectProduct.productName)
    if (_idx < 0) return
    _list[_idx] = { productName: val.productName, selectId: val.itemId }
    setSelectIdList(_list)
  }
  const selectIdItem = selectIdList.find(v => v.productName === selectProduct.productName)
  function onModal() {
    FocusEngine.onDialog({
      content: "呵呵哈哈爱书法家东方八所开发呵呵哈哈爱书法家东方八所开发呵呵哈哈家东方八所开发呵呵哈哈爱书法家东方八所开发呵呵哈哈爱书法家东方八所开发",
    })
  }
  return (
    <>
      <FocusEngine onBack={() => navigate(-1)} engineType="1" className="page-box items-page bg-dull" focusId={datalist[0].itemList[0].itemId}>
        <FocusScroll className='left-scroll' scrollOrientation='y'>
          {datalist.map((val, idx) => (
            <FocusEngine.Item onEnter={() => FocusEngine.onToast("哈哈哈哈哈")} className='box-item' key={"box-item" + idx}
              onFocus={() => setSelectProduct(val)}>{val.productName}</FocusEngine.Item>
          ))}
        </FocusScroll>
        <FocusScroll className='right-scroll' scrollOrientation='y' selectId={selectIdItem?.selectId}>
          {selectProduct.itemList.map((val) => (
            <FocusEngine.Item onEnter={onModal} className='product-item'
              key={val.itemId} id={val.itemId} onFocus={() => onItemFocus(val)}>{val.itemName}</FocusEngine.Item>
          ))}
        </FocusScroll>
      </FocusEngine>
    </>
  );
}