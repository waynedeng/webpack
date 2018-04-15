import Mock from 'mockjs'

// let Random = Mock.Random

Mock.mock(/user\/login/, function (options) {
  console.log('登录--mock')
  let params = JSON.parse(options.body)
  let result = {}
  if (params.username === 'w.deng' && params.password === '123456') {
    result = {result: true, user_info: {id: 1, name: 'w.deng', type: 1}}
  } else {
    result = {result: false, error: '用户名密码错误！'}
  }
  result = Mock.mock(result)
  return result
})