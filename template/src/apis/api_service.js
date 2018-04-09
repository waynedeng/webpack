// Leads Server Api Call Functions
import baseApis from './base_api'

function ApiService (Vue) {
  if (ApiService.installed) {
    return
  }

  let apis = {
    baseApis: baseApis(Vue),
    loginApis: loginApis(Vue),
    pagesApis: pagesApis(Vue),
    session_id () {
      return Vue.api.getCookie('rcc_auth_id')
    },
    getCookie (name) {
      const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      const arr = document.cookie.match(reg)
      if (arr) {
        return decodeURIComponent(arr[2])
      } else {
        return null
      }
    },
    delCookie ({ name, domain, path }) {
      if (Vue.api.getCookie(name)) {
        document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=' +
          path + '; domain=' +
          domain
      }
    }
  }

  Vue.prototype.$api = apis
  Vue.api = apis
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ApiService)
}

export default ApiService
