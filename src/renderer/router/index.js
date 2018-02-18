import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home').default
    },
    {
      path: '/overview',
      name: 'overview',
      component: require('@/components/Overview').default
    },
    {
      path: '/water',
      name: 'water',
      component: require('@/components/Water').default
    },
    {
      path: '/elec',
      name: 'elec',
      component: require('@/components/Elec').default
    },
    {
      path: '/gas',
      name: 'gas',
      component: require('@/components/Gas').default
    }
  ]
})
