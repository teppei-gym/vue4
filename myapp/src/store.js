import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    register(context, info) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(info.email, info.password)
        .then((results) => {
          results.user.updateProfile({
            displayName: info.name,
          });

          info.$router.push({ name: 'users' });
        }).catch((e) => {
          console.log(e.message);
        });
    }
  },
})