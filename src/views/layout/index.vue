<!-- 布局组件主页面 -->
<template>
  <div class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <tags-view/>
      <app-main/>
      <el-button type="primary">测试</el-button>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import TagsView from './TagsView'
import AppMain from './AppMain'
export default {
  components: {
    Sidebar,
    Navbar,
    TagsView,
    AppMain
  },
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
