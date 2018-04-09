// API基础方法
export default function (Vue) {
  let baseApis = {
    request (apiName, params, vue, sucessCallback, failedCallback) {
      vue.$Loading.start()
      Vue.axios.defaults.headers.common['Authorization'] = Vue.api.session_id()
      Vue.axios({
        method: 'post',
        url: apiName,
        data: params
      }).then(function (response) {
        vue.$Loading.finish()
        sucessCallback(response)
      }).catch(function (error) {
        vue.$Loading.error()
        if (error.response && error.response.status === 403) {
          vue.$Modal.confirm({
            title: '提示',
            content: '登录已失效，请重新登录系统?',
            closable: true,
            onOk: function () {
              window.location.href = '/'
            }
          })
        } else if (error.response && error.response.status === 405) {
          vue.$Modal.confirm({
            title: '提示',
            content: '没有权限！',
            closable: true,
            onOk: function () {
              window.location.href = '/'
            }
          })
        } else {
          failedCallback(error)
        }
      })
    },
    auth_value () {
      return Vue.api.baseApis.getCookie('rcc-doc-auth')
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
      if (Vue.api.baseApis.getCookie(name)) {
        document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=' +
          path + '; domain=' +
          domain
      }
    }
  }

  return baseApis
}
