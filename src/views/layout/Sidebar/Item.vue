<!-- 渲染侧边导航每一项中的icon和title -->
<script>
export default {
  name: 'Item',
  functinal: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []
    if (icon) {
      vnodes.push(<svg-icon icon-class={icon}/>)
    }
    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}

</script>
<style lang='scss' scoped>
</style>
