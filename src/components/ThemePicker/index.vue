<!--  -->
<template>
  <el-color-picker
    v-model="theme"
    class="theme-picker"
    popper-class="theme-picker-dropdown"/>
</template>

<script>
const version = require('element-ui/package.json').version
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
      const themeCluster = this.getThemeCluster(val.replace('#', ''))
      const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
      const getHandler = (variable, id) => {
        return () => {
          const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
          const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)
          let styleTag = document.getElementById(id)
          if (!styleTag) {
            styleTag = document.createElement('style')
            styleTag.setAttribute('id', id)
            document.head.appendChild(styleTag)
          }
          styleTag.innerText = newStyle
        }
      }
      const chalkHandler = getHandler('chalk', 'chalk-style')
      if (!this.chalk) {
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
        this.getCSSString(url, chalkHandler, 'chalk')
      } else {
        chalkHandler()
      }

      const styles = [].slice.call(document.querySelectorAll('style'))
        .filter(style => {
          const text = style.innerText
          return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
        })
      styles.forEach(item => {
        const { innerText } = item
        if (typeof innerText !== 'string') {
          return
        }
        item.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
      })
      this.$message({
        message: '切换成功',
        type: 'success'
      })
    }
  },

  mounted() {},

  methods: {
    getCSSString(url, callback, variable) {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
            callback
          }
        }
      }
      xhr.open('GET', url)
      xhr.send()
    },
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style
      oldCluster.forEach((item, index) => {
        newStyle = newStyle.replace(new RegExp(item, 'ig'), newCluster[index])
      })
      return newStyle
    },
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
<style lang='scss'>
.theme-picker .el-color-picker__trigger {
  vertical-align: middle;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
