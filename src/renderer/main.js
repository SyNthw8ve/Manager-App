import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import Watson from '../main/watson'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
export const bus = new Vue()

new Vue({

  components: { App },

  created () {

    // Watson.init();

  },

  router: router,

  store: store,

  template: '<App/>'

}).$mount('#app')
