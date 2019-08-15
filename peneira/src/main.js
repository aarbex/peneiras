import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import vuetify from './plugins/vuetify.js'
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(VueResource)

new Vue({
  router,  
  vuetify,
  render: h => h(App)
}).$mount('#app')
