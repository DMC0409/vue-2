// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as echarts from 'echarts'
import * as echartsgl from 'echarts-gl'
import '@/assets/css/common.scss'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$echartsgl = echartsgl

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
