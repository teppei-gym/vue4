import Vue from 'vue'
import Router from 'vue-router'
import Register from './components/Templates/Register'
import Login from './components/Templates/Login'
import Users from './components/Templates/Users'
import firebase from 'firebase'
import { config } from './firebase.config'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/',
      component: Login,
      name: 'login'
    },
    {
      path: '/users',
      component: Users,
      name: 'users'
    }
  ],
});

firebase.initializeApp(config);

router.beforeEach(function (to, from, next) {
  if (to.path === '/') {
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