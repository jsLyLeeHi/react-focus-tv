import { tvAxios } from "@/path/axios"
import { localService } from "@/path/axios/config"
import { getUserInfo } from '@/store';
import { FocusEngine } from '@/components/focus-engine';
/**获取项目列表 */
export function getProjects(params: { [key: string]: any }) {
  const { hideLoading } = FocusEngine.onLoading("加载中")
  return tvAxios.post("v3/cloudpay/queryPrice", {
    ...params,
    "userInfo": getUserInfo()
  }).finally(() => {
    hideLoading()
  })
}
export function getAbilityStringByUrl(params: { Cmd: string, Srv?: string }) {
  return tvAxios.get(localService, { data: params })
}