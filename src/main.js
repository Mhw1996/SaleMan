import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios'
//引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入vant-ui
import Vant from 'vant';
import 'vant/lib/index.css';
// 注册elementUI插件
Vue.use(ElementUI)
// 注册vant-ui插件
Vue.use(Vant);
import { Icon } from 'vant';
Vue.use(Icon);
Vue.config.productionTip = false
// Vue.prototype.axios=axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
