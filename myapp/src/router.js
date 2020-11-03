import Vue from 'vue'
import Router from 'vue-router'
import Register from './components/Templates/Register'
import Login from './components/Templates/Login'
import Dashboard from './components/Templates/Dashboard'
import firebase from 'firebase'
import { config } from './firebase.config'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      component: Register,
      name: 'register'
    },
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '/',
      component: Dashboard,
      name: 'dash'
    }
  ],
});

firebase.initializeApp(config);

router.beforeEach(function (to, from, next) {
  if (to.path === '/login' || to.path === '/register') {
    next();
    return
  }

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      next();
    } else {
      next({ name: 'login' })
    }
  });
})

export default router