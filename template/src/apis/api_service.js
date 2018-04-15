// Leads Server Api Call Functions
import baseApis from './base_api'
import loginApis from './login_api'

function ApiService(Vue) {
  if (ApiService.installed) {
    return
  }

  let apis = {
    baseApis: baseApis(Vue),
    loginApis: loginApis(Vue),
    getAuthCookieName() {
      return Vue.appConfig.authCookieName
    },
    session_id() {
      return Vue.api.getCookie(Vue.api.getAuthCookieName())
    },
    // 清理session cookies，注销时使用
    clearSessionCookie() {
      Vue.api.delCookie({
        name: 'rcc-auth',
        path: '/',
        domain: window.location.hostname
      })
    },
    getCookie(name) {
      const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      const arr = document.cookie.match(reg)
      if (arr) {
        return decodeURIComponent(arr[2])
      } else {
        return null
      }
    },
    delCookie({ name, domain, path }) {
      if (Vue.api.getCookie(name)) {
        document.cookie =
          name +
          '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=' +
          path +
          '; domain=' +
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
