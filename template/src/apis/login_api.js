// 登录相关的API

export default function (Vue) {
  let loginApis = {

    // /user/login with params {username: 'e.w.deng', password: 'xxxx'}
    // return
    // {result: true, user_info: {id: 1, type: 1, name: 'w.deng'}}
    // {result: false, error: '用户名密码错误！'}
    try_login (loginInfo, vue, successCallback, failedCallback) {
      vue.$api.baseApis.request('api/login', loginInfo, vue, response => {
        let result = response.data.result
        if (result === true) {
          successCallback(response.data)
        } else {
          failedCallback(response.data)
        }
      }, response => {
        failedCallback({error: '加载错误！'})
      })
    },
    logout (vue) {
      Vue.api.clearSessionCookie()
      vue.$store.commit('userLogout')
      vue.$router.push('/login')
    }
  }

  return loginApis
}
