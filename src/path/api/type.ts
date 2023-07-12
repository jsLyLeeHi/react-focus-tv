export interface TypeDesc { name: string, value: string, key: string }

export namespace TypeGetProjects {
  /**
   * 请求参数weixinOpenid: "",
        unionId: "",
   */
  export type parameter = {
    cosInquiryInfo: string
    extension: any[]
    itemId: null | string[]
    outContentId: string
    productId: string[]
    rightsId: string[]
    topicId: string
    type: string
  }

  export type item = {
    activityList: []
    basePrice: 250
    chargeCode: "310000522716"
    contractNum: 0
    contractPrice: 0
    contractUnit: ""
    couponCutInfoList: []
    couponInfoList: []
    desc: TypeDesc[]
    displayOrder: 0
    displayPosition: ""
    expireDate: "2093-02-24 10:15:15"
    extension: TypeDesc[]
    globalSort: 0
    hasRights: false
    imgUrl: TypeDesc[]
    isGlobalSort: null
    isRenew: "NO"
    itemBusinessType: null
    itemId: string
    itemName: string
    itemType: "MONTH"
    payList: []
    price: null
    productId: string
    purchaseState: ""
    refundType: "NOW"
    renewCount: -1
    rightsEndDate: ""
    rightsStartDate: ""
    saleNum: 1
    salePrice: 250
    saleUnit: "NATURAL_MONTH"
    salesScopeChannel: ""
    salesScopeUser: ""
    serviceId: "310000522716"
    status: null
    userTagScope: ""
    validDate: "2023-02-24 10:15:13"
    vendorName: ""
  }

  export type product = {
    businessType: string
    displayOrder: number
    extension: TypeDesc[]
    itemList: item[]
    orgInfoList: { orgCode: string, orgName: string, params: [] }[]
    productDesc: TypeDesc[]
    // productDesc: "[{\"name\":\"描述\",\"key\":\"DETAIL_DESC\",\"value\":\"\"},{\"name\":\"海报角标位置\",\"key\":\"ICON_IMG_POSTION\",\"value\":\"\"},{\"name\":\"权益描述\",\"key\":\"RIGHTS_DESC\",\"value\":\"\"}]"
    productId: string
    productImgUrl: TypeDesc[]
    // productImgUrl: "[{\"name\":\"焦点图片\",\"value\":\"\",\"key\":\"FOCUS_IMG\"},{\"name\":\"角标图片\",\"value\":\"\",\"key\":\"ICON_IMG\"},{\"name\":\"选择页背景图片\",\"value\":\"\",\"key\":\"SELECT_BACKGROUND_IMG\"},{\"name\":\"详情页海报图片地址\",\"value\":\"\",\"key\":\"DETAIL_POSTER_IMG\"},{\"name\":\"我的订购海报图片地址\",\"value\":\"\",\"key\":\"ORDER_POSTER_IMG\"},{\"name\":\"大数据海报（横版）\",\"value\":\"\",\"key\":\"BD_POSTER_HORIZONTAL_IMG\"},{\"name\":\"大数据海报（竖版）\",\"value\":\"\",\"key\":\"BD_POSTER_PORTRAIT_IMG\"}]"
    productName: string
    productTags: string
    productType: string
    rightsCodes: string
    source: string
  }
  /**
   * 返回参数
   */
  export type returnedVal = {
    accountIdentify: ""
    appInfo: null
    couponInfoList: []
    defaultConfig: {
      desc: TypeDesc[]
      extension: TypeDesc[]
      imgUrl: TypeDesc[]
    }
    extension: []
    gmsUserInfoResp: null
    hasOrderProduct: null
    inquiryCouponInfo: null
    inquiryTime: "20230712142720"
    productList: product[]
    remoteInquriyReturnCode: ""
    validUserOrderInfoList: []
  }
}