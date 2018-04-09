const state = {
  login: false,
  menus: [],
  current_title: '',
  unread_msg_count: 0,
  user: {id: 0, username: '未登录', type: 0, mobile: ''}
}

const mutations = {
  userLogin (state, payload) {
    state.login = true
    state.user = payload.user_info
  },
  userLogout (state, payload) {
    state.login = false
    state.user = {id: 0, username: '未登录', type: 0, mobile: ''}
  },
  setCurrentPageTitle (state, payload) {
    state.current_title = payload.title
  }
}

export default {
  state,
  mutations
}
