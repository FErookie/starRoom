import Vue from 'vue'
import App from './App.vue'
import store from "@/store/store";
import router from './router'
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}));
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
