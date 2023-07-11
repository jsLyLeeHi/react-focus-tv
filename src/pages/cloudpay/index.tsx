import { FocusEngine, FocusScroll } from '@/components/focus-engine';
import { cloneDeep } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/store';
import { getProjects } from '@/path/api';
import { useRouterParams } from '@/path/untils';
import "./index.less"

export default function MyPage() {
  const { userInfo } = useAppContext();
  const routerData = useRouterParams()

  const navigate = useNavigate();
  const [datalist, setDataList] = useState<any[]>([])
  const [selectProduct, setSelectProduct] = useState<any>()
  const [selectIdList, setSelectIdList] = useState<{ productName: string, selectId: string }[]>([])

  useEffect(() => {
    if (!userInfo.mac || !routerData?.outContentId) return
    let _params = {
      cosInquiryInfo: routerData.cosInquiryInfo,
      contentId: routerData.contentId,
      outContentId: routerData.outContentId,
      productId: routerData.productIds,
      itemId: routerData.itemIds,
      rightsId: routerData.rightsId,
      type: routerData.type,
      topicId: "",
      extension: [],
      //测试的时候，获取当前网页地址以及参数
      // testurl: encodeURIComponent(window.location.href)
    };
    getProjects(_params).then((res) => {
      const _list: any[] = res.data.productList
      setDataList(_list)
      setSelectProduct(_list[0])
      setSelectIdList(_list.map(val => ({ productName: val.itemList[0].productName, selectId: val.itemList[0].itemId })))
    })
  }, [userInfo, routerData])
  function onItemFocus(val: any) {
    const _list = cloneDeep(selectIdList)
    const _idx = _list.findIndex(val => val.productName == selectProduct?.productName)
    if (_idx < 0) return
    _list[_idx] = { productName: val.productName, selectId: val.itemId }
    setSelectIdList(_list)
  }
  const selectIdItem = selectIdList.find(v => v.productName === selectProduct?.productName)

  function onRouterTo() {
    navigate("/Items")
  }

  return <FocusEngine className="page-box bg-black" focusId={datalist[0]?.itemList[0]?.itemId || ""}>
    <div className='index-left'>
      <div className='title c-main s-lg-3'>
        <span>订购会员</span>
      </div>
      <div className='index-scroll'>
        <FocusScroll className='left-scroll' scrollOrientation='y' scrollOut={false}>
          {datalist.map((val, idx) => (
            <FocusEngine.Item className='box-item' id={val.productName} key={idx} onFocus={() => setSelectProduct(val)}>{val.productName}</FocusEngine.Item>
          ))}
        </FocusScroll>
        <FocusScroll className='right-scroll' scrollOrientation='y' selectId={selectIdItem?.selectId}>
          {(selectProduct?.itemList || []).map((val: any) => (
            <FocusEngine.Item onEnter={onRouterTo} className='product-item' key={val.itemId} id={val.itemId} onFocus={() => onItemFocus(val)}>{val.itemName}</FocusEngine.Item>
          ))}
        </FocusScroll>
      </div>
    </div>
  </FocusEngine>
}