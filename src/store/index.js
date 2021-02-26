import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const ADD_COUNT = 'ADD_COUNT'; // 用常量代替事件类型，使得代码更清晰

const now = new Date();
const store = new Vuex.Store({
  state: {
    testData: {
      content: "hello, ShotCut",
      date: now
    },
    property: {
      isLogin: true
    },
    webData: {}
  },
  mutations: {
  }
});

store.watch(
  (state) => state.data,
  (val) => {
    console.log('CHANGE: ', val);
    localStorage.setItem('web_data', JSON.stringify(val));
  }, {
    deep: true
  }
);

export default store;
