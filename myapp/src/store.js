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
          alert(e.message);
        });
    },
    signIn(context, info) {
      firebase
        .auth()
        .signInWithEmailAndPassword(info.email, info.password)
        .then(function () {
          info.$router.push({ name: 'users' });
        })
        .catch(function () {
          alert(
            'ログインに失敗しました。メールアドレスとパスワードを再度入力してください'
          );
        });
    },
    logout() {
      // Todo
      // firebase.auth().signOut();
      // this.auth = false;
    },
    auth() {
      return new Promise(resolve => {
        firebase.auth().onAuthStateChanged(user => {
          if (user) resolve(true);
        })
      });
    }
  },
});