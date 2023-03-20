

const storage = {
  // 获取会话内存储的值
  getSessionStorage(key: string = '') {
    try {
      // 对象方式获取值
      return JSON.parse(sessionStorage.getItem(key) || '').data
    } catch (err) {
      return null
    }
  },
  // 写入会话内缓存
  setSessionStorage(key: string, value: any) {
    let tmpData = { data: value }
    try {
      sessionStorage.setItem(key, JSON.stringify(tmpData))
      return true
    } catch (err) {
      return false
    }
  },
  // 移除会话内的单个存储
  removeSessionStorage(key: string) {
    try {
      // 对象方式获取值
      return sessionStorage.removeItem(key)
    } catch (err) {
      return null
    }
  },
  //本地永久存储写入有效期，有效期内会取出来，失效后会清空
  setLocalStorageSync(key: string, value: any, exp: number = 31536000000) {
    let tmpData = { data: value, exp, startTime: new Date().getTime() }
    // 对象方式获取值
    localStorage.setItem(key, JSON.stringify(tmpData))
  },
  //本地永久存储写入有效期，有效期内会取出来，失效后会清空
  setLocalStorage(key: string, value: any, exp: number = 31536000000) {
    let tmpData = { data: value, exp, startTime: new Date().getTime() }
    // 对象方式获取值
    localStorage.setItem(key, JSON.stringify(tmpData))
  },
  // 处理数据本地数据缓存返回
  handleLocalDataBack(tmpData: any, key: string) {
    let returnData = null
    let date = new Date().getTime();
    // 如果有设置过期时间
    if (tmpData && tmpData.exp) {
      if (date - tmpData.startTime > tmpData.exp) {
        //缓存过期，清除缓存，返回false
        localStorage.removeItem(key)
        returnData = null
      } else {
        //缓存未过期，返回值
        returnData = tmpData.data;
      }
    } else {
      returnData = tmpData
    }
    return returnData
  },
  // 移除所有的本地存储
  removeAllLocal() {
    localStorage.clear()
  },
  // 移除本地所有的过期的缓存
  removeAllLocalExp() {
    let localItemsLength = localStorage.length
    let that = this
    for (let index = 0; index < localItemsLength; index++) {
      let key = localStorage.key(index) || ''
      that.handleLocalDataBack(JSON.parse(localStorage.getItem(key) || ''), key)
    }
  },
  //本地取出存储的值
  getLocalStorage(key: string) {
    let tmpData = null
    // 对象方式获取值
    tmpData = JSON.parse(localStorage.getItem(key) || '{}')
    return this.handleLocalDataBack(tmpData, key)
  },
  //本地删除存储
  removeLocalStorage(key: string) {
    // 对象方式获取值
    localStorage.removeItem(key)
  }
}

export default storage
