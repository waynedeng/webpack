<template>
  <div>
      Index Page
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
      }
    },
    methods: {
    },
    computed: {
      logined () {
        return this.$store.state.user.login
      }
    }
  }
</script>

<style scoped>
</style>
