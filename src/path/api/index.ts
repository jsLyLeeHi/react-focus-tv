import { tvAxios } from "@/path/axios"
import { getUserInfo } from '@/store';
/**获取项目列表 */
export function getProjects() {
  console.log({
    "cosInquiryInfo": "",
    "outContentId": "CD0960505EA241B2977E57732BA079CD",
    "productId": [],
    "itemId": null,
    "rightsId": [],
    "type": "6",
    "topicId": "",
    "extension": [],
    "userInfo": getUserInfo()
  });
  return
  return tvAxios.post("v3/cloudpay/queryPrice", {
    "cosInquiryInfo": "",
    "outContentId": "CD0960505EA241B2977E57732BA079CD",
    "productId": [],
    "itemId": null,
    "rightsId": [],
    "type": "6",
    "topicId": "",
    "extension": [],
    "userInfo": getUserInfo()
  })
}