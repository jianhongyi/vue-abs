<!--  -->
<template>
  <el-color-picker
    v-nodel="theme"
    class="theme-picker"
    popper-class="theme-picker-dropdown"/>
</template>

<script>
// const version = require('element-ui/package.json').version
const ORIGINAL_THEME = '#409EFF'
export default {
  components: {},
  data() {
    return {
      theme: ORIGINAL_THEME,
      chalk: ''
    }
  },
  computed: {},
  watch: {
    theme(val, oldVal) {
      if (typeof val !== 'string') {
        return
      }
    //   const themeCluster = this.getThemeCluster(val.replace('#', ''))
    //   const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
    }
  },

  mounted() {},

  methods: {
    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)
        if (tint === 0) {
          return [red, green, blue].join(',')
        } else {
          red = red + Math.round(tint * (255 - red))
          green = green + Math.round(tint * (255 - green))
          blue = blue + Math.round(tint * (255 - blue))

          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)

          return `#${red}${green}${blue}`
        }
      }

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)

        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)

        return `#${red}${green}${blue}`
      }

      const clusters = [theme]
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
      }
      clusters.push(shadeColor(theme, 0.1))
      return clusters
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
