import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
export const bus = new Vue()

new Vue({
  components: { App },
  router: router,
  store,
  template: '<App/>'
}).$mount('#app')
