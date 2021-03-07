// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import router from './router'
import store from './store'
import Vcomp from './components/index'
import Axios from 'axios'
import VueVideoPlayer from 'vue-video-player'
import qs from 'qs'

import '@videojs/http-streaming'

import "babel-polyfill"
import 'video.js/dist/video-js.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/global.scss'

Vue.use(ElementUI)
Vue.use(VueVideoPlayer)
Vue.use(Vcomp)

Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Vue.prototype.$qs = qs

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

Axios.interceptors.request.use(config => {
  config.headers.token = localStorage.userToken;
  return config;
})

router.beforeEach((to, from, next) => {
  console.log("from Route:"+from.fullPath);
  if (localStorage.username && localStorage.userToken && from.fullPath == "/" && to.fullPath == "/") {
    console.log("autoLogin");
    Axios
      .post("http://172.16.75.32:8080/" + "ki-video/user/autoLogin", qs.stringify({
        username : localStorage.username,
      }))
      .then(function (response) {
        let res = JSON.parse(JSON.stringify(response));
        console.log(res);
        if (res.data.code == 200) {
          localStorage.isLogin = "true";
          let user = JSON.stringify(res.data.data);
          localStorage.setItem("user", [user]);
          store.state.property.isLogin = true;
          store.state.property.user = res.data.data;
        }
        else {
          localStorage.isLogin = "false";
        }
      })
    };
  Axios
    .get("../../../static/data/data.json")
    .then(response => {
      let res = JSON.parse(JSON.stringify(response));
      if (res.status == 200) {
        console.log(res.data);
        store.state.webData = res.data
      }
      next()
    })
    .catch(err => {
      console.log(err.message);
    })
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
