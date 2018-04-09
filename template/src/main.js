{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
{{#router}}
import router from './router'
{{/router}}

import store from './store'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

import ApiService from './apis/api_service'

Vue.use(iView)
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(ApiService)

Vue.config.productionTip = false

let env = process.env.NODE_ENV

if (env !== 'production') {
  // Important: 测试本地服务器 && 模拟数据直接进行切换
  // 设置axios请求的默认host
  // 将axios绑定给vue成为一个属性
  // require('../test/data/test_data')
  axios.defaults.baseURL = 'http://127.0.0.1:3000/'
} else {
  axios.defaults.baseURL = 'http://production.server/'
}

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && store.state.user.login === false) {
    console.log(['try visit:', to.fullPath])
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    iView.LoadingBar.start()
    next()
  }
})

router.afterEach(transition => {
  iView.LoadingBar.finish()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
