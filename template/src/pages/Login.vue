<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">
        <i class="fa fa-key" aria-hidden="true" />
        登录系统
      </div>
      {{login_info}}
      <Form ref="loginForm" :model="loginForm" :rules="rules" v-if="show_login_form">
        <FormItem prop="user">
            <Input type="text" v-model="loginForm.username" placeholder="用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="loginForm.password" placeholder="密码">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="submitForm('loginForm')">立即登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      show_login_form: false,
      login_info: '',
      loginForm: {
        username: 'w.deng',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    tryAutoLogin() {
      const self = this
      this.login_info = '尝试登录中……'
      this.$api.loginApis.try_login(
        this.loginForm,
        this,
        result => {
          console.log(result)
          self.$store.commit({
            type: 'userLogin',
            user_info: result.user_info
          })

          self.$nextTick(() => {
            self.$Message.success('成功登录！')

            let nextUrl = self.$route.query.redirect || '/'
            console.log(['Redirect to:', nextUrl])
            self.$router.push(nextUrl)
          })
        },
        failedResult => {
          self.$Message.error(failedResult.error)
        }
      )
    },
    submitForm(formName) {
      const self = this
      self.$refs[formName].validate(valid => {
        if (valid) {
          this.tryAutoLogin()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  computed: {
    logined() {
      return this.$store.state.user.login
    }
  },
  mounted() {
    console.log(['Login mounted!', this.logined])
    // 如果appConfig.loginMethod为单点登录，则自动尝试登录，失败跳转到单点登录页面
    if (this.$appConfig.loginMethod === 'oauth') {
      if (this.logined === false) {
        this.tryAutoLogin()
      }
    } else {
      this.show_login_form = true
    }
  }
}
</script>

<style scoped>
.login-wrap {
  width: 100%;
  height: 100%;
}

.ms-title {
  font-weight: bold;
  font-family: 宋体, serif;
  font-size: 18px;
  color: rgb(51, 51, 51);
  text-align: center;
  padding: 0 0 30px 0;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin: -150px 0 0 -190px;
  padding: 0 40px;
  border-radius: 5px;
  background: #fff;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
}
</style>
