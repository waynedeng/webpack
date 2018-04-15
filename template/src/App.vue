<style scoped>
  .layout{
      border: 1px solid #d7dde4;
      background: #f5f7f9;
  }
  .layout-assistant{
      width: 300px;
      margin: 0 auto;
      height: inherit;
  }
  .layout-breadcrumb{
      padding: 10px 15px 0;
  }
  .layout-content{
      min-height: 600px;
      margin: 15px;
      overflow: hidden;
      background: #fff;
      border-radius: 4px;
  }
  .layout-content-main{
      padding: 10px;
      min-height: 600px;
  }
  .layout-copy{
      text-align: center;
      padding: 10px 0 20px;
      color: #9ea7b4;
  }
</style>

<template>
  <div v-bind:class="{ layout: logined }">
    <AppHeader />
    <div class="layout-content">
      <div class="layout-content-main" style="width:100%;">
        <router-view/>
      </div>
    </div>
    <div class="layout-copy" v-if="logined" >
        2018 &copy; RCC China
    </div>
  </div>
</template>

<script>
import AppHeader from './components/common/AppHeader.vue'

export default {
  name: 'app',
  computed: {
    logined () {
      return this.$store.state.user.login
    },
    current_title () {
      return this.$store.state.user.current_title
    }
  },
  components: {
    AppHeader
  }
}
</script>
