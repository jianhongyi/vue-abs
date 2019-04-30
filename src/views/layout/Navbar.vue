<!--  -->
<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <Breadcrumb class="breadcrumb-container"/>
    <div class="right-menu">
      <template>
        <el-tooltip :content="$t('navbar.screenfull')" effect="dark" placement="bottom">
          <screenfull class="screenfull right-menu-item"/>
        </el-tooltip>
        <el-tooltip :content="$t('navbar.size')" effect="dark" placement="bottom">
          <SizeSelect class="international right-menu-item"/>
        </el-tooltip>
        <el-tooltip :content="$t('navbar.theme')" :effect="dark" placement="bottom">
          <theme-picker class="theme-switch right-menu-item"/>
        </el-tooltip>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import ThemePicker from '@/components/ThemePicker'
export default {
  components: {
    Hamburger,
    Breadcrumb,
    Screenfull,
    SizeSelect,
    ThemePicker
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },

  mounted() {
  },

  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    }
  }
}

</script>
<style lang='scss' scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
