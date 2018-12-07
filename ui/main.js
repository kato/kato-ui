import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {getAPIClient} from "./plugins/kato-client";

Vue.config.productionTip = false;

(async () => {
  //引入kato-client,api的baseurl在ui的上一层
  const apiUrl = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/ui')) + '/';
  Vue.use(await getAPIClient(apiUrl));

  //初始化Kato API插件
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app');
})();
