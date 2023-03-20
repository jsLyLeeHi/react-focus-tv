import { tvAxios } from "@/axios"
/**获取项目列表 */
export function getProjects() {
  return tvAxios.post("v3/cloudpay/queryPrice",
    {
      "cosInquiryInfo": "",
      "outContentId": "CD0960505EA241B2977E57732BA079CD",
      "productId": [], "itemId": null, "rightsId": [], "type": "6", "topicId": "", "extension": [], "userInfo": {
        "mac": "", "userId": "", "custId": "", "uid": "", "sno": "", "usertoken": "", "deviceId": "", "ucsPhoneNo": "",
        "loginPhoneNo": "", "defaultPayAccount": "", "paymentAccount": "", "extension": [], "userToken": ""
      }
    }
  )
}