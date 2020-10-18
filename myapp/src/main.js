import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

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