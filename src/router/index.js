import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import today from '@/pages/today'
import rank from '@/pages/rank'
import fashion from '@/pages/fashion'
import punchline from '@/pages/punchline'
import playlet from '@/pages/playlet'
import index from '@/pages/index'
import player from '@/pages/player'
import aboutus from '@/pages/aboutus'
import about from '@/pages/about'
import search from '@/pages/search'
import login from '@/pages/login'
import register from '@/pages/register'
import forget from '@/pages/forget'
import test from '@/pages/test'
import testplayer from '@/pages/testplayer'
import exportJSON from '@/pages/exportJSON'
import { resolve } from 'url';

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [{
      path: '/',
      name: 'home',
      component: resolve => require(['@/pages/home'],resolve)
    },
    {
      path: '/today',
      name: 'today',
      component: resolve => require(['@/pages/today'],resolve)
    },
    {
      path: '/rank',
      name: 'rank',
      component: resolve => require(['@/pages/rank'],resolve)
    },
    {
      path: '/fashion',
      name: 'fashion',
      component: resolve => require(['@/pages/fashion'],resolve)
    },
    {
      path: '/punchline',
      name: 'punchline',
      component: resolve => require(['@/pages/punchline'],resolve)
    },
    {
      path: '/playlet',
      name: 'playlet',
      component: resolve => require(['@/pages/playlet'],resolve)
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/pages/index'],resolve)
    },
    {
      path: '/player',
      name: 'player',
      component: resolve => require(['@/pages/player'],resolve)
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: resolve => require(['@/pages/aboutus'],resolve)
    },
    {
      path: '/about',
      name: 'about',
      component: resolve => require(['@/pages/about'],resolve)
    },
    {
      path: '/search',
      name: 'search',
      component: resolve => require(['@/pages/search'],resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/pages/login'],resolve)
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/pages/register'],resolve)
    },
    {
      path: '/forget',
      name: 'forget',
      component: resolve => require(['@/pages/forget'],resolve)
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  }
})
