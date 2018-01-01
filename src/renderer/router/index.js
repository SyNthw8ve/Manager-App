import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'nav',
      component: require('@/components/Navbar').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
