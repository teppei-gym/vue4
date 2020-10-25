import Vue from 'vue'
import Router from 'vue-router'
import Register from './components/Templates/Register'
import Login from './components/Templates/Login'
import Users from './components/Templates/Users'
import firebase from 'firebase'

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
const config = {
  apiKey: 'AIzaSyANleepY6g0DtzfRaz2a3NcoVB3iMBNs2o',
  authDomain: 'vue-task4.firebaseapp.com',
  databaseURL: 'https://vue-task4.firebaseio.com',
  projectId: 'vue-task4',
  storageBucket: 'vue-task4.appspot.com',
  messagingSenderId: '700838140448',
  appId: '1:700838140448:web:da4bb9d4a815e46c8eba45',
  measurementId: 'G-KQF9Q37GM1',
}

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