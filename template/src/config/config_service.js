// 配置文件服务，供Vue使用
// vue.$appConfig
import appConfig from './index'

function ConfigService (Vue) {
  if (ConfigService.installed) {
    return
  }

  Vue.prototype.$appConfig = appConfig
  Vue.appConfig = appConfig
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ConfigService)
}

export default ConfigService
