<!-- sidebarItem组件 -->
<template>
  <div v-if="!item.hidden && item.children" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon || item.meta.icon" :title="generateTitle(onlyOneChild.meta.title)"/>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="submenu" :index="resolvePath(item.path)">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="generateTitle(item.meta.title)"/>
      </template>

      <template v-for="child in item.children" v-if="!child.hihhen">
        <sidebar-item
          v-if="child.childred && child.childred.length > 0"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(child.path)"
          :is-nest="true"
          class="nest-menu"/>
        <app-link v-else :to="resolvePath(child.path)" :key="child.path">
          <el-menu-item :index="resolvePath(child.path)">
            <item v-if="child.meta" :icon="child.meta.icon" :title="generateTitle(child.meta.title)"/>
          </el-menu-item>
        </app-link>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils'
import { generateTitle } from '@/utils/i18n'
import AppLink from './Link'
import Item from './Item'
export default {
  components: {
    AppLink,
    Item
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  computed: {},

  mounted() {},

  methods: {
    hasOneShowingChild(child, parent) {
      const showingChildre = child.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
        }
      })

      if (showingChildre.length === 1) {
        return true
      }

      if (showingChildre.length === 0) {
        this.onlyOneChild = { ...parent, path: '', onlyOneChild: true }
        return true
      }
      return false
    },
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath
      } else {
        return path.resolve(this.basePath, routePath)
      }
    },
    isExternalLink(routePath) {
      return isExternal(routePath)
    },
    generateTitle
  }
}

</script>
<style lang='scss' scoped>
</style>
