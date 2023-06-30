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
  const [showPopup, setShowPopup] = useState(false)
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

  return (
    <>
      <FocusEngine onBack={() => navigate(-1)} engineType="1" className="page-box items-page bg-dull" listenerKeydown={!showPopup} focusId={datalist[0].itemList[0].itemId}>
        <FocusScroll className='left-scroll' scrollOrientation='y'>
          {datalist.map((val, idx) => (
            <FocusEngine.Item className='box-item' key={idx} onFocus={() => setSelectProduct(val)}>{val.productName}</FocusEngine.Item>
          ))}
        </FocusScroll>
        <FocusScroll className='right-scroll' scrollOrientation='y' selectId={selectIdItem?.selectId}>
          {selectProduct.itemList.map(val => (
            <FocusEngine.Item onEnter={() => setShowPopup(true)} className='product-item' key={val.itemId} id={val.itemId} onFocus={() => onItemFocus(val)}>{val.itemName}</FocusEngine.Item>
          ))}
        </FocusScroll>
        {/* 弹窗 */}
        <FocusEngine engineType="2" className="items-page focus-popup" hidden={!showPopup} onBack={() => setShowPopup(false)} listenerKeydown={showPopup}>
          <FocusScroll className='left-scroll scroll1' scrollOrientation='y'>
            {produstList.map((val, idx) => (
              <FocusEngine.Item className='box-item' key={idx}>{val.productName}</FocusEngine.Item>
            ))}
          </FocusScroll>
        </FocusEngine>
      </FocusEngine>
    </>
  );
}