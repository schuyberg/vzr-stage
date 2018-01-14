import Vue from 'vue'
import App from './App.vue'
window.$ = require('../node_modules/jquery/dist/jquery.min.js')// yeah, wtf. make jquery global.

new Vue({
  el: '#app',
  render: h => h(App)
})
Vue.config.keyCodes = {
  r: 68
}
