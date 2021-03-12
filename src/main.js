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
  if (localStorage.getItem("user")) {
    config.headers.token = JSON.parse(localStorage.getItem("user")).userToken;
  }
  return config;
})

router.beforeEach((to, from, next) => {
  let ip = "http://172.16.75.32:8080/"
  if (localStorage.getItem("user") && from.fullPath == "/" && to.fullPath == "/") {
    console.log("autoLogin");
    let user = JSON.parse(localStorage.getItem("user"));
    Axios
      .post(ip + "ki-video/user/autoLogin", qs.stringify({
        username : user.username,
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

  if (from.fullPath == "/" && to.fullPath == "/") {
    Axios
      .post(ip + "ki-video/video/marqueeData")
      .then(function (response) {
        console.log("marqueeData");
        let res = JSON.parse(JSON.stringify(response));
        if (res.data.code == 200) {
          sessionStorage.setItem("marqueeData", JSON.stringify(res.data.data));
        }
      })
      .catch(err => {
        console.log(err.message);
      })

    Axios
      .post(ip + "ki-video/video/homePage")
      .then(function (response){
        let res = JSON.parse(JSON.stringify(response));
        if (res.data.code == 200) {
          console.log("homePage");
          console.log(res.data.data);
          sessionStorage.setItem("homePage", JSON.stringify(res.data.data));
        }
        next()
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  if (to.fullPath == "/punchline") {
    Axios
      .post(ip + "/ki-video/video/punchline")
      .then(function (response){
        let res = JSON.parse(JSON.stringify(response));
        if (res.data.code == 200) {
          console.log("punchline");
          console.log(res.data.data);
          store.state.networkData.punchline = res.data.data;
        }
        next();
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  if (to.fullPath == "/playlet") {
    Axios
      .post(ip + "/ki-video/video/young")
      .then(function (response){
        let res = JSON.parse(JSON.stringify(response));
        if (res.data.code == 200) {
          console.log("playlet");
          console.log(res.data.data);
          sessionStorage.setItem("playlet", JSON.stringify(res.data.data));
        }
        else {
          console.log(res.data.msg);
        }
        next();
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  if (to.fullPath == "/fashion") {
    Axios
      .post(ip + "/ki-video/video/fashion")
      .then(function (response){
        let res = JSON.parse(JSON.stringify(response))
        if (res.data.code == 200) {
          console.log("fashion");
          console.log(res.data.data);
          sessionStorage.setItem("fashion", JSON.stringify(res.data.data));
        }
        next();
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  if (to.fullPath == "/today") {
    Axios
      .post(ip + "/ki-video/video/today")
      .then(function (response){
        let res = JSON.parse(JSON.stringify(response))
        if (res.data.code == 200) {
          console.log("today");
          console.log(res.data.data);
          store.state.networkData.today = res.data.data;
        }
        next();
      })
      .catch(err => {
        console.log(err.message);
      })
  }

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
