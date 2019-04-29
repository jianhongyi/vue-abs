<!-- link组件 -->
<template>
  <component :is="witchDom" v-bind="linkProps(to)">
    <slot/>
  </component>
</template>

<script>
import { isExternal } from '@/utils'
export default {
  components: {},
  data() {
    return {
      witchDom: 'router-link'
    }
  },
  computed: {},

  mounted() {},

  methods: {
    linkProps(url) {
      let result = {}
      if (isExternal(url)) {
        this.witchDom = 'a'
        result = {
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      } else {
        this.witchDom = 'router-link'
        result = {
          to: url
        }
      }
      return result
    }
  }
}

</script>
<style lang='scss' scoped>
</style>
