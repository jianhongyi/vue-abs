<!-- 布局组件主页面 -->
<template>
  <div class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>

  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
    }
  },
  computed: {
    device() {
      return this.$store.getters.device
    },
    sidebar() {
      return this.$store.state.app.sidebar
    }

  },

  mounted() {},

  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
