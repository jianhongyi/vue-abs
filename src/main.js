// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss'
import '@/icons'
import i18n from '@/lang'
import './mock' // simulation data
import rem from './resize.js' // 引入rem
rem(1440, 1440)

Vue.use(Element, { locale })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
