<style scoped>
  .layout-logo{
      width: 120px;
      height: 30px;
      background: #5b6270;
      color: #FFF;
      border-radius: 3px;
      float: left;
      position: relative;
      top: 15px;
      left: 20px;
      line-height: 18px;
      padding-top: 5px;
      padding-left: 5px; 
      margin-right: 20px;
  }
  .layout-nav{
      width: 500px; 
      margin: 0 auto;
  }
</style>

<template>
  <div>
    <Menu mode="horizontal" theme="dark" :active-name="active_menu" v-if="logined" @on-select="menuClick">
      <Row type="flex" justify="space-between">
        <Col :xs="10" :sm="10" :md="3" :lg="3">
          <div class="layout-logo">
            TITLE
          </div>
        </Col>
        <Col :xs="0" :sm="0" :md="16" :lg="16">
          <div class="layout-nav">
            <MenuItem :name="m.name" v-for="m in menus" :key="m.id">
                <Icon :type="m.icon"></Icon>
                {{m.title}}
            </MenuItem>
          </div>
        </Col>
        <Col :xs="10" :sm="10" :md="5" :lg="5">
          <div style="float:right; color: #FFF; cursor: pointer;"> 
            <Dropdown style="margin-right: 20px" @on-click="userMenuClicked">
              &nbsp;&nbsp;
              {{current_user.username}}
              <Icon type="arrow-down-b"></Icon>
              <DropdownMenu slot="list">
                <DropdownItem name="quit" divided>安全退出</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Col>
      </Row>
    </Menu>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  data: function () {
    return {
      active_menu: 'home'
    }
  },
  methods: {
    menuClick (name) {
      this.active_menu = name
      this.$router.push('/list/' + name)
    },
    userMenuClicked (name) {
      if (name === 'admin') {
        this.$router.push('/admin/')
      } else if (name === 'quit') {
        let state = this
        this.$Modal.confirm({
          title: 'TITLE',
          content: '确认要退出系统吗？',
          onOk: () => {
            state.$store.commit({
              type: 'userLogout'
            })
            state.$router.push('/login')
          },
          onCancel: () => {
            // this.$Message.info('Clicked cancel')
          }
        })
      }
    }
  },
  mounted: function () {
    this.loadUnreadMessageCount()
  },
  computed: {
    logined () {
      return this.$store.state.user.login
    },
    current_user () {
      return this.$store.state.user.user
    },
    is_admin () {
      return this.current_user.role === 'admin'
    },
    menus () {
      return this.$store.state.user.menus
    }
  }
}
</script>
