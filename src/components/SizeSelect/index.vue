<!--  -->
<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="size==='medium'" command="medium">Medium</el-dropdown-item>
      <el-dropdown-item :disabled="size==='small'" command="small">Small</el-dropdown-item>
      <el-dropdown-item :disabled="size==='mini'" command="mini">Mini</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  components: {},
  data() {
    return {
    }
  },
  computed: {
    size() {
      return this.$store.getters.size
    }
  },

  mounted() {},

  methods: {
    handleSetSize(size) {
      console.log(size)
      //   this.$ElEMENT.size = size
      this.$store.dispatch('setSize', size)
      this.$message({
        message: 'Switch Size Success',
        type: 'success'
      })
    }
  }
}

</script>
<style lang='scss' scoped>
.size-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -4px!important;
}
</style>
