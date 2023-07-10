import { tvAxios } from "@/path/axios"
import { localService } from "@/path/axios/config"
import { getUserInfo } from '@/store';
/**获取项目列表 */
export function getProjects(params: { [key: string]: any }) {
  return tvAxios.post("v3/cloudpay/queryPrice", {
    ...params,
    "userInfo": getUserInfo()
  })
}
export function getAbilityStringByUrl(params: { Cmd: string, Srv?: string }) {
  return tvAxios.get(localService, { data: params })
}