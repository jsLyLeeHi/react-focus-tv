import { tvAxios } from "@/path/axios"
import { localService } from "@/path/axios/config"
import { getUserInfo } from '@/store';
import { FocusEngine } from '@/components/focus-engine';
import { TypeGetProjects } from "./type"
/**获取项目列表 */
export function getProjects(params: TypeGetProjects.parameter) {
  const { hideLoading } = FocusEngine.onLoading("加载中")
  return tvAxios.post<TypeGetProjects.returnedVal>("v3/cloudpay/queryPrice", {
    ...params,
    "userInfo": getUserInfo()
  }).finally(() => {
    hideLoading()
  })
}
export function getAbilityStringByUrl(params: { Cmd: string, Srv?: string }) {
  return tvAxios.get(localService, { data: params })
}