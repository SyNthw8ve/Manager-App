import Vue from 'vue'

import App from './App'
import Chat from './components/Chat.vue'
import router from './router'
import store from './store'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.component('icon', Icon)
Vue.component('chat', Chat)

new Vue({
  components: { App, Icon, Chat },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
