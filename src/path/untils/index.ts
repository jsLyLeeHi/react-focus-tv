import { getAbilityStringByUrl } from '@/path/api';
import { tvAxios } from "@/path/axios"
import { useLocation } from 'react-router-dom';
import _ from "lodash"
import { useEffect, useState } from 'react';
import storage from './storage';

function parseURLParams(url: string) {
  const paramsArray = url.split('&'); // 将参数字符串按 '&' 分割成数组
  const params = _.fromPairs(paramsArray.map(param => {
    const [key, value] = param.split('=')
    return [key.replace("?", ""), value]
  })); // 转化为键值对数组，再转化为对象
  return params;
}
const strArray = function (str: any) {
  if ((typeof str === "string") && str !== "") {
    return str.split(",")
  }
  return []
}
interface TypeRouterParams {
  contentId?: string
  backUrl: string
  contentName: string
  cosInquiryInfo: string
  focusItemId: string
  itemIds: string[] | null
  mac: string
  outContentId: string
  productIds: string[]
  returnUrl: string
  rightsId: string[]
  targetId: string | undefined
  userId: string
  type: string
}
/**格式化路由传入的参数 */
export function useRouterParams() {
  const location = useLocation();
  const [routerParams, setRouterParams] = useState<TypeRouterParams>()
  function setParams(p: TypeRouterParams) {
    const _info = storage.getSessionStorage("routerInfo")
    if (!_info?.outContentId) {
      setRouterParams(p)
      storage.setSessionStorage("routerInfo", p)
    } else {
      setRouterParams(_info)
    }
  }

  useEffect(() => {
    const _query = parseURLParams(decodeURIComponent(location.search).replace("??", "?"))

    const _params: TypeRouterParams = {
      type: '0',
      contentId: _query.contentId || _query.psid,
      userId: _query.userId || "",
      targetId: _query.targetId || undefined,
      focusItemId: _query.focusItemId || "",
      cosInquiryInfo: _query.ppvList || _query.cosInquiryInfo || "",
      outContentId: _query.outContentId || "",
      backUrl: unescape(_query.backUrl || ""),
      returnUrl: unescape(_query.returnUrl || ""),
      mac: _query.mac || "",
      contentName: _query.contentName || "",
      rightsId: strArray(_query.rightsId),
      productIds: strArray(_query.productId),
      itemIds: strArray(_query.itemId),
    };
    if (_params.contentId == "null") {
      _params.contentId = undefined;
    }
    if (_params.contentName) {
      setParams(_params)
    } else if (_params.contentId && _params.contentId != "" && !_params.cosInquiryInfo) {
      Promise.all([
        getAbilityStringByUrl({ Cmd: "IGetTMSServerUrl", Srv: "BIMS_ABILITY_STRING" }),
        getAbilityStringByUrl({ Cmd: "IGetTMSServerUrl" }),
      ]).then(res => {
        let params = {
          psId: _params.contentId,
          abilityString: res[0],
          templateId: res[1]
        };
        return tvAxios.post(`epg/getDetail.shtml`, params).then(res => {
          if (res.data && res.data != null && res.data.ppvList != null && res.data.ppvList.length !== 0) {
            let ppvList = JSON.stringify(res.data.ppvList);
            _params.cosInquiryInfo = encodeURI(ppvList)
          }
          let contentName = res.data ? res.data.name || "" : "";
          if (contentName && !_params.contentName) {
            _params.contentName = contentName
          }
        });
      }).finally(() => {
        setParams(_params)
      });
    } else if (_params.cosInquiryInfo) {
      Promise.all([
        getAbilityStringByUrl({ Cmd: "IGetTMSServerUrl", Srv: "BIMS_ABILITY_STRING" }),
        getAbilityStringByUrl({ Cmd: "IGetTMSServerUrl" }),
      ]).then(res => {
        let params = {
          psId: _params.contentId,
          abilityString: res[0],
          templateId: res[1]
        };
        return tvAxios.post(`epg/getDetail.shtml`, params).then(res => {
          let contentName = res.data ? res.data.name || "" : "";
          if (contentName && !_params.contentName) {
            _params.contentName = contentName
          }
        });
      }).finally(() => {
        setParams(_params)
      });
    } else {
      setParams(_params)
    }
  }, [location.search])
  if (routerParams?.contentId) {
    routerParams.type = '0';
  }
  if (routerParams?.cosInquiryInfo && routerParams?.cosInquiryInfo.length > 0) {
    routerParams.type = '2';
  }
  if (routerParams?.productIds && routerParams?.productIds.length > 0) {
    routerParams.type = '1';
  }
  if (routerParams?.rightsId && routerParams?.rightsId.length > 0) {
    routerParams.type = '4';
  }
  if (routerParams?.itemIds && routerParams?.itemIds.length > 0) {
    routerParams.type = '5';
  } else if (routerParams && (!routerParams.itemIds || routerParams?.itemIds.length <= 0)) {
    routerParams.itemIds = null;
  }
  if (routerParams?.outContentId) {
    routerParams.type = '6';
  }
  if (routerParams && !routerParams?.type) {
    routerParams.type = '0'
  }
  return routerParams
}