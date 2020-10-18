import Vue from 'vue'
import Router from 'vue-router'
import Register from './components/Templates/Register'
import Login from './components/Templates/Login'
import Users from './components/Templates/Users'

Vue.use(Router);

export default new Router({
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
  ]
})