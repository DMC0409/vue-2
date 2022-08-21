import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: '2Dmap',
      component: resolve => require(['@/views/2Dmap'],resolve)
    },
    {
      path: '/3d',
      name: '3Dmap',
      component: resolve => require(['@/views/3Dmap'],resolve)
    }
  ]
})
