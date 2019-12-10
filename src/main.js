import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import 'font-awesome/css/font-awesome.min.css';
import Axios from 'axios'
Vue.use(ElementUI);

Vue.config.productionTip = false
import './assets/public.less'

Axios.defaults.baseURL = "";
Vue.prototype.ajax = Axios;
Vue.directive('enterNumber', {
  inserted: function (el) {
    el.addEventListener("keypress",function(e){
      e = e || window.event;
      let charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode;
      let re = /\d/;
      if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
        if(e.preventDefault){
          e.preventDefault();
        }else{
          e.returnValue = false;
        }
      }
    });
  }
});

new Vue({
   router,
   store,
  render: h => h(App)
}).$mount('#app')
